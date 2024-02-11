export interface IGetAlbumFileDTO {
    url: string,
    name: string,
    modifiedDate: string,
    size: number,
    id: string,
    comments: string | null,
    emojis: string | null
}