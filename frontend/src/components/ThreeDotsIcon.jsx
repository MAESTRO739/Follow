import { Box, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { useColors } from "../ColorContext";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const ThreeDotsIcon = ({ user, copyURL, handleDelete }) => {
  const { bgColor, bgHoverColor, iconHoverColor } = useColors();

  const currentUser = useRecoilValue(userAtom);

  return (
    <Box 
      className="icon-container" 
      _hover={{ backgroundColor: iconHoverColor }} 
      color="#777777" 
      title="More" 
      cursor="pointer" 
      onClick={(e) => e.preventDefault()}
      display="flex"    
      alignItems="center" 
      justifyContent="center"  
      minWidth={0}
    >
      <Menu>
        <MenuButton>
          <BsThreeDots size={18} />
        </MenuButton>
        <Portal>
          <MenuList bg={bgColor} px={2}>
            <MenuItem bg={bgColor} fontWeight={'600'} justifyContent={'space-between'} px={3} _hover={{ bg: bgHoverColor }} borderRadius={'full'} onClick={copyURL}>
              <Text>Copy link</Text>
              <CopyIcon width={5} height={5} />
            </MenuItem>
            {currentUser?._id === user._id && (
              <MenuItem bg={bgColor} fontWeight={'600'} justifyContent={'space-between'} px={3} _hover={{ bg: bgHoverColor }} borderRadius={'full'} onClick={handleDelete}>
                <Text color={'red'}>Delete</Text>
                <DeleteIcon color={'red'} width={5} height={5} />
              </MenuItem>
            )}
          </MenuList>
        </Portal>
      </Menu>
    </Box>
  );
}

export default ThreeDotsIcon;

ThreeDotsIcon.propTypes = {
  user: PropTypes.object.isRequired,
  copyURL:PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}
