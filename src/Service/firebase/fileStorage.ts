import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../Firebase';
import { ToastNotifyError } from '../../Helpers';

const deleteImage = async (photoName: string) => {
  const imageRef = ref(storage, photoName);
  try {
    await deleteObject(imageRef);
  } catch (error) {
    if (error instanceof Error) {
      ToastNotifyError(error.message);
    }
  }
};
export default deleteImage;
