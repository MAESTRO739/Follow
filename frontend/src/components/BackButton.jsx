import { Box, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useColors } from "../ColorContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BackButton = ({ to }) => {
  const { bgColor, bgHoverColor, borderColor, buttonIconColor } = useColors();
  const navigate = useNavigate();

  return (
    <Box role="button" tabIndex="0">
      <IconButton
        aria-label="Back"
        icon={<ArrowBackIcon />}
        size="md" 
        variant="solid"
        bg={bgColor}
        sx={{
          svg: { color: buttonIconColor },
        }}
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
        transition="transform 0.2s ease-in-out"
        onClick={() => navigate(to)}
      />
    </Box>
  );
};

export default BackButton;

BackButton.propTypes = {
  to: PropTypes.string.isRequired
}