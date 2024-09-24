import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost 
        likes={492}
        replies={78}
        reposts={16}
        postImage={'/post1.png'}
        postTitle={'I look good here, like a real human!'}
      />
      <UserPost 
        likes={230}
        replies={21}
        reposts={4}
        postImage={'/post2.png'}
        postTitle={"Great tutorial!"}
      />
      <UserPost 
        likes={368}
        replies={40}
        reposts={15}
        postImage={'/post3.png'}
        postTitle={'I love this guy!'}
      />
      <UserPost 
        likes={167}
        replies={12}
        reposts={3}
        postImage={''}
        postTitle={'This is my first post!'}
      />
    </>
  )
} 

export default UserPage