import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { EmojiPicker, EmojiObject, EmojiPickerRef, unifiedToNative } from 'react-twemoji-picker';
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import "react-twemoji-picker/dist/EmojiPicker.css"
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import noActImg from "../assets/Image/noActivity.svg"

const drawerWidth = 350;
type Props = {
    open: boolean,
    handleDrawerClose: () => void,
    imageData: any,

}
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));



function CommentDrawer({ open, handleDrawerClose, imageData }: Props) {
    const theme = useTheme();
    const [emojiSelected, setEmojiSelected] = React.useState<any>([]);
    const [comment, setComment] = React.useState<any>([]);
    const [emojiOpen, setEmojiOpen] = React.useState(false);
    const [emojiDetailsOpen, setEmojiDetailsOpen] = React.useState(false);
    const ref = React.useRef<EmojiPickerRef>(null)

    React.useEffect(() => {
        setEmojiSelected([imageData.imageDet.emojis]);
    }, [imageData])

    const handleEmojiOpen = () => setEmojiOpen(!emojiOpen);

    const emojiData = Object.freeze(EmojiData);

    const handleEmojiSelect = (emoji: EmojiObject) => {
        const nativeEmoji = unifiedToNative(emoji.unicode);
        setEmojiSelected([...emojiSelected, nativeEmoji]);
        console.log(emoji, nativeEmoji);
    };
    console.log("ImageData:: ", imageData, emojiSelected)

    const handleSearch = (query: string) => ref.current?.search(query);

    return (
        <>
            <Box sx={{ display: "flex", zIndex: 99999 }}>
                <CssBaseline />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                        <Typography variant="h6" noWrap style={{ marginLeft: 10, fontSize: 15 }}>Activity</Typography>
                    </DrawerHeader>
                    {/* <Divider /> */}

                    <div className="commentEmojiVis" >
                        <div className="emojiSelected">
                            {emojiSelected.length <= 4 ? (
                                emojiSelected.map((emoji: any, index: any) => {
                                    return <span key={index}>{emoji}</span>
                                })
                            ) : (
                                <>
                                    <div>
                                        {emojiSelected.slice(0, 4).map((emoji: any) => {
                                            return <span key={Math.random()}>{emoji}</span>

                                        })}
                                        <span style={{ marginLeft: 5, fontWeight: "bold" }}>{`${emojiSelected.length - 4} More`}</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div style={{ display: emojiSelected.length > 0 ? "block" : "none" }}>
                            <div className="goBtn" style={{ display: emojiDetailsOpen ? "none" : "block" }} onClick={() => { setEmojiDetailsOpen(true) }} >
                                <ChevronRightIcon />
                            </div>
                            <div className="goBtn" style={{ display: emojiDetailsOpen ? "block" : "none" }} onClick={() => { setEmojiDetailsOpen(false) }}>
                                <ChevronLeftIcon />
                            </div>
                        </div>
                    </div>

                    <div className="emojiUserImg" style={{ display: emojiDetailsOpen ? "block" : "none" }}>
                        {emojiSelected.map((emoji: any) => {
                            return <div className='emojiUserSingle'>
                                <div className="emojiVis">{emoji}</div>
                                <div className="emojiDeti">
                                    <div className="emojiUserName">User60</div>
                                    <div className="emojiUserDesc">11212223223</div>
                                </div>
                            </div>
                        })}
                    </div>

                    <div className="commentEmojiVeix" style={{ display: emojiDetailsOpen ? "none" : "block" }}>
                        <div className='noActivity' style={{ display: "none" }}>
                            <img src={noActImg} alt="" />
                            <h4>No Activity</h4>
                            <h5>Be the First to Comment</h5>
                        </div>
                        <div className="listGroup">
                            <div className="listGroupItem">
                                <div className="userImage">U</div>
                                <div className="userDetails">
                                    <div className="textUserName">User60</div>
                                    <div className="textTimeDesc">11212223223</div>
                                </div>
                            </div>
                        </div>
                        <div className="bottomCMT">
                            <div className='emojiBtn'>
                                <div className='emojiContBtn' onClick={handleEmojiOpen}>
                                    <>
                                        <EmojiEmotionsRoundedIcon style={{ color: "#fff", fontSize: 40 }} />
                                    </>
                                </div>
                                <div className="emojiBtnCont" style={{ display: emojiOpen ? "block" : "none" }}>
                                    <div className='emojiContSet'>
                                        <div className='emojiContEX'>
                                            <EmojiPicker emojiData={emojiData} ref={ref} onEmojiSelect={handleEmojiSelect} emojisPerRow={6} numberScrollRows={7} />
                                            <input onChange={event => handleSearch(event.target.value)} placeholder="search"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="commentText">
                                <input type="text" placeholder='Say Something' />
                            </div>
                            <div className="sendBtn">
                                <SendRoundedIcon style={{ color: "#fff", fontSize: 30, paddingLeft: 4 }} />
                            </div>
                        </div>
                    </div>
                </Drawer>
            </Box>
        </>
    )
}

export default CommentDrawer