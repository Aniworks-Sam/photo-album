import React from 'react'
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom'
import { deleteAlbumAPIStore, IDeleteAlbumStore } from '../../stores/AlbumStores';

const settingsPromise = import("../../settings").then(
    ({ settings }) => settings
)

type Props = {
    PROPS: any,
    handleClosePermissionModel: () => void,
    albumName: any,
}

function PermissionModel({ PROPS, handleClosePermissionModel, albumName }: Props) {
    const navigate = useNavigate();

    const checkActionDetails = () => {
        if (PROPS.pathName === "albumView") {
            if (PROPS.actionName === "deleteAlbum") {

                const deleteAlbum: any = async (): Promise<void> => {
                    settingsPromise.then(async (settings): Promise<IDeleteAlbumStore> => {
                        const deleteAlbum = await deleteAlbumAPIStore(settings, albumName).DeleteAlbum();
                        if (deleteAlbum === true) {
                            handleClosePermissionModel();
                            navigate("/");
                        }

                        return { DeleteAlbum: async () => deleteAlbum }
                    })

                }
                deleteAlbum();
            }
        }
    }

    return (
        <div>
            <div className='titlePermission'>
                <div className='titlePermissionText'>
                    <h2>{PROPS.title}</h2>
                </div>
                <div className='titlePermissionClose' onClick={() => handleClosePermissionModel()}>
                    <CloseRoundedIcon className='deleteOutlineRoundedIcon' />
                </div>
            </div>
            <div className='permissionText'>
                <p>{PROPS.message}</p>
            </div>
            <div className="btnControl">
                <Button variant="outlined" onClick={() => handleClosePermissionModel()} >{PROPS.cancelButtonText}</Button>
                <Button variant="contained" color="error" onClick={checkActionDetails}>{PROPS.confirmButtonText}</Button>
            </div>
        </div>
    )
}

export default PermissionModel