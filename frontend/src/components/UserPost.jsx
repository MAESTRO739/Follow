import { Avatar, Box, Flex, Image, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"
import { useState } from "react"
import { useColors } from "../ColorContext"
import PropTypes from 'prop-types'

const UserPost = ({ likes, replies, reposts, postImage, postTitle  }) => {
  const { bgColor, 
          borderColor, 
          avatarBorderColor, 
          iconHoverColor, 
          bgHoverColor, 
          threadColor, 
          postTextColor,
          countColor
        } = useColors();

  const [liked, setLiked] = useState(false)

  const toast = useToast()
  const copyURL = () => {
    const postURL = 'http://localhost:5173/markzuckerberg/post/1';
    navigator.clipboard.writeText(postURL).then(() => {
      toast({
        title: "Post link copied.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    });
  };

  return (
    <Link href={'/markzuckerberg/post/1'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
      <Box 
        bg={bgColor} 
        border={'1px solid'}
        borderColor={borderColor}
        borderTop={'none'}
        pl={6}
        pr={6}
        boxShadow="lg" 
        w='full'
        _hover={{ bg: bgHoverColor}}
        transition={'background-color 0.2s ease'}
      >
        <Flex gap={3} pt={3} pb={2}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar 
              size={"md"} 
              name="Mark Zuckerberg" 
              src="zuck-avatar.png" 
              borderWidth={'1px'}
              borderStyle={'solid'}
              borderColor={avatarBorderColor}/>
            <Box w={'2px'} h={'full'} bg={threadColor} my={2}></Box>
            <Box position={"relative"} w={'full'}>
              <Avatar 
                size={"xs"}
                name="Christian Nwamba"
                src="https://bit.ly/code-beast"
                position={"absolute"}
                top={"-26px"}
                left={"12px"}
                padding={"2px"}
                borderWidth={'1px'}
                borderStyle={'solid'}
                borderColor={avatarBorderColor}
              />
              <Avatar 
                size={"xs"}
                name="Kent Dodds"
                src="https://bit.ly/kent-c-dodds"
                position={"absolute"}
                bottom={"20px"}
                right={"2px"}
                padding={"2px"}
                borderWidth={'1px'}
                borderStyle={'solid'}
                borderColor={avatarBorderColor}
              />
              <Avatar 
                size={"xs"}
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                position={"absolute"}
                bottom={"20px"}
                left={"2px"}
                padding={"2px"}
                borderWidth={'1px'}
                borderStyle={'solid'}
                borderColor={avatarBorderColor}
              />
            </Box>
          </Flex>

          <Flex flex={1} flexDirection={"column"} gap={2} minWidth={0} mt={-2.5}>
            <Flex gap={1} w={'full'} alignItems={'center'} justifyContent={'space-between'}>
              <Flex 
                gap={{ base: 0, md: 1 }} 
                w={'full'} 
                flexDirection={{ base: "column", md: "row" }} 
              >
                <Flex alignItems="center" gap={1} mt={{ base: 2, md: 0 }}>
                  <Text 
                    color={postTextColor} 
                    fontSize={'md'} 
                    fontWeight={'bold'} 
                    whiteSpace='nowrap' 
                    overflow="hidden" 
                    textOverflow="ellipsis"
                  >
                    Mark Zuckerberg
                  </Text>
                  <Image src="/verified.png" w={4} h={4} mr={'2px'} mt={'3px'} alt="Verified Icon"/>
                </Flex>
                <Flex gap={1} alignItems="center" mt={{ base: -1, md: 0 }} mb={{ base: 2, md: 0 }}>
                  <Text 
                    fontSize={'md'} 
                    color={'gray.light'} 
                    className="separator-dot" 
                    mr={'1px'}
                    whiteSpace='nowrap' 
                    overflow="hidden" 
                    textOverflow="ellipsis"
                  >
                    @MarkZuckerberg
                  </Text>
                  <Text fontSize={'md'} color={"gray.light"}>1d</Text>
                </Flex>
              </Flex>
              <Box 
                className='icon-container' 
                _hover={{ backgroundColor: iconHoverColor }} 
                color={"#777777"} 
                title="More" 
                cursor={"pointer"} 
                onClick={(e) => e.preventDefault()}
                overflow="hidden"
                display="flex"    
                alignItems="center" 
                justifyContent="center"  
              >
                <Menu>
                  <MenuButton>
                    <BsThreeDots size={18}/>
                  </MenuButton>
                  <Portal>
                    <MenuList bg={bgColor}>
                      <MenuItem bg={bgColor} onClick={copyURL}>Copy Link</MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </Box>
            </Flex>

            <Text color={postTextColor} fontSize={'md'} whiteSpace="normal" wordBreak="break-word" mt={'-12px'} mb={'-6px'} lineHeight={'1.3'}>{postTitle}</Text>
            {postImage && (
              <Box borderRadius={8} overflow={'hidden'} border={'1px solid'} borderColor={borderColor} mt={1.5} mb={-1}>
                <Image src={postImage} w={'full'}></Image>
              </Box>
            )}

            <Actions 
              liked={liked} 
              setLiked={setLiked} 
              iconHoverColor={iconHoverColor} 
              countColor={countColor} 
              likes={likes}
              replies={replies}
              reposts={reposts}
            />
          </Flex>
        </Flex>
      </Box>
    </Link>
  )
}

export default UserPost

UserPost.propTypes = {
  likes: PropTypes.any.isRequired, 
  replies: PropTypes.any.isRequired, 
  reposts: PropTypes.any.isRequired, 
  postImage: PropTypes.any.isRequired, 
  postTitle: PropTypes.any.isRequired, 
}