import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import { useColors } from "../ColorContext";
import UserInfo from "./UserInfo";
import PropTypes from "prop-types";

const Comment = ({ reply }) => {
  const { bgColor, borderColor, postTextColor, avatarBorderColor } = useColors();
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
        <Flex gap={3} pt={3} pb={3} w={'full'}>
          <Avatar 
            size={'md'} 
            name={reply.name}
            src={reply.avatar} 
            borderWidth={'1px'}
            borderStyle={'solid'}
            borderColor={avatarBorderColor}
          />

          <Flex w={'full'} flexDirection={'column'} minWidth={0}>
            <Flex w={'full'} alignItems={'flex-start'} justifyContent={'space-between'} mt={{ base: -2, md: 0 }}>
              <UserInfo name={reply.name} username={reply.username} createdAt={new Date(reply.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
            </Flex>

            <Text color={postTextColor} fontSize={'md'} whiteSpace="normal" wordBreak="break-word" mt={{ base: -1, md: 1 }} lineHeight={'1.3'}>
              {reply.text}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Comment

Comment.propTypes = {
  reply: PropTypes.object.isRequired
};