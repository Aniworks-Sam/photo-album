import React from 'react'
import { useNavigate } from 'react-router-dom'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

type Props = {
    album: any,
    checkInputHanddler: (e: any, album: any) => void,
}

function AlbumLoader({ album, checkInputHanddler }: Props) {
    const navigate = useNavigate()
    const inputRef = React.useRef<HTMLInputElement>(null);

    const checkBoxClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
            console.log("checkBoxClick", inputRef.current.checked);
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", marginRight: 10, marginBottom: 10, cursor: "pointer" }}>
            <input ref={inputRef} type="checkbox" name="selctAlbumCheck" id="selctAlbumCheck" style={{ display: "none" }} onChange={(e: any) => { checkInputHanddler(e, album) }} />
            <div className='singleAlbumDiv' style={{ height: "16rem", width: `16rem`, backgroundColor: "red", borderRadius: 10, overflow: "hidden", position: "relative" }}>
                <img src={album.coverUrl} alt="" style={{ height: "100%", width: "100%" }} onClick={() => { navigate(`/album/${album.name}/${album.id}`) }} />
                <div className='checkIconEffect' style={{ position: "absolute", right: 10, top: 10 }} onClick={checkBoxClick}>
                    <CheckCircleRoundedIcon className='checkCircleRoundedIcon' />
                </div>
            </div>
            <div style={{ marginLeft: 10, marginTop: 5, fontWeight: "bold" }}>{album.name.toUpperCase()}</div>
            {/* <div style={{ marginLeft: 10, fontSize: 12 }}>{album.id}</div> */}
            {/* <div style={{ marginLeft: 10, fontSize: 12 }}>3 items</div> */}
        </div>

    )
}

export default AlbumLoader