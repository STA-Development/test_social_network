import React, { useId } from 'react';
import { Oval } from 'react-loader-spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  styleClass: string;
  loading?: boolean;
  icon?: JSX.Element;
}

const CoreButton: React.FC<ButtonProps> = ({
  text = 'Button text',
  styleClass,
  loading,
  icon = undefined,
  ...rest
}) => {
  return (
    <div>
      {icon ? (
        <button key={useId()} type='button' {...rest} className={styleClass}>
          {loading ? (
            <Oval
              height={25}
              width={25}
              color='#F99417'
              wrapperStyle={{}}
              wrapperClass=''
              visible
              ariaLabel='oval-loading'
              secondaryColor='#F99417'
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            icon
          )}
        </button>
      ) : (
        <button type='button' {...rest} className={styleClass}>
          {loading ? (
            <Oval
              height={25}
              width={25}
              color='#F99417'
              wrapperStyle={{}}
              wrapperClass=''
              visible
              ariaLabel='oval-loading'
              secondaryColor='#F99417'
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            text
          )}
        </button>
      )}
    </div>
  );
};

export default CoreButton;
