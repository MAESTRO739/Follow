import { Box, Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import Post from '../components/Post';
import { useColors } from '../ColorContext';

const HomePage = () => {
  const { borderColor } = useColors();

  const showToast = useShowToast();
  const showToastRef = useRef(showToast);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPostsFeed = async () => {
      setLoading(true);

      try {
        const res = await fetch('/api/posts/feed');
        const data = await res.json();

        if (data.error) {
          showToastRef.current('Error', data.error, 'error');
          return;
        }

        setPosts(data);
      } catch (error) {
        showToastRef.current('Error', error.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    getPostsFeed();
  }, []);

  return (
    <Flex flexDirection={'column'} mb={16}>
      {!loading && posts.length === 0 && <h1>Follow someone to start seeing posts</h1>}

      {loading && (
        <Flex justify="center">
          <Spinner size={'xl'} />
        </Flex>
      )}

        {posts.map((post) => (
          <Box key={post._id} _first={{ borderTopRadius: '2xl', overflow: 'hidden' }} _last={{ borderBottom: '1px solid', borderBottomColor: borderColor }}>
            <Post post={post} postedBy={post.postedBy} />
          </Box>
        ))}
    </Flex>
  );
};

export default HomePage;
