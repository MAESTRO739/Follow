import { Flex, Image, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const UserInfo = ({ postTextColor, name, username, createdAt }) => (
    <Flex 
      gap={{ base: 0, md: 1 }} 
      w="full" 
      flexDirection={{ base: "column", md: "row" }}
      minWidth={0}
    >
      <Flex alignItems="center" gap={1} mt={{ base: 2, md: 0 }}>
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
        <Image src="/verified.png" w={4} h={4} mr="2px" mt="3px" alt="Verified Icon" />
      </Flex>
      <Flex gap={1} alignItems="center" mt={{ base: -1, md: 0 }} mb={{ base: 2, md: 0 }}>
        <Text 
          fontSize="md" 
          color="gray.light" 
          className="separator-dot" 
          mr="1px"
          whiteSpace="nowrap" 
          overflow="hidden" 
          textOverflow="ellipsis"
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
  );

export default UserInfo;

UserInfo.propTypes = {
  postTextColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
}