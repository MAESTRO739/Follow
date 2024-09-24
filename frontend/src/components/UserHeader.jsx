import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from '@chakra-ui/react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { useColors } from '../ColorContext';

const UserHeader = () => {
  const { bgColor, borderColor, avatarBorderColor, highlightedBorderColor, iconHoverColor } = useColors();

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
      bg={bgColor}
      borderTopRadius={'2xl'}
      border={"1px solid"}
      borderColor={borderColor}
      borderBottom={'none'}
      boxShadow="lg"
      w='full'
    >
      <VStack gap={2} p={6} pt={4} pb={2} boxSizing={'border-box'} alignItems={'flex-start'}>
        <Flex 
          justifyContent={"space-between"} 
          alignItems="center" 
          w="full"
        >
          <Box>
            <Text fontSize={"2xl"} fontWeight={'bold'} whiteSpace="normal" wordBreak="break-word">Mark Zuckerberg</Text>
            <Flex gap={2} alignItems={'center'}>
              <Text fontSize={"lg"} color={"gray.light"} whiteSpace="normal" wordBreak="break-word">@MarkZuckerberg</Text>
            </Flex>
          </Box>
          <Box>
            <Avatar 
              name="Mark Zuckerberg"
              src="zuck-avatar.png"
              size={{ base: 'lg', md: 'xl' }}
              borderWidth={'1px'}
              borderStyle={'solid'}
              borderColor={avatarBorderColor}
              showBorder={true}
            />
          </Box>
        </Flex>

        <Text mt={1} whiteSpace="normal" wordBreak="break-word" lineHeight={'1.3'}>
          Co-founder, executive chairman and CEO of Meta Platforms. (and a martian)
        </Text>
        <Flex w={'full'} justifyContent={'space-between'}>
          <Flex gap={2} alignItems={'center'} minWidth={0}>
            <Text color={"gray.light"} whiteSpace="nowrap" className="separator-dot">
              4.5M followers
            </Text>
            <Link 
              color={'gray.light'}
              whiteSpace='nowrap' 
              overflow="hidden" 
              textOverflow="ellipsis"
            >
              instagram.com
            </Link>
          </Flex>
          <Flex>
            <Box className='icon-container' _hover={{ backgroundColor: iconHoverColor }} cursor={"pointer"}>
              <BsInstagram title="Instagram" size={24}/>
            </Box>
            <Box className='icon-container' _hover={{ backgroundColor: iconHoverColor }} title="More" cursor={"pointer"}>
              <Menu>
                <MenuButton>
                  <CgMoreO size={24}/>
                </MenuButton>
                <Portal>
                  <MenuList bg={bgColor}>
                    <MenuItem bg={bgColor} onClick={copyURL}>Copy Link</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>
      </VStack>
      <Flex w={'full'}>
        <Flex flex={1} borderBottom={"1.5px solid"} borderColor={highlightedBorderColor} justifyContent={'center'} pb={2} cursor={'pointer'}>
          <Text fontSize={{ base: "sm", md: "md" }} fontWeight={600}>Posts</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid"} borderColor={avatarBorderColor} justifyContent={'center'} pb={2} color={'gray.light'} cursor={'pointer'}>
          <Text fontSize={{ base: "sm", md: "md" }} fontWeight={600}>Replies</Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default UserHeader
