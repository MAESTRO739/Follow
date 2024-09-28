import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Box, IconButton } from "@chakra-ui/react";
import { useColors } from '../ColorContext';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';

const LogoutButton = () => {
  const { bgColor, bgHoverColor, borderColor } = useColors();

  const setUser = useSetRecoilState(userAtom);

  const showToast = useShowToast();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return
      }

      localStorage.removeItem('user-info');
      setUser(null);
    } catch (error) {
      showToast('Error', error, 'error');
    }
  }

  return (
    <Box role="button" tabIndex="0">
      <IconButton
        aria-label="Log out"
        icon={<FontAwesomeIcon icon={faSignOutAlt} />}
        size="md" 
        variant="solid"
        bg={bgColor}
        sx={{
          svg: { color: 'gray' },
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
        onClick={handleLogout}
      />
    </Box>
  )
}

export default LogoutButton