import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import { useColors } from '../ColorContext';
import UserInfo from '../components/UserInfo';
// import ThreeDotsIcon from '../components/ThreeDotsIcon';
import Actions from '../components/Actions';
import { useState } from 'react';
import Comment from '../components/Comment';
import useShowToast from '../hooks/useShowToast';

const PostPage = () => {
  const { bgColor, 
          borderColor, 
          avatarBorderColor, 
          iconHoverColor,  
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
              name="Mark Zuckerberg" 
              src="/zuck-avatar.png" 
              borderWidth={'1px'}
              borderStyle={'solid'}
              borderColor={avatarBorderColor}
            />
            <UserInfo name={'Mark Zuckerberg'} username={'MarkZuckerberg'} createdAt={'1d'}/>
            {/* <ThreeDotsIcon user={user} copyURL={copyURL} /> */}
          </Flex>

          <Text color={postTextColor} fontSize={'lg'} whiteSpace="normal" wordBreak="break-word" mt={-2.5} lineHeight={'1.3'}>
              I look good here, like a real human!
          </Text>

          <Box borderRadius={8} overflow={'hidden'} border={'1px solid'} borderColor={borderColor} mt={'3px'} mb={1}>
            <Image src={'/post1.png'} w={'full'}></Image>
          </Box>

          <Actions 
            liked={liked} 
            setLiked={setLiked} 
            iconHoverColor={iconHoverColor} 
            countColor={countColor} 
            likes={492}
            replies={78}
            reposts={16}
            shares={3}
          />
        </Flex>
      </Box>

      <Comment 
        userAvatar={'https://bit.ly/ryan-florence'} 
        name={'Ryan Florence'}
        username={'RyanFlorence'} 
        commentText={'Nice picture!'}
        createdAt={'3h'}
        copyURL={copyURL}
        likes={37}
        replies={8}
        reposts={2}
        shares={1}
      />
      <Comment 
        userAvatar={'https://bit.ly/code-beast'} 
        name={'Christian Nwamba'} 
        username={'ChristianNwamba'} 
        commentText={'Damn, maybe you are actually human'}
        createdAt={'12h'}
        copyURL={copyURL}
        likes={52}
        replies={19}
        reposts={3}
        shares={2}
      />
      <Comment 
        userAvatar={'https://bit.ly/sage-adebayo'} 
        name={'Segun Adebayo'} 
        username={'SegunAdebayo'} 
        commentText={'🔥🔥🔥'}
        createdAt={'1d'}
        copyURL={copyURL}
        likes={17}
        replies={3}
        reposts={1}
        shares={1}
      />
    </>
  )
}

export default PostPage
