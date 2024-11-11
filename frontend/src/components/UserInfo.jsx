import { Flex, Image, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useColors } from "../ColorContext";

const UserInfo = ({ name, username, createdAt }) => {
  const { postTextColor } = useColors();

  const navigate = useNavigate();

  return (
    <Flex 
      gap={{ base: 0, md: 1 }} 
      w="full" 
      flexDirection={{ base: "column", md: "row" }}
      minWidth={0}
    >
      <Flex 
        alignItems="center" 
        gap={1} 
        mt={{ base: 2, md: 0 }} 
        _hover={{ textDecoration: 'underline' }}
        onClick={(e) => {
          e.preventDefault()
          navigate(`/${username}`)
        }}
      >
        <Text 
          color={postTextColor} 
          fontSize="md" 
          fontWeight="bold" 
          whiteSpace="nowrap" 
          overflow="hidden" 
          textOverflow="ellipsis"
        >
          {name}
        </Text>
        <Image src="/verified.png" w={4} h={4} mr="2px" mt="2px" alt="Verified Icon" />
      </Flex>
      <Flex gap={1} alignItems="center" mt={{ base: -1, md: 0 }} mb={{ base: 2, md: 0 }}>
        <Text 
          fontSize="md" 
          color="gray.light" 
          className="separator-dot" 
          mr="4px"
          whiteSpace="nowrap" 
          overflow="hidden" 
          textOverflow="ellipsis"
          onClick={(e) => {
            e.preventDefault()
            navigate(`/${username}`)
          }}
        >
          @{username}
        </Text>
        <Text 
          fontSize="md" 
          color="gray.light" 
          whiteSpace="nowrap" 
          overflow="hidden" 
          textOverflow="ellipsis"
        >
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  )
};

export default UserInfo;

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
}