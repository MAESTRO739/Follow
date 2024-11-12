import { Box, Flex, Spinner } from "@chakra-ui/react"
import UserHeader from "../components/UserHeader"
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const showToastRef = useRef(showToast);
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setFetchingPosts(true);

      try {
        const res = await fetch(`api/posts/user/${username}`);
        const data = await res.json();

        if (data.error) {
          showToastRef.current('Error', data.error, 'error');
          return;
        }

        setPosts(data);
      } catch (error) {
        showToastRef.current('Error', error.message, 'error');
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username]);

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }

  if (!user && !loading) {
    return <h1>User not found</h1>;
  }

  return (
    <Box mb={16}>
      <UserHeader user={user} />
      
      {!fetchingPosts && posts.length === 0 && <h1>{user.name} has no posts</h1>}

      {fetchingPosts && (
        <Flex justify="center" my={12}>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {posts.map((post) => (
        <Box key={post._id}>
          <Post post={post} postedBy={post.postedBy} />
        </Box>
      ))} 
    </Box>
  )
} 

export default UserPage