import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  HStack,
  Center,
} from '@chakra-ui/react'
import { useColors } from '../ColorContext';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useRef, useState } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';

export default function EditProfilePage() {
  const { bgColor, borderColor, avatarBorderColor } = useColors();

  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: '',
    bio: user.bio
  });

  const fileRef = useRef(null);
  const [updating, setUpdating] = useState(false);

  const showToast = useShowToast();

  const { handleImageChange, imgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updating) {
      return;
    }

    setUpdating(true);

    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...inputs, avatar: imgUrl })
      });

      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      showToast('Success', 'Profile updated successfully', 'success');
      setUser(data);
      localStorage.setItem('user-info', JSON.stringify(data));
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setUpdating(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}> 
      <Flex align={'center'} justify={'center'}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={bgColor}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          border={'1px solid'}
          borderColor={borderColor}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Edit Profile
          </Heading>
          <FormControl>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar 
                  size="xl" 
                  src={imgUrl || user.avatar} 
                  showBorder={true}
                  borderWidth={'1px'}
                  borderStyle={'solid'}
                  borderColor={avatarBorderColor}
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>Change avatar</Button>
                <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
              </Center>
            </Stack>
          </FormControl>
          <HStack>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setInputs({...inputs, name: e.target.value})}
                value={inputs.name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                onChange={(e) => setInputs({...inputs, username: e.target.value})}
                value={inputs.username}
              />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={(e) => setInputs({...inputs, email: e.target.value})}
              value={inputs.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
              value={inputs.password}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              type="text"
              onChange={(e) => setInputs({...inputs, bio: e.target.value})}
              value={inputs.bio}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button              
              type="submit"
              bg={'green.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'green.500',
              }}
              isLoading={updating}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  )
}
