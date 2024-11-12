import { Avatar, Box, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import { useColors } from '../ColorContext';
import UserInfo from '../components/UserInfo';
import ThreeDotsIcon from '../components/ThreeDotsIcon';
import Actions from '../components/Actions';
import Comment from '../components/Comment';
import useShowToast from '../hooks/useShowToast';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostPage = () => {
  const { bgColor, 
          borderColor, 
          avatarBorderColor, 
          postTextColor
        } = useColors();
  
  const { user, userLoading } = useGetUserProfile();
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const showToastRef = useRef(showToast);
  const { pid } = useParams();
  const [ postLoading, setPostLoading ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      setPostLoading(true);

      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();

        if (data.error) {
          showToastRef.current('Error', data.error, 'error');
          return;
        }

        setPost(data)
      } catch (error) {
        showToastRef.current('Error', error.message, 'error');
      } finally {
        setPostLoading(false);
      }
    };

    getPost();
  }, [pid]);
  
  const copyURL = () => {
    const postURL = 'http://localhost:5173/Lasch739/post/1';
    navigator.clipboard.writeText(postURL).then(() => {
      showToast('Post link copied', '', 'success');
    });
  }

  const handleDelete = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this post?')) {
        return;
      }

      const res = await fetch(`/api/posts/${post._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      showToast('Post deleted', '', 'success');
      navigate(`/${user?.username}`);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  if (!user && userLoading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} my={12}/>
      </Flex>
    )
  }

  if (!user && !userLoading) {
    return <h1>User not found</h1>;
  }

  if (!post && postLoading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} my={12}/>
      </Flex>
    )
  }

  if (!post && !postLoading) {
    return <h1>Post not found</h1>;
  }

  return (
    <>
      <Box 
        bg={bgColor}
        borderTopRadius={'2xl'}
        border={"1px solid"}
        borderColor={borderColor}
        boxShadow="lg"
        w='full'
        pl={6}
        pr={6}
      > 
        <Flex pt={7} pb={2} gap={1} mt={-2.5} flexDirection={'column'} minWidth={0}>
          <Flex gap={3} w={'full'} alignItems={'center'} justifyContent={'space-between'} pb={{ base: 2, md: 4 }} >
            <Avatar 
              size={'md'} 
              name={user?.name} 
              src={user?.avatar} 
              borderWidth={'1px'}
              borderStyle={'solid'}
              borderColor={avatarBorderColor}
              cursor={'pointer'}
              onClick={(e) => {
                e.preventDefault()
                navigate(`/${user?.username}`)
              }}
            />
            <UserInfo name={user?.name} username={user?.username} createdAt={new Date(post?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
            <ThreeDotsIcon user={user} copyURL={copyURL} handleDelete={handleDelete} />
          </Flex>

          <Text color={postTextColor} fontSize={'lg'} whiteSpace="normal" wordBreak="break-word" mt={-2.5} lineHeight={'1.3'}>
              {post?.text}
          </Text>

          {post?.image && (
            <Box borderRadius={8} overflow={'hidden'} border={'1px solid'} borderColor={borderColor} mt={'3px'} mb={1}>
              <Image src={post?.image} w={'full'}></Image>
            </Box>
          )}

          <Actions post={post} />
        </Flex>
      </Box>

      {post?.replies.map((reply) => (
        <Comment key={reply._id} reply={reply} /> 
      ))}
    </>
  )
}

export default PostPage
