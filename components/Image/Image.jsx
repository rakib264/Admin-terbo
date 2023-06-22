import Image from 'next/image'
import React from 'react'

const ImageCom = ({
    src,
    width,
    height,
    alt, 
    className
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width && width}
      height={height && height}
      className={`mx-auto
      ${className ? className : ''}
      `}
    />
  )
}

export default ImageCom
