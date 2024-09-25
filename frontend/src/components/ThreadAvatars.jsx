import { Avatar, Box } from "@chakra-ui/react";
import { useColors } from "../ColorContext";

const AvatarGroup = () => {
  const { avatarBorderColor } = useColors();
  
  return (
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
  )
}

export default AvatarGroup;