import { Box, Flex, Image, useColorMode, Link } from '@chakra-ui/react'
import BackButton from './BackButton'
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutButton from './LogoutButton';
import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';


const Header = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  const backButtonTo = location.state?.from || '/';
  const showBackButton = location.pathname !== '/' && location.pathname !== '/auth';

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
        <Link as={RouterLink} to={`/${user.username}`} state={{ from: location }} ml={16}>
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