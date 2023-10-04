import React, {useState} from "react";
import CommentDialogSection from "./CommentDialogSection";

//TODO make that if user have commented it's avatar will be at first in commented users section and be highlighted
const CommentSection = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <section className="w-full flex justify-center p-3 mt-3">
            <form className="w-full">
                <div>
                    <textarea
                        id="message" rows={4}
                        className="block p-2.5 w-full text-sm text-gray-dark bg-gray-50 rounded-lg border-hardBlue resize-none"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                    <div className="w-full flex items-center justify-between rounded-lg h-16">
                        <button onClick={(e) => handleClickOpen(e)}
                            className = "w-1/5 mt-3 bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-white-dark p-1 rounded transition duration-200 ease-in"
                        >Show Comments</button>
                        <button
                            className = "w-1/5 mt-3 bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-white-dark p-1 rounded transition duration-200 ease-in"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
            <CommentDialogSection handleClickOpen={handleClickOpen} handleClose={handleClose} open = {open} />
        </section>
    )
}

export default CommentSection