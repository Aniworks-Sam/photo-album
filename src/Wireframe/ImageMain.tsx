import React from 'react'


type Props = {
    image: any,
}

function ImageMain({ image }: Props) {
    var img = new Image();
    img.src = image.imageData;
    const imgHeight = img.height;
    const imgWidth = img.width;

    return (
        <div className='imageMainDiv' style={{ height: "14rem", maxWidth: "20rem", borderRadius: 10, margin: 5, overflow: 'clip' }}>
            <img src={image.imageData} alt="" style={{ width: "", height: "14rem" }} />
            <div className='hoverTransition'></div>
        </div>
    )
}

export default ImageMain