import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const DataEditor = (date: string | undefined): string => {
    if(!date){
        return ""
    }
        return date.split('T')[0]
}

export const ToastNotifyError = (message: string = '🤔 Something went wrong check if value is correct and not empty!'):void => {
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
export const ToastNotifySuccess = (message: string = '🤔 Operation successfully completed!'):void => {
    toast.success(message, {
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

export const ToastNotifyEdit = (message: string = 'Your edit operation is done successfully'):void => {
    toast.warning(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}