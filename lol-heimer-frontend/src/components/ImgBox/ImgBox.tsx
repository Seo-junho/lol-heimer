import React from 'react';

interface IProps {
  className?: string;
  style?: object;
  imgUrl: string;
}

const ImgBox: React.FC<IProps> = ({
  className = '',
  style = {},
  imgUrl,
  children,
}) => {
  return (
    <div
      className={`${className} bg-cover bg-no-repeat`}
      style={{
        ...style,
        backgroundImage: `${imgUrl}`,
      }}
    >
      { children }
    </div>
  );
}

export default ImgBox;
