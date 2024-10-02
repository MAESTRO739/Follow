import { Box } from "@chakra-ui/react"
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <Box mb={16}>
      <UserHeader />
      <UserPost 
        likes={492}
        replies={78}
        reposts={16}
        shares={2}
        postImage={'/post1.png'}
        postTitle={'I look good here, like a real human!'}
        createdAt={'1d'}
      />
      <UserPost 
        likes={230}
        replies={21}
        reposts={4}
        shares={1}
        postImage={'/post2.png'}
        postTitle={"Great tutorial!"}
        createdAt={'4d'}
      />
      <UserPost 
        likes={368}
        replies={40}
        reposts={15}
        shares={3}
        postImage={'/post3.png'}
        postTitle={'I love this guy!'}
        createdAt={'Sep 18, 2024'}
      />
      <UserPost 
        likes={167}
        replies={12}
        reposts={3}
        shares={1}
        postImage={''}
        postTitle={'This is my first post!'}
        createdAt={'Sep 16, 2024'}
      />
    </Box>
  )
} 

export default UserPage