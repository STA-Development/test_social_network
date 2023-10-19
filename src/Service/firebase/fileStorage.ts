import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../Firebase';

const deleteImage = (photoName: string) => {
  const imageRef = ref(storage, photoName);
  deleteObject(imageRef)
    .then((): void => {
      console.log('old image removed');
    })
    .catch((error): void => {
      console.log(error.message);
    });
};
export default deleteImage;
