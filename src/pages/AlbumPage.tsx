import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import AlbumLoader from '../components/AlbumLoader';
import { useNavigate } from 'react-router-dom'
import { VARIABLES, STYLES } from '../bo/Variables';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UploadAlbumModel from '../components/Models/UploadAlbumModel';
import LoadingScreen from '../components/LoadingScreen';
import SetLocationModel from '../components/Models/SetLocationModel';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { albumReponceData, isLocationSetUser, checkIsLocationSetAPIStore, getAlbumAPIStore, IAlbumStores, ICheckIsLocationSet } from '../stores/AlbumStores';

const settingsPromise = import("../settings").then(
    ({ settings }) => settings
)

function AlbumPage() {
    const navigate = useNavigate();
    const [displayLoader, setDisplayLoader] = React.useState(false);
    const [loadingScreen, setLoadingScreen] = React.useState(false);
    const [openModel, setOpenModel] = React.useState(false);
    const [openLocationSetModel, setOpenLocationSetModel] = React.useState(false);

    const handleOpenUploadAlbumModel = () => setOpenModel(true);
    const handleCloseUpdateAlbumModel = () => setOpenModel(false);

    const handleOpenSetLocationModel = () => setOpenLocationSetModel(true);
    const handleCloseSetLocationModel = () => setOpenLocationSetModel(false);


    React.useEffect(() => {
        document.title = VARIABLES.pageTitle.homePage;
        if (localStorage.getItem("userToken")) {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, [])

    var items: any = []

    const checkInputHanddler = (e: any, album: any) => {
        items = (() => {
            const fieldValue = localStorage.getItem('selctedAlbums');
            return fieldValue === null
                ? []
                : JSON.parse(fieldValue);
        })();
        if (e.target.checked) {
            items.push(album.id);
        } else {
            items.splice(items.indexOf(album.id), 1);
        }
        localStorage.setItem('selctedAlbums', JSON.stringify(items));
    }

    React.useEffect(() => {
        setLoadingScreen(true);
        localStorage.setItem("selctedAlbums", JSON.stringify([]));
        const fetchAlbum: any = async (): Promise<void> => {
            settingsPromise.then(async (settings): Promise<IAlbumStores> => {
                const albumStores = await getAlbumAPIStore(settings).GetAlbums(); //Responce from Album API
                if (albumStores === true) {
                    localStorage.setItem("albumData", JSON.stringify(albumReponceData));
                    setLoadingScreen(false);
                }
                return { GetAlbums: async () => albumStores };
            }).catch(err => {
                console.log("Error [UploadAlbum:FetchAPI(GetData)]: ", err)
            })
        }
        fetchAlbum();
    }, [openModel])


    const uploadAlbumHandler = () => {
        setDisplayLoader(true)
        const fetchCheckLocation: any = async (): Promise<void> => {
            settingsPromise.then(async (settings): Promise<ICheckIsLocationSet> => {
                const checkLocation = await checkIsLocationSetAPIStore(settings).CheckIsLocationSet(); //Responce from Album API
                if (checkLocation === true) {
                    setDisplayLoader(false)
                    handleOpenUploadAlbumModel();
                    console.log("SetLocationModel:: ", isLocationSetUser)
                } else {
                    handleOpenSetLocationModel();
                    setDisplayLoader(false)
                    handleOpenSetLocationModel();
                }
                return { CheckIsLocationSet: async () => checkLocation };
            })
        }
        fetchCheckLocation();
    }

    return (
        <div style={{ display: 'flex', flexDirection: "column" }}>
            <div style={{ display: 'flex', justifyContent: "space-between", margin: "0px 20px 10px 20px", alignItems: "center" }}>
                <div>
                    <span style={{ fontSize: "25px" }}>Album</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className='buttonAlbumClick deleteForever' onClick={() => { alert("Deleted" + localStorage.getItem('selctedAlbums')) }}>
                        <DeleteForeverRoundedIcon style={{ fontSize: "20px", marginRight: 10 }} />
                        <span>Delete</span>
                    </div>
                    <div className='buttonAlbumClick' onClick={uploadAlbumHandler}>
                        <AddCircleOutlineIcon style={{ fontSize: "20px", marginRight: 10 }} />
                        <span>Add Album</span>
                    </div>
                    <div className='buttonAlbumClick'>
                        <FilterListIcon style={{ fontSize: "20px", marginRight: 10 }} />
                        <span>Filter</span>
                    </div>
                </div>
            </div>
            <Divider style={{ marginBottom: 20 }} />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {albumReponceData !== undefined ? albumReponceData.map((album: any, index: number) => {
                    return <AlbumLoader key={Math.random()} album={album} checkInputHanddler={checkInputHanddler} />
                }) : <div>Loading...</div>}
            </div>

            <Modal
                open={openModel}
                onClose={handleCloseUpdateAlbumModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={STYLES.AlbumPage.modelStyle}>
                    <UploadAlbumModel handleCloseUpdateAlbumModel={handleCloseUpdateAlbumModel} />
                </Box>
            </Modal>
            <Modal
                open={openLocationSetModel}
                onClose={handleCloseSetLocationModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={STYLES.AlbumPage.modelStyle}>
                    <SetLocationModel handleCloseSetLocationModel={handleCloseSetLocationModel} />
                </Box>
            </Modal>

            <div className='loadingBox' style={{ display: displayLoader ? "block" : "none" }} >
                <div className='loadingMessageAnimation'>
                    <span>Creating Album...</span>
                </div>
            </div>
            <div className='loadingScreen' style={{ display: loadingScreen ? "block" : "none" }}>
                <LoadingScreen />
            </div>
        </div>
    )
}

export default AlbumPage