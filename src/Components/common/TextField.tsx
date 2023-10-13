import {ComponentProps} from "react";
import {Input} from "@mui/material";
interface ITextField {
    styles: string // search react styles Type ;
    type: string
    isError?: boolean,
    errorMessage?: string,
    onChange?: (value: string) => void
    value?: string | number
}

/**
 *  Returns the input with given parameters
 *  @param styles - tailwind classes
 *  @param tpye- type of input
 *
 *
 *
 * */

export const TextField = ({styles, type, isError, errorMessage, onChange,value}: ITextField) => {
    return (
        <div>
            {isError &&
                <label className='text-red' htmlFor="">{errorMessage}:</label>
            }
            <input
                className={!isError?styles : styles + '  !border !border-red outline-none focus:ring-2 focus:ring-inset focus:ring-red' }
                type={type}
                value={value}
                {...onChange}
            />
        </div>
    )
}