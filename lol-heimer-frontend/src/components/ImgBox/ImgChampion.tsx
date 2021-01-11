import React from 'react';

interface IProps {
  className?: string;
  size?: string;
  imgUrl: string;
}

const ImgChampion: React.FC<IProps> = ({
  className = '',
  size = '20px',
  imgUrl,
}) => {
  return (
    <div
      className={`${className} bg-cover bg-no-repeat`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${imgUrl})`,
      }}
    >
    </div>
  );
}

export default ImgChampion;
