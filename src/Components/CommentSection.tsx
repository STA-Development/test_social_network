import React from "react";

const CommentSection = () => {
    return (
        <section className="w-full flex justify-center p-3 mt-3">
            <form className="w-full">
                <div >
                    <textarea
                        id="message" rows={4}
                        className="block p-2.5 w-full text-sm text-gray-dark bg-gray-50 rounded-lg border-hardBlue resize-none"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                    <div className="w-full flex items-center justify-end rounded-lg h-14">
                        <button
                            className = "w-1/5 my-3 mx-3 bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-gray-dark p-1 rounded transition duration-200 ease-in"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default CommentSection