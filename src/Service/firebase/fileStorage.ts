import {storage} from "../../Firebase";
import {ref,deleteObject} from 'firebase/storage'

export const deleteImage = (photoName:string) => {
    const imageRef = ref(storage,photoName)
    deleteObject(imageRef).then(():void => {
        console.log('old image removed')
    }).catch((error):void => {
        console.log(error.message)
    })
}