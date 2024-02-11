import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DrawerImageDetails from '../components/DrawerImageDetails';
import ImageVisible from "../components/ImageVisible";
import EXIF from 'exif-js';
import { binaryImageData, IViewLargeImageStore, viewSelectedLargeImageAPIStore } from '../stores/AlbumStores';

const settingsPromise = import("../settings").then(
    ({ settings }) => settings
)

type Props = {
    selectedImageInfo: any,
    handleClose: () => void,
    trackBtn: number,
    setTrackBtn: (trackBtn: number) => void
}

function ImageLargeView({ selectedImageInfo, handleClose, trackBtn, setTrackBtn }: Props) {
    const [open, setOpen] = React.useState(false);
    const [imageData, setImageData] = React.useState<any>({});
    const [currentIndex, setCurrentIndex] = React.useState(selectedImageInfo.imageIndex);

    useEffect(() => {
        handleChange();
    }, [currentIndex]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    function secondHandle({ target: { files: [file] } }: any) {
        if (file && file.name) {
            EXIF.getData(file, function () {
                const allMetaData = EXIF.getAllTags(file);
                allMetaData ? setImageData({ "allMetaData": allMetaData, "fileName": file, "imageDet": selectedImageInfo.imageData[currentIndex] }) : console.log("no metadata");
            });
        }
    }

    function handleChange() {
        const url = selectedImageInfo.imageData[currentIndex].url;
        const fileName = selectedImageInfo.imageData[currentIndex].name;

        const fetchLargeImg = async (): Promise<void> => {
            settingsPromise.then(async (settings): Promise<IViewLargeImageStore> => {
                const getLargeImg = await viewSelectedLargeImageAPIStore(url).ViewLargeImage();
                if (getLargeImg === true) {
                    console.log(getLargeImg, binaryImageData);
                    //convert binary data to blob files
                    const contentType = binaryImageData.headers.get('content-type')
                    const blob = await binaryImageData.blob()
                    const file = new File([blob], fileName, contentType ? { type: contentType } : {})
                    secondHandle({ target: { files: [file] } })
                }
                return { ViewLargeImage: async () => getLargeImg }
            })
        }
        fetchLargeImg();

        // console.log(url)
        // fetch(url)
        //     .then(async response => {
        //         console.log(response)
        //         const contentType = response.headers.get('content-type')
        //         const blob = await response.blob()
        //         const file = new File([blob], fileName, contentType ? { type: contentType } : {})
        //         secondHandle({ target: { files: [file] } })
        //     }).catch(err => {
        //         console.log("Error [ImageLargeView:FetchAPI(GetData)]: ", err)
        //     })
    };

    return (
        <div className='imageDisplayFullScreenCont'>
            {imageData.allMetaData ? (
                <div>
                    <ImageVisible imageData={imageData} selectedImageInfo={selectedImageInfo} handleClose={handleClose} handleDrawerOpen={handleDrawerOpen} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} trackBtn={trackBtn} setTrackBtn={setTrackBtn} />
                    <DrawerImageDetails open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} imageData={imageData} />
                </div>
            ) : null}
        </div>
    )
}

export default ImageLargeView