import { Avatar, Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack } from '@chakra-ui/react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { useColors } from '../ColorContext';
import useShowToast from '../hooks/useShowToast';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

const UserHeader = ({ user }) => {
  const { 
          bgColor, 
          bgHoverColor, 
          borderColor, 
          avatarBorderColor, 
          highlightedBorderColor, 
          iconHoverColor, 
          buttonBgColor,
          buttonHoverBgColor,
          buttonTextColor
        } = useColors();

  const showToast = useShowToast();

  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(user.followers.includes(currentUser._id));

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      showToast('Profile link copied', '', 'success');
    });
  };

  const formatNumber = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K';
    } else if (num > 999999) {
      return (num / 1000000).toFixed(1) + 'M';
    } else {
      return num;
    }
  };

  const handleFollowUnfollow = async () => {
    try {
      const res = await fetch(`api/users/follow/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      }); 
      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      
      if (following) {  
        showToast('Unfollowed', '', 'success');
      }

      setFollowing(!following);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
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
            <Text fontSize={"2xl"} fontWeight={'bold'} whiteSpace="normal" wordBreak="break-word">{user.name}</Text>
            <Flex gap={2} alignItems={'center'}>
              <Text fontSize={"lg"} color={"gray.light"} whiteSpace="normal" wordBreak="break-word">@{user.username}</Text>
            </Flex>
          </Box>
          <Box>
            <Avatar 
              name={user.name}
              src={user.avatar || 'https://bit.ly/broken-link'}
              size={{ base: 'lg', md: 'xl' }}
              showBorder={true}
              borderWidth={'1px'}
              borderStyle={'solid'}
              borderColor={avatarBorderColor}
            />
          </Box>
        </Flex>

        <Text mt={1} whiteSpace="normal" wordBreak="break-word" lineHeight={'1.3'}>
          {user.bio}
        </Text>

        <Flex w={'full'} justifyContent={'space-between'}>
          <Flex gap={2} alignItems={'center'} minWidth={0}>
            <Text color={"gray.light"} whiteSpace="nowrap" className="separator-dot">
              {formatNumber(user.followers.length)} followers
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
                    <MenuItem bg={bgColor} onClick={copyURL}>Copy link</MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>

        {currentUser && currentUser._id === user._id && (
          <Flex w={'full'} mb={4} mt={2}>
            <Link as={RouterLink} to={'/edit-profile'} _hover={{ textDecoration: 'none' }} w={'full'}>
              <Button 
                bg={'transparent'}
                _hover={{
                  bg: bgHoverColor,
                }}
                fontSize={{ base: "sm", md: "md" }} 
                fontWeight={'600'} 
                w={'full'} 
                h={'auto'}
                py={2}
                border={"1px solid"} 
                borderColor={avatarBorderColor}
                borderRadius={'10px'}
              >
                Edit profile
              </Button>
            </Link>
          </Flex>
        )}

        {currentUser && currentUser._id !== user._id && (
          <Button 
            bg={following ? 'transparent' : buttonBgColor}
            _hover={{
              bg: following ? bgHoverColor : buttonHoverBgColor,
            }}
            color={following ? '' : buttonTextColor}
            fontSize={{ base: "sm", md: "md" }} 
            fontWeight={'600'}  
            borderRadius={'10px'}
            border={"1px solid"} 
            borderColor={avatarBorderColor}
            onClick={handleFollowUnfollow}
          >
            {following ? 'Unfollow' : 'Follow'}
          </Button>
        )}
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

UserHeader.propTypes = {
  user: PropTypes.object.isRequired
}