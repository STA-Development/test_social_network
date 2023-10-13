import React from 'react';
import {Oval} from "react-loader-spinner";

interface ButtonPorps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
    styleClass: string
    loading: boolean
    icon?:any
}


const CoreButton:React.FC<ButtonPorps> = ({text,styleClass,loading,icon, ...rest}) => {
    return (
        <div>
            {icon ?
                <button {...rest} className={styleClass}>
                    {loading?
                        <Oval
                            height={25}
                            width={25}
                            color="#F99417"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#F99417"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                        :
                        icon
                    }
                </button>
                :
                <button className={styleClass}>
                    {loading?
                        <Oval
                            height={25}
                            width={25}
                            color="#F99417"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#F99417"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                        :
                        text
                    }
                </button>
            }

        </div>
    );
};

export default CoreButton;