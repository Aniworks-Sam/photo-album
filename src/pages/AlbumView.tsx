import React from 'react'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { useParams, useNavigate } from "react-router-dom"
import ImageView from '../components/ImageView';
import LoadingScreen from '../components/LoadingScreen';
import PermissionModel from '../components/Models/PermissionModel';
import { STYLES, PROPS } from "../bo/Variables"
import { albumFilesReponceData, albumSignedURLReponceData, getAlbumFilesAPIStore, IGetSingleAlbumFilesStore, IUploadGetAlbumSignedURLStore, IUploadImageInSignedURLStore, uploadGetAlbumSignedURLAPIStore, uploadImageInSignedURLAPIStore } from '../stores/AlbumStores';
import { IGetAlbumFileDTO } from '../dto/GetAlbum/getAlbumFiles';

const settingsPromise = import("../settings").then(
    ({ settings }) => settings
)

function AlbumView() {
    const navigate = useNavigate();
    const inputImageRef = React.useRef<HTMLInputElement>(null);
    const [trackBtn, setTrackBtn] = React.useState(0);
    const [imageData, setImageData] = React.useState<Array<IGetAlbumFileDTO>>([]);
    const [loadingScreen, setLoadingScreen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpenPermissionModel = () => setOpen(true);
    const handleClosePermissionModel = () => setOpen(false);
    let { id, albumName } = useParams();

    let localAlbumData: any = localStorage.getItem("albumData");
    localAlbumData === null ? localStorage.setItem("albumData", JSON.stringify([{}])) : localAlbumData = JSON.parse(localAlbumData);

    let albumDta = localAlbumData.find((album: any) => {
        return album.id === id;
    });

    const addButtonClickHandler = () => {
        if (inputImageRef.current) {
            inputImageRef.current.click();
        }
    }

    const imageInputHandller = (e: any) => {
        const file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader.result)
        getPushPlaceToAlbumData(file);
    }

    React.useEffect(() => {
        setLoadingScreen(true);
        const fetchGetAlbumFiles: any = async (): Promise<void> => {
            settingsPromise.then(async (settings): Promise<IGetSingleAlbumFilesStore> => {
                const getAlbumFiles = await getAlbumFilesAPIStore(settings, albumName).GetSingleAlbumFiles();
                if (getAlbumFiles === true) {
                    setImageData(albumFilesReponceData);
                    setLoadingScreen(false);
                }
                return { GetSingleAlbumFiles: async () => getAlbumFiles }
            })
        }
        fetchGetAlbumFiles();
    }, [trackBtn])


    const getPushPlaceToAlbumData = (file: any) => {

        const fetchGetAlbumSignedURL: any = async (): Promise<void> => {
            settingsPromise.then(async (settings): Promise<IUploadGetAlbumSignedURLStore> => {
                const getAlbumSignedURL = await uploadGetAlbumSignedURLAPIStore(settings, albumName, file.name).UploadGetAlbumSignedURL();
                if (getAlbumSignedURL === true) {
                    console.log("Album Signed URL: ", albumSignedURLReponceData);


                    const fetchPutImageInSignedURL: any = async (): Promise<void> => {
                        settingsPromise.then(async (settings): Promise<IUploadImageInSignedURLStore> => {
                            const putImageInSignedURL = await uploadImageInSignedURLAPIStore(albumSignedURLReponceData.uploadUrl, file).UploadImageInSignedURL();
                            if (putImageInSignedURL === true) {
                                console.log("Upload Image In Signed URL: ");
                                setTrackBtn(trackBtn + 1);
                            }
                            return { UploadImageInSignedURL: async () => putImageInSignedURL }
                        })
                    }
                    fetchPutImageInSignedURL();

                }
                return { UploadGetAlbumSignedURL: async () => getAlbumSignedURL }
            })
        }
        fetchGetAlbumSignedURL();


        // fetch(`https://anisoft.us/mailapp/api/data/getalbumsignedurl?key=${albumName}/${file.name}`, {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json",
        //         "X-Access-Token": localStorage.getItem("userToken") || "",
        //     }
        // }).then(res => res.json()).then((data) => {
        //     console.log("data: ", data)
        //     if (data.uploadUrl) {
        //         fetch(data.uploadUrl, {
        //             method: "PUT",
        //             mode: "cors",
        //             headers: {
        //                 'Content-type': 'application/json; charset=UTF-8',
        //                 "Accept": "application/json",
        //                 "X-Access-Token": localStorage.getItem("userToken") || "",
        //                 "Access-Control-Allow-Origin": "*"
        //             },
        //             body: file
        //         })
        //             // .then(res => res.json()) 
        //             .then((data) => {
        //                 console.log("data: ", data)
        //                 console.log("uploaded")
        //                 // getAlbumData(file);
        //                 setTrackBtn(trackBtn + 1);
        //             })
        //             .catch(err => {
        //                 console.log("Error [AlbumView:FetchAPI(UploadFile)]: ", err)
        //             })
        //     }
        // }).catch(err => {
        //     console.log("Error [AlbumView:FetchAPI(GetData)]: ", err)
        // })

    }

    return (
        <div className='albumviewMainCont'>
            <div className='albumviewCont'>
                <div className='albumviewContHeader'>
                    <div className='arrowBackIosRoundedIcon' onClick={() => { navigate("/") }}>
                        <ArrowBackIosRoundedIcon style={{ fontSize: 25 }} />
                    </div>
                    <div className='albumControlMenu'>
                        <div className='deleteOutlineRoundedIcon' onClick={handleOpenPermissionModel}>
                            <DeleteOutlineRoundedIcon style={{ fontSize: 25 }} />
                        </div>
                        <div className='addImageToAlbumIcon' onClick={addButtonClickHandler}>
                            <AddPhotoAlternateRoundedIcon style={{ fontSize: 25 }} />
                            <span className='addText'>Add</span>
                            <input ref={inputImageRef} type="file" name="imageUploadToAlbum" id="imageUploadToAlbum" accept='image/*,video/*' onInput={imageInputHandller} style={{ display: "none" }} />
                        </div>
                    </div>
                </div>
                <div className='albumViewAlbumDetails'>
                    <div className="headerImage" style={{ maxHeight: "25rem", overflow: "hidden" }}>
                        <img src={albumDta.coverUrl} alt="" style={{ width: "100vw" }} />
                    </div>

                    <div className="headerTitle">
                        <span>{albumDta.name.toUpperCase()}</span>
                    </div>
                </div>
                <div className='albumviewContBody'>
                    {imageData.map((image: any, index: number) => (
                        <ImageView image={image} albumName={albumName} id={id} imageData={imageData} imageIndex={index} key={Math.random()} trackBtn={trackBtn} setTrackBtn={setTrackBtn} />
                    ))}
                </div>
            </div>
            <div className='loadingScreen' style={{ display: loadingScreen ? "block" : "none" }}>
                <LoadingScreen />
            </div>
            <Modal
                open={open}
                onClose={handleClosePermissionModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={STYLES.AlbumView.modelStyle}>
                    <PermissionModel PROPS={PROPS.models.permissionModel.delete.albumView} albumName={albumName} handleClosePermissionModel={handleClosePermissionModel} />
                </Box>
            </Modal>
        </div>
    )
}

export default AlbumView