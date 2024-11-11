import { Avatar, Box, Flex, Image, Link, Text } from "@chakra-ui/react"
import Actions from "./Actions"
import { useEffect, useState } from "react"
import { useColors } from "../ColorContext"
import PropTypes from 'prop-types'
import UserInfo from "./UserInfo"
import ThreadAvatars from "./ThreadAvatars"
import ThreeDotsIcon from "./ThreeDotsIcon"
import useShowToast from "../hooks/useShowToast"
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const Post = ({ post, postedBy }) => {
  const { bgColor, 
          borderColor, 
          avatarBorderColor, 
          bgHoverColor, 
          threadColor, 
          postTextColor
        } = useColors();

  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`api/users/profile/${postedBy}`);
        const data = await res.json();

        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }

        setUser(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  const copyURL = () => {
    const postURL = 'http://localhost:5173/Lasch739/post/1';
    navigator.clipboard.writeText(postURL).then(() => {
      showToast('Post link copied', '', 'success');
    });
  };

  const handleDelete = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this post?')) {
        return;
      }

      const res = await fetch(`api/posts/${post._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      showToast('Post deleted', '', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Link as={RouterLink} to={`/${user.username}/post/${post._id}`} state={{ from: location }} _hover={{ textDecoration: 'none' }}>
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
              src={user?.avatar} 
              borderWidth={'1px'}
              borderStyle={'solid'}
              borderColor={avatarBorderColor}
              onClick={(e) => {
                e.preventDefault()
                navigate(`/${user.username}`)
              }}
            />
            {post.replies.length > 0 && (
              <Box>
                <Box w={'2px'} h={'full'} bg={threadColor} my={1} mb={12}/>
                <ThreadAvatars replies={post.replies} />
              </Box>
            )}
          </Flex>

          <Flex gap={1} flexDirection={'column'} minWidth={0} flex={1}>
            <Flex w={'full'} alignItems={'flex-start'} justifyContent={'space-between'} mt={{ base: -2, md: 0 }} mb={{ base: 2, md: 0 }}>
              <UserInfo name={user?.name} username={user?.username} createdAt={new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
              <ThreeDotsIcon user={user} copyURL={copyURL} handleDelete={handleDelete} />
            </Flex>

            <Text color={postTextColor} fontSize={'md'} whiteSpace="normal" wordBreak="break-word" lineHeight={'1.3'} mt={-4}>
              {post.text}
            </Text>

            {post.image && (
              <Box borderRadius={8} overflow={'hidden'} border={'1px solid'} borderColor={borderColor} mt={1.5} mb={1}>
                <Image src={post.image} w={'full'}></Image>
              </Box>
            )}

            <Actions post={post} />
          </Flex>
        </Flex>
      </Box>
    </Link>
  )
}

export default Post;

Post.propTypes = {
  post: PropTypes.object,
  postedBy: PropTypes.string
}
