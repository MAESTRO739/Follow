import { Button, Flex, Link } from '@chakra-ui/react'

const HomePage = () => {
  return (
    <Link href={'/Lasch739'} _hover={{ textDecoration: 'none' }}>
      <Flex w={'full'} justifyContent={'center'}>
        <Button mx={'auto'}>Visit Profile Page</Button>
      </Flex>
    </Link>
  );
};

export default HomePage;