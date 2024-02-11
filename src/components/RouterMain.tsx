import React, { SetStateAction, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AlbumPage from '../pages/AlbumPage'
import AlbumView from '../pages/AlbumView'
import ImageLargeView from '../pages/ImageLargeView'
import LoginPage from '../pages/LoginPage'
import PageNotFound from '../pages/PageNotFound'
import NavBar from './NavBar'

type Props = {
    setTheme: React.Dispatch<SetStateAction<string>>,
    theme: string
}

const RouterMain = ({ setTheme, theme }: Props) => {
    const [isLoginPage, setIsLoginPage] = React.useState<SetStateAction<boolean>>(false)


    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: "column" }}>
                <div style={{ display: isLoginPage ? "none" : "block" }}>
                    <NavBar setThame={setTheme} theme={theme} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 80 }}>
                    {/* <div style={{ display: isLoginPage ? "none" : "block" }}>
                        <SideNav handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} open={open} setOpen={setOpen} />
                    </div> */}
                    <div style={{ marginLeft: 10, width: isLoginPage ? "100vw" : "calc(100vw)" }}>
                        <Routes>
                            <Route path='/login' element={<LoginPage setIsLoginPage={setIsLoginPage} />} />
                            {/* <Route path="/" element={<HomePage />} /> */}
                            <Route path='/' element={<AlbumPage />} />
                            <Route path='/album/:albumName/:id' element={<AlbumView />} />
                            {/* <Route path="/album/:albumName/:id/image/:imageId" element={<ImageLargeView />} /> */}
                            <Route path='*' element={<PageNotFound />} />
                            {/* {/* <Route path="/setlocation" element={<SetLocation />} /> */}
                            {/* <Route path="/upload" element={<UploadImagePage />} /> */}
                        </Routes>
                    </div>
                </div>
                {/* <div style={{ position: "absolute", height: "100vh", width: "100vw", display: uploadModalVisiblity ? "block" : "none" }} onClick={mainClickHadler}></div> */}
            </div>
            {/* <Routes>
                <Route path="/uploadaLbum" element={<AddAlbumPage />} />
            </Routes> */}
            {/* <Routes>
                <Route path="/createalbum" element={<CreateAlbumPage />} />
            </Routes> */}
        </BrowserRouter>
    )
}
export default RouterMain