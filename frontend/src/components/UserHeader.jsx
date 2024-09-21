import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from '@chakra-ui/react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'


const UserHeader = () => {
  const toast = useToast()
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Profile link copied.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    });
  };
  return (
    <Box 
      bg="#181818"
      borderRadius="2xl" 
      border={"1px solid #2D2D2D"}
      p={6}
      boxShadow="lg"
      w="full"
      color="white"б
    >
      <VStack gap={4} alignItems={'start'}>
        <Flex justifyContent={'space-between'} w={'full'}>
          <Box marginTop="5px">
            <Text fontSize={"2xl"} fontWeight={'bold'}>Mark Zuckerburg</Text>
            <Flex gap={2} alignItems={'center'}>
              <Text fontSize={'18px'} color={"gray.light"}>@markzuckerberg</Text>
            </Flex>
          </Box>
          <Box>
            <Avatar 
              name="Mark Zuckerberg"
              src="zuck-avatar.png"
              size={"xl"}
              border={"1px solid #2D2D2D"}
              marginTop="-8px"            
            />
          </Box>
        </Flex>

        <Text>Co-founder, executive chairman and CEO of Meta Platforms. (and a martian)</Text>
        <Flex w={'full'} justifyContent={'space-between'}>
          <Flex gap={2} alignItems={'center'}>
            <Text color={"gray.light"} className="separator-dot">
              3.2K followers
            </Text>
            <Link color={'gray.light'}>instagram.com</Link>
          </Flex>
          <Flex>
            <Box className='icon-container'>
              <BsInstagram size={24} cursor={"pointer"}/>
            </Box>
            <Box className='icon-container'>
              <Menu>
                <MenuButton>
                  <CgMoreO size={24} cursor={"pointer"}/>
                </MenuButton>
                <Portal>
                  <MenuList bg={'gray.dark'}>
                    <MenuItem bg={'gray.dark'} onClick={copyURL}>Copy Link</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>

        <Flex w={'full'}>
          <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={'center'} pb={3} cursor={'pointer'}>
            <Text fontWeight={600}>Posts</Text>
          </Flex>
          <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={'center'} pb={3} color={'gray.light'} cursor={'pointer'}>
            <Text fontWeight={600}>Replies</Text>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  )
}

export default UserHeader
