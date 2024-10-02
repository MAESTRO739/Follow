import { useState } from "react"
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState('')
  const showToast = useShowToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast('Invalid file type', 'Please select an image', 'error');
      setImgUrl('');
    }
  }
  return {handleImageChange, imgUrl}
}

export default usePreviewImg