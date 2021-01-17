import { ImgBoxProps } from '@dtos/ImgBox/ImgBox.dto';
import React from 'react';

const ImgBox: React.FC<ImgBoxProps> = ({
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
			role="image"
    >
      { children }
    </div>
  );
}

export default ImgBox;
