import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const DataEditor = (date: string | undefined): string => {
    console.log('...editing')
    if(!date){
        return ""
    }
        return date.split('T')[0]
}

export const ToastNotify = (message: string = '🤔 Something went wrong check if value is correct and not empty!'):void => {
    console.log('...toasting')
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}