import { useColorModeValue } from "@chakra-ui/react";
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  const bgColor = useColorModeValue('#ffffff', '#181818');
  const borderColor = useColorModeValue('#D5D5D5', '#2D2D2D')
  const avatarBorderColor = useColorModeValue('rgba(0, 0, 0, 0.15)', 'rgba(243, 245, 247, 0.15)')
  const highlightedBorderColor = useColorModeValue('#000000', 'rgb(243, 245, 247)')
  const iconHoverColor = useColorModeValue('#e0dfdf', '#3a3a3a');
  const bgHoverColor = useColorModeValue('#f0efef', '#252525');
  const threadColor = useColorModeValue('#E0E0E0', '#333639');
  const postTextColor = useColorModeValue('#000000', '#F3F5F7');
  const countColor = useColorModeValue('#424242', '#cccccc'); 

  return (
    <>
      <UserHeader 
        bgColor={bgColor} 
        borderColor={borderColor} 
        avatarBorderColor={avatarBorderColor} 
        highlightedBorderColor={highlightedBorderColor} 
        iconHoverColor={iconHoverColor}
      />
      <UserPost 
        bgColor={bgColor} 
        borderColor={borderColor} 
        avatarBorderColor={avatarBorderColor} 
        iconHoverColor={iconHoverColor}
        bgHoverColor={bgHoverColor}
        threadColor={threadColor}
        postTextColor={postTextColor}
        countColor={countColor}
        likes={492}
        replies={78}
        reposts={16}
        postImage={'/post1.png'}
        postTitle={'I look good here, like a real human!'}
      />
      <UserPost 
        bgColor={bgColor} 
        borderColor={borderColor} 
        avatarBorderColor={avatarBorderColor} 
        iconHoverColor={iconHoverColor}
        bgHoverColor={bgHoverColor}
        threadColor={threadColor}
        postTextColor={postTextColor}
        countColor={countColor}
        likes={230}
        replies={21}
        reposts={4}
        postImage={'/post2.png'}
        postTitle={"Great tutorial!"}
      />
      <UserPost 
        bgColor={bgColor} 
        borderColor={borderColor} 
        avatarBorderColor={avatarBorderColor} 
        iconHoverColor={iconHoverColor}
        bgHoverColor={bgHoverColor}
        threadColor={threadColor}
        postTextColor={postTextColor}
        countColor={countColor}
        likes={368}
        replies={40}
        reposts={15}
        postImage={'/post3.png'}
        postTitle={'I love this guy!'}
      />
      <UserPost 
        bgColor={bgColor} 
        borderColor={borderColor} 
        avatarBorderColor={avatarBorderColor} 
        iconHoverColor={iconHoverColor}
        bgHoverColor={bgHoverColor}
        threadColor={threadColor}
        postTextColor={postTextColor}
        countColor={countColor}
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