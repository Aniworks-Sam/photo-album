import React from 'react'
import { useParams } from 'react-router-dom'

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
// import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
// import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
// import CameraRoundedIcon from '@mui/icons-material/CameraRounded';

// import ImageJsonData from "../bo/imageFile.json"
// import EXIF from 'exif-js';


const drawerWidth = 350;

type Props = {
    open: boolean,
    handleDrawerOpen: () => void,
    handleDrawerClose: () => void,
    imageData: any
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));


function DrawerImageDetails({ open, handleDrawerClose, imageData }: Props) {
    const theme = useTheme();
    // const { imageId } = useParams();
    return (
        imageData.allMetaData ? (
            <Box sx={{ display: 'flex', zIndex: 99999 }}>
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
                        <Typography variant="h6" noWrap style={{ marginLeft: 10, fontSize: 15 }}>{imageData.fileName.name}</Typography>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {imageData.allMetaData.Camera ? (
                                <div style={{ display: "flex", margin: "0 10px", alignItems: "center", padding: 10, color: "#6f7070" }}>
                                    <span style={{ fontWeight: "bold", marginRight: 10 }}>Camera</span>
                                    <span style={{ fontWeight: "bold", color: "#000", fontSize: 14 }}>{imageData.allMetaData.Camera}</span>
                                </div>
                            ) : null}
                            {imageData.allMetaData.GPSLatitude && imageData.allMetaData.GPSLongitude ? (
                                <div style={{ display: "flex", margin: "0 10px", alignItems: "center", padding: 10, color: "#6f7070" }}>
                                    <span style={{ fontWeight: "bold", marginRight: 10 }}>Location</span>
                                    <span style={{ fontWeight: "bold", color: "#000", fontSize: 14 }}>{`${imageData.allMetaData.GPSLatitude}° ${imageData.allMetaData.GPSLatitudeRef} , ${imageData.allMetaData.GPSLongitude}° ${imageData.allMetaData.GPSLongitudeRef}`}</span>
                                </div>
                            ) : null}
                            {imageData.allMetaData.DateTimeOriginal ? (
                                <div style={{ display: "flex", margin: "0 10px", alignItems: "center", padding: 10, color: "#6f7070" }}>
                                    <span style={{ fontWeight: "bold", marginRight: 10 }}>Date & Time</span>
                                    <span style={{ fontWeight: "bold", color: "#000", fontSize: 14 }}>{imageData.allMetaData.DateTimeOriginal}</span>
                                </div>
                            ) : null}
                            {imageData.allMetaData.Make ? (
                                <div style={{ display: "flex", margin: "0 10px", alignItems: "center", padding: 10, color: "#6f7070" }}>
                                    <span style={{ fontWeight: "bold", marginRight: 10 }}>Make</span>
                                    <span style={{ fontWeight: "bold", color: "#000", fontSize: 14 }}>{imageData.allMetaData.Make}</span>
                                </div>
                            ) : null}
                            {imageData.allMetaData.Model ? (
                                <div style={{ display: "flex", margin: "0 10px", alignItems: "center", padding: 10, color: "#6f7070" }}>
                                    <span style={{ fontWeight: "bold", marginRight: 10 }}>Model</span>
                                    <span style={{ fontWeight: "bold", color: "#000", fontSize: 14 }}>{imageData.allMetaData.Model}</span>
                                </div>
                            ) : null}
                            {imageData.allMetaData.ImageHeight && imageData.allMetaData.ImageWidth ? (
                                <div style={{ display: "flex", margin: "0 10px", alignItems: "center", padding: 10, color: "#6f7070" }}>
                                    <span style={{ fontWeight: "bold", marginRight: 10 }}>Dimention</span>
                                    <span style={{ fontWeight: "bold", color: "#000", fontSize: 14 }}>{`${imageData.allMetaData.ImageHeight} x ${imageData.allMetaData.ImageWidth}`}</span>
                                </div>
                            ) : null}
                            {imageData.allMetaData.MaxApertureValue ? (
                                <div style={{ display: "flex", margin: "0 10px", alignItems: "center", padding: 10, color: "#6f7070" }}>
                                    <span style={{ fontWeight: "bold", marginRight: 10 }}>Aperture</span>
                                    <span style={{ fontWeight: "bold", color: "#000", fontSize: 14 }}>{`1/${imageData.allMetaData.MaxApertureValue}`}</span>
                                </div>
                            ) : null}
                            {imageData.allMetaData.ExposureTime ? (
                                <div style={{ display: "flex", margin: "0 10px", alignItems: "center", padding: 10, color: "#6f7070" }}>
                                    <span style={{ fontWeight: "bold", marginRight: 10 }}>Exposure</span>
                                    <span style={{ fontWeight: "bold", color: "#000", fontSize: 14 }}>{`${imageData.allMetaData.ExposureTime.numerator} / ${imageData.allMetaData.ExposureTime.denominator}`}</span>
                                </div>
                            ) : null}
                            {imageData.allMetaData.ISOSpeedRatings ? (
                                <div style={{ display: "flex", margin: "0 10px", alignItems: "center", padding: 10, color: "#6f7070" }}>
                                    <span style={{ fontWeight: "bold", marginRight: 10 }}>ISO</span>
                                    <span style={{ fontWeight: "bold", color: "#000", fontSize: 14 }}>{imageData.allMetaData.ISOSpeedRatings}</span>
                                </div>
                            ) : null}
                        </div>
                    </List>
                </Drawer>
            </Box>
        ) : null
    )
}

export default DrawerImageDetails