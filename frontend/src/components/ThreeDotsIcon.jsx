import { Box, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";

const ThreeDotsIcon = ({ iconHoverColor, bgColor, copyURL }) => (
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
        <MenuList bg={bgColor}>
          <MenuItem bg={bgColor} onClick={copyURL}>Copy Link</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  </Box>
);

export default ThreeDotsIcon;

ThreeDotsIcon.propTypes = {
  iconHoverColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  copyURL:PropTypes.func.isRequired
}