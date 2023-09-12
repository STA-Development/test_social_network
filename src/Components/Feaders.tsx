import React from "react";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const Feaders = () => {
    return (
        <div className="w-full flex justify-center items-center">
                    <div className="w-6/12 p-6 border-2 border-hardBlue">
                        <div className="flex justify-start items-center">
                            <img className="object-cover h-48 w-66"  src="https://images.squarespace-cdn.com/content/v1/57263bf8f8baf385ff61bb09/1535668320137-NZQPOXCGLFT34I9E4Z1E/Screen+Shot+2018-08-30+at+6.17.10+PM.png" alt=""/>
                        </div>
                        <div>
                            <p className="text-left border-b-2 mb-3 border-hardBlue">Title:</p>
                            <p className="text-left text-2xl ">My first Post</p>
                        </div>
                        <div className="mt-5 mb-3">
                            <p className="text-left border-b-2 mb-3 border-hardBlue">description:</p>
                            <p className="text-left text-base ">lorem ipsum dolar sit amed</p>
                        </div>
                        <div className="w-full flex justify-end">
                            <button className="flex justify-center items-center transition duration-150 ease-in-out  bg-transparent hover:bg-blue-500 text-hardBlue font-semibold hover:text-green py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                <span className="mt-1 mr-1">Follow</span>
                                <ThumbUpOutlinedIcon />
                            </button>
                        </div>

                    </div>
        </div>
    )
}
export default Feaders