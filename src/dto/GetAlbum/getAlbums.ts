export interface IGetAlbumsDTO {
    id: string,
    userId: string,
    name: string,
    description: string | null,
    coverUrl: string,
    url: string | null
}