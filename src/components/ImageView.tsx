import React from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ImageLargeView from "../pages/ImageLargeView"
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { STYLES } from "../bo/Variables"
import { ImageViewPage_Props } from "../bo/PropsStore"


function ImageView({ image, id, albumName, imageData, imageIndex, trackBtn, setTrackBtn }: ImageViewPage_Props) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selectedImageInfo, setSelectedImageInfo] = React.useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inpItem, setInpItem] = React.useState<any>([]);


    const checkBoxClick = (e: any, album: any) => {
        if (inputRef.current) {
            inputRef.current.click();
            console.log("checkBoxClick", inputRef.current.checked);
            if (inputRef.current.checked) {
                //appending value to usestate seInpItem
                setInpItem((peivious: any) => {
                    return [...peivious, album]
                });
                console.log("checkBoxClick", inpItem);
            } else {
                //removing value to usestate seInpItem
                // const newItem = inpItem.map((item: any) => {
                //     return item.id === album.id ? { ...item, selected: false } : item;
                // })
                // setInpItem(newItem);
            }
        }
    }
    // console.log(imageData, imageIndex)

    var items: any = []
    const checkInputHanddler = (e: any, album: any) => {
        if (e.target.checked) {
            console.log("checked", e.target.checked)
            //push data to usestate
            setInpItem(album)
            console.log(...inpItem);

        } else {
            console.log("unchecked", e.target.checked)
            console.log("inpItem", inpItem);
        }
    }
    const largeImageOpener = () => {
        setSelectedImageInfo({
            image: image,
            albumId: id,
            albumName: albumName,
            imageData: imageData,
            imageIndex: imageIndex
        })
        handleOpen();
    }
    return (
        <>
            <div className="imageSingle">
                <img src={image.url} alt={image.name} style={{ height: 300, borderRadius: 5 }} onClick={largeImageOpener} />
                <input ref={inputRef} type="checkbox" name="selctAlbumCheck" id="selctAlbumCheck" style={{ display: "none" }} />
                <div className='checkIconSingle' style={{ position: "absolute", right: 10, top: 10, zIndex: 9 }} onClick={(e: any) => { checkBoxClick(e, `${albumName}/${image.name}`) }}>
                    <CheckCircleRoundedIcon className='checkCircleRoundedIcon' />
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={STYLES.ImageView}>
                    <ImageLargeView selectedImageInfo={selectedImageInfo} handleClose={handleClose} trackBtn={trackBtn} setTrackBtn={setTrackBtn} />
                </Box>
            </Modal>
        </>
    )
}

export default ImageView