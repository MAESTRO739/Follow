import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useColors } from "../ColorContext";
import UserInfo from "./UserInfo";
import PropTypes from "prop-types";
import ThreeDotsIcon from "./ThreeDotsIcon";
import Actions from "./Actions";

const Comment = ({ avatar, name, username, commentText, likes, replies, reposts, shares, createdAt, copyURL }) => {
  const { bgColor, borderColor, postTextColor, avatarBorderColor, iconHoverColor, countColor } = useColors();

  const [liked, setLiked] = useState(false)

  return (
    <>
      <Box
        bg={bgColor}
        border={"1px solid"}
        borderColor={borderColor}
        boxShadow="lg"
        w='full'
        pl={6}
        pr={6}
        borderTop={'none'}
      >
        <Flex gap={3} pt={3.5} pb={1.5} w={'full'}>
          <Avatar 
            size={'md'} 
            name={name}
            src={avatar} 
            borderWidth={'1px'}
            borderStyle={'solid'}
            borderColor={avatarBorderColor}
          />

          <Flex w={'full'} flexDirection={'column'} minWidth={0}>
            <Flex w={'full'} alignItems={'flex-start'} justifyContent={'space-between'} mt={{ base: -2, md: 0 }}>
              <UserInfo postTextColor={postTextColor} name={name} username={username} createdAt={createdAt} />
              <ThreeDotsIcon iconHoverColor={iconHoverColor} bgColor={bgColor} copyURL={copyURL} />
            </Flex>

            <Text color={postTextColor} fontSize={'md'} whiteSpace="normal" wordBreak="break-word" mt={{ base: -1, md: -3.5 }} lineHeight={'1.3'}>
              {commentText}
            </Text>

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
    </>
  )
}

export default Comment

Comment.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  copyURL: PropTypes.func.isRequired,
  commentText: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  replies: PropTypes.number.isRequired,
  reposts: PropTypes.number.isRequired,
  shares: PropTypes.number.isRequired
};