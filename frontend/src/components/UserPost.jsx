import { Avatar, Box, Flex, Image, Link, Text } from "@chakra-ui/react"
import Actions from "./Actions"
import { useState } from "react"
import { useColors } from "../ColorContext"
import PropTypes from 'prop-types'
import UserInfo from "./UserInfo"
import AvatarGroup from "./ThreadAvatars"
import ThreeDotsIcon from "./ThreeDotsIcon"
import useShowToast from "../hooks/useShowToast"
import { Link as RouterLink } from 'react-router-dom';

const UserPost = ({ likes, replies, reposts, shares, postImage, postTitle, createdAt }) => {
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

  const showToast = useShowToast();

  const copyURL = () => {
    const postURL = 'http://localhost:5173/Lasch739/post/1';
    navigator.clipboard.writeText(postURL).then(() => {
      showToast('Post link copied', '', 'success');
    });
  };

  return (
    <Link as={RouterLink} to={'/Lasch739/post/1'} _hover={{ textDecoration: 'none' }}>
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
              borderColor={avatarBorderColor}
            />
            <Box w={'2px'} h={'full'} bg={threadColor} my={2} />
            <AvatarGroup />
          </Flex>

          <Flex gap={1} flexDirection={'column'} minWidth={0} flex={1}>
            <Flex w={'full'} alignItems={'flex-start'} justifyContent={'space-between'} mt={{ base: -2, md: 0 }} mb={{ base: 2, md: 0 }}>
              <UserInfo postTextColor={postTextColor} name={'Mark Zuckerberg'} username={'MarkZuckerberg'} createdAt={createdAt} />
              <ThreeDotsIcon iconHoverColor={iconHoverColor} bgColor={bgColor} copyURL={copyURL} />
            </Flex>

            <Text color={postTextColor} fontSize={'md'} whiteSpace="normal" wordBreak="break-word" lineHeight={'1.3'} mt={-4}>
              {postTitle}
            </Text>

            {postImage && (
              <Box borderRadius={8} overflow={'hidden'} border={'1px solid'} borderColor={borderColor} mt={'3px'} mb={1}>
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
              shares={shares}
            />
          </Flex>
        </Flex>
      </Box>
    </Link>
  )
}

export default UserPost

UserPost.propTypes = {
  likes: PropTypes.number,
  replies: PropTypes.number,
  reposts: PropTypes.number, 
  shares: PropTypes.number, 
  postImage: PropTypes.string,
  postTitle: PropTypes.string.isRequired, 
  createdAt: PropTypes.string.isRequired
}
