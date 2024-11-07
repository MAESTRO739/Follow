import { Box, Flex, Image, useColorMode, Link } from '@chakra-ui/react'
import BackButton from './BackButton'
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutButton from './LogoutButton';
import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';


const Header = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const location = useLocation();

  let backButtonTo = '/';
  let showBackButton = true;
  let username = '';

  if (location.pathname === '/' || location.pathname === '/auth') {
    showBackButton = false;
  } else if (location.pathname.includes(`/post/`)) {
    const pathParts = location.pathname.split('/');
    username = pathParts[1];
    backButtonTo = `/${username}`;
  } else if (location.pathname.includes(`edit-profile`)) {
    backButtonTo = `/${user.username}`;
  }

  return (
    <Flex position="relative" justifyContent="center" alignItems="center" mt={5} mb={5}>
      {showBackButton && (
        <Box position="absolute" left={5}>
          <BackButton to={backButtonTo} />
        </Box>
      )}

      {user && (
        <Link as={RouterLink} to={'/'} mr={16}>
          <AiFillHome size={28} />
        </Link>
      )}

      <Image
        cursor="pointer"
        alt="logo"
        w={8}
        src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
        onClick={toggleColorMode}
      />

      {user && (
        <Link as={RouterLink} to={`/${user.username}`} ml={16}>
          <RxAvatar size={28} />
        </Link>
      )}

      {user && (
        <Box position="absolute" right={5}>
          <LogoutButton />
        </Box>
      )}
    </Flex>
  )
}

export default Header

Header.propTypes = {
  user: PropTypes.object
}