import { ICreateNewAlbumDTO } from './../dto/GetAlbum/createAlbum';
import { IGetLocationListGetDTO } from './../dto/Location/GetLocationList';
import { IUpAlbumSignedURLGetDTO } from './../dto/UploadImage/GetSignedURL';
import { IGetAlbumFileDTO } from './../dto/GetAlbum/getAlbumFiles';
import { IGetAlbumsDTO } from "../dto/GetAlbum/getAlbums";

import { HttpMethod, IEndpoint } from "./Endpoint";

export type CreateNewAlbum = IEndpoint<"data/album", {}, HttpMethod.POST, {}, ICreateNewAlbumDTO>;
export type GetAlbumsDetails = IEndpoint<"data/getalbums", {}, HttpMethod.POST, {}, Array<IGetAlbumsDTO>>;
export type CheckLocationSet = IEndpoint<"mail/islocationset", {}, HttpMethod.POST, {}, boolean>;
export type GetAlbumFiles = IEndpoint<"data/getalbumfiles", {}, HttpMethod.POST, {}, Array<IGetAlbumFileDTO>>;
export type UploadGetAlbumSignedURL = IEndpoint<"data/getalbumsignedurl", {}, HttpMethod.POST, {}, IUpAlbumSignedURLGetDTO>;
export type RemoveImageFileFromAlbum = IEndpoint<"data/removefiles", {}, HttpMethod.POST, {}, boolean>;
export type SetAlbumCoverImage = IEndpoint<"data/setalbumcover", {}, HttpMethod.POST, {}, boolean>;
export type DeleteAlbum = IEndpoint<"data/deletealbum", {}, HttpMethod.POST, {}, boolean>;
export type GetLocationsList = IEndpoint<"mail/getlocations", {}, HttpMethod.POST, {}, Array<IGetLocationListGetDTO>>
export type SetLocationUser = IEndpoint<"mail/setlocation", {}, HttpMethod.POST, {}, boolean>;
export type UploadImageInSignedURL = IEndpoint<"", {}, HttpMethod.PUT, {}, {}>;
export type ViewSelectedImage = IEndpoint<"", {}, HttpMethod.GET, void, "">;