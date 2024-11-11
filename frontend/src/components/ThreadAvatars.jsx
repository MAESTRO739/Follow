import { Avatar, Box, Text } from "@chakra-ui/react";
import { useColors } from "../ColorContext";
import PropTypes from "prop-types";

const ThreadAvatars = ({ replies }) => {
  const { avatarBorderColor } = useColors();
  
  return (
    <Box position={"relative"} w={'full'}>
      {replies.length === 0 && (
        <Text textAlign={'center'}>🥱</Text>
      )}

      {replies[0] && (
        <Avatar 
          size={"xs"}
          name="Christian Nwamba"
          src={replies[0].avatar}
          position={"absolute"}
          top={"-26px"}
          left={"12px"}
          padding={"2px"}
          borderWidth={'1px'}
          borderStyle={'solid'}
          borderColor={avatarBorderColor}
        />
      )}

      {replies[1] && (
        <Avatar 
          size={"xs"}
          name="Kent Dodds"
          src={replies[1].avatar}
          position={"absolute"}
          bottom={"20px"}
          right={"2px"}
          padding={"2px"}
          borderWidth={'1px'}
          borderStyle={'solid'}
          borderColor={avatarBorderColor}
        />
      )}      

      {replies[2] && (
        <Avatar 
          size={"xs"}
          name="Dan Abrahmov"
          src={replies[2].avatar}
          position={"absolute"}
          bottom={"20px"}
          left={"2px"}
          padding={"2px"}
          borderWidth={'1px'}
          borderStyle={'solid'}
          borderColor={avatarBorderColor}
        />
      )}
    </Box>
  )
}

export default ThreadAvatars;

ThreadAvatars.propTypes = {
  replies: PropTypes.array
}