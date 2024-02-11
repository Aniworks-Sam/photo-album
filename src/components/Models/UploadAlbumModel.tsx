import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { createAlbumAPIStore, createNewAlbum, ICreateAlbumStore } from '../../stores/AlbumStores';

const settingsPromise = import("../../settings").then(
    ({ settings }) => settings
)

type Props = {
    handleCloseUpdateAlbumModel: () => void;
}

function UploadImageModel({ handleCloseUpdateAlbumModel }: Props) {
    const [albumName, setAlbumName] = React.useState('');

    const dataUpload = async () => {

        const fetchCreateAlbum: any = async (): Promise<void> => {
            settingsPromise.then(async (settings): Promise<ICreateAlbumStore> => {
                const createAlbum = await createAlbumAPIStore(settings, albumName).CreateAlbum();
                if (createAlbum === true) {
                    if (createNewAlbum === "Album Exist") {
                        alert("Album Already Exist")
                    } else {
                        alert("Album Created")
                        handleCloseUpdateAlbumModel();
                    }
                }
                return { CreateAlbum: async () => createAlbum };
            })
        }
        fetchCreateAlbum();
    }
    const handleCancle = () => {
        setAlbumName("")
        handleCloseUpdateAlbumModel();
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", marginBottom: 20 }}>
                <h2>Create Album</h2>
                <CloseIcon onClick={handleCancle} style={{ fontSize: 30 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "100%" }}>
                    <div style={{ display: 'flex', flexDirection: "column" }}>
                        <input type="text" className='fs-anim-lower' placeholder='Add Title' onInput={(e) => { setAlbumName(e.currentTarget.value) }} />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 35, justifyContent: "flex-end" }}>
                <button className='clickCancleBtn' onClick={handleCancle}>Cancle</button>
                <button className="clickUploadBtn" onClick={dataUpload}>Click To Upload</button>
            </div>
        </div>
    )
}

export default UploadImageModel