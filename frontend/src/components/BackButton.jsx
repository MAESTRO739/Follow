import { Box, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useColors } from "../ColorContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BackButton = ({ to }) => {
  const { bgColor, bgHoverColor, borderColor } = useColors();
  const navigate = useNavigate();

  return (
    <Box role="button" tabIndex="0">
      <IconButton
        aria-label="Back"
        icon={<ArrowBackIcon />}
        size="md" 
        variant="solid"
        bg={bgColor}
        _hover={{
          bg: bgHoverColor,
          transform: "scale(1.1)",
        }}
        borderRadius="full"
        style={{
          height: "30px",
          width: "30px",
        }}
        border={'1px solid'} 
        borderColor={borderColor}
        onClick={() => navigate(to)}
        transition="transform 0.2s ease-in-out"
      />
    </Box>
  );
};

export default BackButton;

BackButton.propTypes = {
  to: PropTypes.string.isRequired
}