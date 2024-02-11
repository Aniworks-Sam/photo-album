import React from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentDrawer from './CommentDrawer';

type Props = {
    selectedImageInfo: any,
    currentIndex: number,
    imageData: any
}

function LikeCommentEmoji({ selectedImageInfo, currentIndex, imageData }: Props) {
    const [heartLike, setHeartLike] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        console.log(selectedImageInfo, currentIndex);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="likeBtn" onClick={() => { setHeartLike(!heartLike) }}>
                {heartLike ?
                    <FavoriteRoundedIcon style={{ color: "#fff", fontSize: 30 }} /> :
                    <FavoriteBorderRoundedIcon style={{ color: "#fff", fontSize: 30 }} />
                }
            </div>
            <div className="comment" onClick={handleDrawerOpen}>
                <ChatBubbleOutlineRoundedIcon style={{ color: "#fff", fontSize: 30, marginRight: 10 }} />
                <h4>Say something</h4>
            </div>
            <div style={{ position: "absolute" }}>
                <CommentDrawer open={open} handleDrawerClose={handleDrawerClose} imageData={imageData} />
            </div>
        </>
    )
}

export default LikeCommentEmoji