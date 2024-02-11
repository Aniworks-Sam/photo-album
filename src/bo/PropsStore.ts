export type ImageViewPage_Props = {
    image: any,
    id: any,
    albumName: any,
    imageData: any,
    imageIndex: number,
    trackBtn: number,
    setTrackBtn: (trackBtn: number) => void,
}

export type LargeImageControl_Props = {
    selectedImageInfo: any,
    handleClose: () => void,
    handleDrawerOpen: () => void
    currentIndex: number
    setCurrentIndex: (index: number) => void
    trackBtn: number,
    setTrackBtn: (trackBtn: number) => void
}