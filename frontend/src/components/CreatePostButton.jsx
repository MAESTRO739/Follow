import { Box, Button, CloseButton, Flex, FormControl, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import { useColors } from "../ColorContext";
import { AddIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const MAX_CHARS = 500;

const CreatePostButton = () => {
  const { bgColor, bgHoverColor, avatarBorderColor, buttonIconColor } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState('');
  const imageRef = useRef(null);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const [ remainingChars, setRemainingChars ] = useState(MAX_CHARS);
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    const text = e.target.value;

    if (text.length > MAX_CHARS) { 
      const truncatedText = text.slice(0, MAX_CHARS);
      setPostText(truncatedText);
      setRemainingChars(0);
    } else {
      setPostText(text);
      setRemainingChars(MAX_CHARS - text.length);

    }
  }

  const handleCreatePost = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          image: imgUrl,
        }),
      });
  
      const data = await res.json();
  
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      } 
  
      showToast('Post created', 'Your post has been created', 'success');
      onClose();
      setPostText('');
      setImgUrl('');
    } catch (error) {
        showToast('Error', error, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Box role="button" tabIndex="0" position={'fixed'} right={6} bottom={6}>
        <IconButton
          aria-label="Create post"
          icon={<AddIcon />}
          size="2xl" 
          variant="solid"
          bg={bgColor}
          sx={{
            svg: { color: buttonIconColor },
          }}
          _hover={{
            bg: bgHoverColor,
            transform: "scale(1.1)",
          }}
          borderRadius="2xl"
          style={{
            height: "68px",
            width: "82px",
          }}
          border={'1px solid'} 
          borderColor={avatarBorderColor}
          transition="transform 0.2s ease-in-out"
          onClick={onOpen}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent bg={bgColor} border={'1px solid'} borderColor={avatarBorderColor}>
          <ModalHeader>Create Post</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <Textarea 
                placeholder="What's on your mind?"
                value={postText}
                onChange={handleTextChange}
              />
              <Text fontSize={'xs'} fontWeight={'bold'} textAlign={'right'} m={1}>
                {remainingChars}/{MAX_CHARS}
              </Text>

              <Input
                type="file"
                hidden
                ref={imageRef} 
                onChange={handleImageChange}
              />

              <BsFillImageFill  
                style={{ cursor: 'pointer', marginLeft: '5px' }}
                size={20}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>

            {imgUrl && ( 
              <Flex mt={5} w={'full'} position={'relative'}>
                <Image src={imgUrl} alt="Selected image"></Image>
                <CloseButton 
                  onClick={() => setImgUrl('')}
                  bg={bgColor}
                  _hover={{
                    bg: bgHoverColor,
                    transform: "scale(1.1)",
                  }}
                  position={'absolute'}
                  right={2}
                  top={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter pt={2}>
            <Button colorScheme='blue' mr={3} borderRadius={'md'} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePostButton