import React from 'react'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CenterFocusWeakRoundedIcon from '@mui/icons-material/CenterFocusWeakRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { saveAs } from 'file-saver';
import EditImagePage from './EditImagePage';
import { useNavigate } from "react-router-dom"
import { LargeImageControl_Props } from "../bo/PropsStore"
import { IRemoveImageFromAlbumStore, ISetAlbumCoverImageStore, removeImagesFromAlbumAPIStore, setAlbumCoverImageAPIStore, albumFilesReponceData } from '../stores/AlbumStores';


const settingsPromise = import("../settings").then(
    ({ settings }) => settings
)

function LargeImageControl({ selectedImageInfo, handleClose, handleDrawerOpen, currentIndex, setCurrentIndex, setTrackBtn, trackBtn }: LargeImageControl_Props) {
    const navigate = useNavigate();
    const [zoomDisplay, setZoomDisplay] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [editImageModel, setEditImageModel] = React.useState(false);

    const handleOpenMore = () => setOpen(true);
    const handleCloseMore = () => setOpen(false);

    const editImageOpenModel = () => {
        handleCloseMore();
        setEditImageModel(true)
    };
    const editImageCloseModel = () => setEditImageModel(false);

    const donwloadFunc = () => {
        const blob = selectedImageInfo.imageData[currentIndex].url;
        console.log(blob);
        saveAs(blob, selectedImageInfo.imageData[currentIndex].name);
    }
    const deleteSingleImage = () => {

        const fetchRemoveFileFromAlbum: any = async (): Promise<void> => {
            settingsPromise.then(async (settings): Promise<IRemoveImageFromAlbumStore> => {
                const removeImageFromAlbum = await removeImagesFromAlbumAPIStore(settings, selectedImageInfo.albumName, selectedImageInfo.imageData[currentIndex].name).RemoveImageFromAlbum();
                if (removeImageFromAlbum === true) {
                    selectedImageInfo.imageData.splice(currentIndex, 1);
                    setCurrentIndex(0);
                    setTrackBtn(trackBtn + 1);
                }
                return { RemoveImageFromAlbum: async () => removeImageFromAlbum };
            })
        }

        fetchRemoveFileFromAlbum();

    }
    const setAsAlbumCover = () => {

        const fetchSetAlbumCover: any = async (): Promise<void> => {
            settingsPromise.then(async (settings): Promise<ISetAlbumCoverImageStore> => {
                const setAlbumCover = await setAlbumCoverImageAPIStore(settings, selectedImageInfo.albumName, selectedImageInfo.image.name).SetAlbumCoverImage();
                if (setAlbumCover === true) {
                    navigate("/")
                }
                return { SetAlbumCoverImage: async () => setAlbumCover };
            })
        }
        fetchSetAlbumCover();

    }
    return (
        <>
            <div className='imageDisplayFullScreenHeader'>
                <div className='imageDisplayFullScreenHeaderBack' onClick={handleClose}>
                    <ArrowBackIosNewRoundedIcon className='iconStylingLargeImageView navBtnIconStyle' />
                </div>
                <div className="imageDisplayFullScreenHeaderControl">
                    <div>
                        <ShareRoundedIcon className='iconStylingLargeImageView navBtnIconStyle' />
                    </div>
                    <div>
                        <StarBorderRoundedIcon className='iconStylingLargeImageView navBtnIconStyle' />
                    </div>
                    <div onClick={() => { setZoomDisplay(!zoomDisplay) }}>
                        <ZoomInRoundedIcon className='iconStylingLargeImageView navBtnIconStyle' />
                    </div>
                    <div onClick={handleDrawerOpen}>
                        <InfoOutlinedIcon className='iconStylingLargeImageView navBtnIconStyle' />
                    </div>
                    <div onClick={handleOpenMore}>
                        <MoreVertRoundedIcon className='iconStylingLargeImageView navBtnIconStyle' />
                    </div>
                </div>
            </div>
            <div className="imageDisplayMainImage">
                <TransformWrapper initialScale={1} >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <>
                            <div className="zoomControl" style={{ display: zoomDisplay ? "block" : "none" }}>
                                <div className="zoomIn" onClick={() => { zoomIn() }}>
                                    <ZoomInRoundedIcon className='iconStylingLargeImageView zoomIcon navBtnIconStyle' />
                                </div>
                                <div className="resetZoom" onClick={() => { resetTransform() }}>
                                    <CenterFocusWeakRoundedIcon className='iconStylingLargeImageView zoomIcon navBtnIconStyle' />
                                </div>
                                <div className="zoomOut" onClick={() => { zoomOut() }}>
                                    <ZoomOutRoundedIcon className='iconStylingLargeImageView zoomIcon navBtnIconStyle' />
                                </div>
                            </div>
                            <TransformComponent contentStyle={{ transform: "translate3d(0px, 0px, 0px) scale(1)" }}>
                                <img src={selectedImageInfo.imageData[currentIndex].url} alt="" style={{
                                    maxHeight: "100vh", maxWidth: "75rem"
                                }} />
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>
            <Modal
                open={open}
                onClose={handleCloseMore}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <div className="moreInfoLig">
                        <div className="infoListMore" onClick={editImageOpenModel}><span>Edit</span></div>
                        <div className="infoListMore" onClick={donwloadFunc}><span>Download</span></div>
                        <div className="infoListMore" onClick={setAsAlbumCover}><span>Use as Cover</span></div>
                        <div className="infoListMore"><span>Report Abuse</span></div>
                        <div className="infoListMore delete" onClick={deleteSingleImage}><span>Delete</span></div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={editImageModel}
                onClose={editImageCloseModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <EditImagePage editImageCloseModel={editImageCloseModel} selectedImageInfo={selectedImageInfo} currentIndex={currentIndex} />
                </Box>
            </Modal>
        </>
    )
}

export default LargeImageControl