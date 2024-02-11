import React from "react";
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LikeCommentEmoji from "./LikeCommentEmoji";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import LargeImageControl from "./LargeImageControl";


type Props = {
    selectedImageInfo: any,
    handleClose: () => void,
    handleDrawerOpen: () => void
    currentIndex: number
    setCurrentIndex: (index: number) => void
    trackBtn: number,
    setTrackBtn: (trackBtn: number) => void,
    imageData: any
}

function ImageVisible({ selectedImageInfo, handleClose, handleDrawerOpen, currentIndex, setCurrentIndex, setTrackBtn, trackBtn, imageData }: Props) {

    const backwordClick = () => {
        if (currentIndex === 0) {
            return;
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    }
    const forwardClick = () => {
        if (currentIndex === selectedImageInfo.imageData.length - 1) {
            return;
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }

    return (
        <div className='imageDisplayFullScreen'>
            {/* <h1 style={{ color: "#fff" }}>Hello</h1> */}

            <LargeImageControl selectedImageInfo={selectedImageInfo} handleClose={handleClose} handleDrawerOpen={handleDrawerOpen} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} trackBtn={trackBtn} setTrackBtn={setTrackBtn} />

            <div className="imageDisplayFullScreenImageChangeBtn">
                <div className="imageDisplyaBtn" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 99, height: "97vh" }}>
                    <div className="imageDisplayFullScreenImageChangeBtnCont">
                        <div className="imageDisplayFullScreenImageChangeBtnDisplayNone" onClick={backwordClick}  >
                            <ArrowBackIosNewRoundedIcon className='iconStylingLargeImageView imageChangeBtn arrowBack' onClick={backwordClick} style={{ display: currentIndex === 0 ? "none" : "block" }} />
                        </div>
                    </div>
                    <div className="imageDisplayFullScreenImageChangeBtnCont">
                        <div className="imageDisplayFullScreenImageChangeBtnDisplayNone" onClick={forwardClick}>
                            <ArrowForwardIosRoundedIcon className='iconStylingLargeImageView imageChangeBtn arrowForword' onClick={forwardClick} style={{ display: currentIndex === (selectedImageInfo.imageData.length - 1) ? "none" : "block" }} />
                        </div>
                    </div>
                </div>
            </div>


            <div className="likeAndCommentContainer">
                <LikeCommentEmoji selectedImageInfo={selectedImageInfo} currentIndex={currentIndex} imageData={imageData} />
            </div>

        </div>
    );
}

export default ImageVisible;