import { Box, Flex, Image, useColorMode } from '@chakra-ui/react'
import BackButton from './BackButton'
import { useLocation, useParams } from 'react-router-dom';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const location = useLocation(); 
  const { username } = useParams();

  let backButtonTo = '/';
  let showBackButton = true;

  if (location.pathname === '/' || location.pathname === `/auth`) {
    showBackButton = false;
  } else if (location.pathname.includes(`/post/`)) {
    backButtonTo = `/@${username}`;
  } else if (location.pathname.includes(`/@${username}`)) {
    backButtonTo = `/`;
  }

  return (
    <Flex position="relative" justifyContent="center" alignItems="center" mt={5} mb={5}>
      {showBackButton && (
        <Box position="absolute" left={5}>
          <BackButton to={backButtonTo} />
        </Box>
      )}
      <Image
        cursor="pointer"
        alt="logo"
        w={6}
        src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}

export default Header