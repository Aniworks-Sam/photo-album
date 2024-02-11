export interface ICreateNewAlbumDTO {
    id: string,
    userId: string,
    name: string,
    description: string | null,
    coverUrl: string,
    url: string | null
}