import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useColors } from '../ColorContext';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';

export default function LoginCard() {
  const { bgColor, borderColor, buttonBgColor, buttonTextColor, buttonHoverBgColor } = useColors();

  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={28} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Log in
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={bgColor}
          boxShadow={'lg'}
          p={8}
          border={'1px solid'}
          borderColor={borderColor}
          w={{ base: 'full', sm: '400px' }}
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={buttonBgColor}
                color={buttonTextColor}
                _hover={{
                  bg: buttonHoverBgColor,
                }}>
                Log in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don&apos;t have an account?  <Link color={'blue.400'} onClick={() => setAuthScreen('signup')}>Sign up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
