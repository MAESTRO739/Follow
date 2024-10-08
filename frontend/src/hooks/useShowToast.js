import { useToast } from '@chakra-ui/react';

const useShowToast = () => {
  const toast = useToast()
  return (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true
    })
  };
}

export default useShowToast
