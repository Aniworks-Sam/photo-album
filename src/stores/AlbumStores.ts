import { ICreateNewAlbumDTO } from './../dto/GetAlbum/createAlbum';
import { IUpAlbumSignedURLGetDTO } from './../dto/UploadImage/GetSignedURL';
import { IGetAlbumFileDTO } from './../dto/GetAlbum/getAlbumFiles';
import { IGetAlbumsDTO } from './../dto/GetAlbum/getAlbums';
import {
    GetAlbumsDetails,
    CheckLocationSet,
    GetAlbumFiles,
    UploadGetAlbumSignedURL,
    RemoveImageFileFromAlbum,
    SetAlbumCoverImage,
    DeleteAlbum,
    GetLocationsList,
    SetLocationUser,
    CreateNewAlbum,
    UploadImageInSignedURL,
    ViewSelectedImage,
} from './../services/Services';
import { consumer, consumerTreditional } from '../services/Consumer';
import { HttpMethod } from '../services/Endpoint';
import { ISettings } from '../settings';
import { authHeader, uploadCoresHeader } from '../services/AuthHeader';
import { IGetLocationListGetDTO } from '../dto/Location/GetLocationList';

export let createNewAlbum: ICreateNewAlbumDTO | string;
export let albumReponceData: Array<IGetAlbumsDTO>;
export let isLocationSetUser: boolean;
export let albumFilesReponceData: Array<IGetAlbumFileDTO>;
export let albumSignedURLReponceData: IUpAlbumSignedURLGetDTO;
export let isRemoveImageFileFromAlbum: boolean;
export let setAlbumCoverImageManual: boolean;
export let isDeleteAlbum: boolean;
export let locationsListReponceData: Array<IGetLocationListGetDTO>;
export let setLocationUser: boolean;
export let binaryImageData: any;

export interface ICreateAlbumStore {
    CreateAlbum: () => Promise<boolean>;
}
export interface IAlbumStores {
    GetAlbums: () => Promise<boolean>;
}
export interface ICheckIsLocationSet {
    CheckIsLocationSet: () => Promise<boolean>;
}
export interface IGetSingleAlbumFilesStore {
    GetSingleAlbumFiles: () => Promise<boolean>;
}
export interface IUploadGetAlbumSignedURLStore {
    UploadGetAlbumSignedURL: () => Promise<boolean>;
}
export interface IUploadImageInSignedURLStore {
    UploadImageInSignedURL: () => Promise<boolean>;
}
export interface IRemoveImageFromAlbumStore {
    RemoveImageFromAlbum: () => Promise<boolean>;
}
export interface ISetAlbumCoverImageStore {
    SetAlbumCoverImage: () => Promise<boolean>;
}
export interface IDeleteAlbumStore {
    DeleteAlbum: () => Promise<boolean>;
}
export interface IGetLocationsListStore {
    GetLocations: () => Promise<boolean>;
}
export interface ISetLocationUserStore {
    SetLocationID: () => Promise<boolean>;
}
export interface IViewLargeImageStore {
    ViewLargeImage: () => Promise<boolean>;
}

//!====================================***=================================

export const createAlbumAPIStore = (
    { baseUrl }: ISettings,
    albumName: any
): ICreateAlbumStore => {
    const createNewAlbumInit = consumer<CreateNewAlbum>(baseUrl)(
        'data/album',
        HttpMethod.POST
    );
    let createNewAlbumInstance = createNewAlbumInit(
        `name=${albumName}`,
        {},
        authHeader
    ).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        createNewAlbum = response;
        return Promise.resolve(true);
    });
    return {
        CreateAlbum: () => createNewAlbumInstance,
    };
};

export const getAlbumAPIStore = ({ baseUrl }: ISettings): IAlbumStores => {
    const getAlbumInit = consumer<GetAlbumsDetails>(baseUrl)(
        'data/getalbums',
        HttpMethod.POST
    );
    let newAlbumsInstance = getAlbumInit({}, {}, authHeader).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        albumReponceData = response;
        return Promise.resolve(true);
    });
    return {
        GetAlbums: () => newAlbumsInstance,
    };
};

export const checkIsLocationSetAPIStore = ({
    baseUrl,
}: ISettings): ICheckIsLocationSet => {
    const checkIsLocationSetInit = consumer<CheckLocationSet>(baseUrl)(
        'mail/islocationset',
        HttpMethod.POST
    );
    let isLocationSetUserInstance = checkIsLocationSetInit(
        {},
        {},
        authHeader
    ).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        isLocationSetUser = response;
        return Promise.resolve(true);
    });
    return {
        CheckIsLocationSet: () => isLocationSetUserInstance,
    };
};

export const getAlbumFilesAPIStore = (
    { baseUrl }: ISettings,
    albumName: any
): IGetSingleAlbumFilesStore => {
    const getAlbumFilesInit = consumer<GetAlbumFiles>(baseUrl)(
        'data/getalbumfiles',
        HttpMethod.POST
    );
    let getAlbumFilesInstance = getAlbumFilesInit(
        `key=${albumName}`,
        {},
        authHeader
    ).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        albumFilesReponceData = response;
        return Promise.resolve(true);
    });
    return {
        GetSingleAlbumFiles: () => getAlbumFilesInstance,
    };
};

export const uploadGetAlbumSignedURLAPIStore = (
    { baseUrl }: ISettings,
    albumName: any,
    fileName: any
): IUploadGetAlbumSignedURLStore => {
    const uploadGetAlbumSignedURLInit = consumer<UploadGetAlbumSignedURL>(
        baseUrl
    )('data/getalbumsignedurl', HttpMethod.POST);
    let uploadGetAlbumSignedURLInstance = uploadGetAlbumSignedURLInit(
        `key=${albumName}/${fileName}`,
        {},
        authHeader
    ).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        albumSignedURLReponceData = response;
        return Promise.resolve(true);
    });
    return {
        UploadGetAlbumSignedURL: () => uploadGetAlbumSignedURLInstance,
    };
};


// export const uploadImageInSignedURLAPIStore = (url: string, file: any): IUploadImageInSignedURLStore => {
//     const uploadImageInSignedURLInit = consumer<UploadImageInSignedURL>(url)("", HttpMethod.PUT);
//     let uploadImageInSignedURLInstance = uploadImageInSignedURLInit({}, file, uploadCoresHeader).then((response) => {
//         console.log("Files:: ", JSON.stringify(file), file)
//         if (response === undefined) {
//             return Promise.reject(false);
//         }
//         return Promise.resolve(true);
//     });
//     return {
//         UploadImageInSignedURL: () => uploadImageInSignedURLInstance
//     }

// }

export const uploadImageInSignedURLAPIStore = (url: string, file: any): IUploadImageInSignedURLStore => {
    const uploadImageInSignedURLInit = consumerTreditional<UploadImageInSignedURL>(url)("", HttpMethod.PUT);
    let uploadImageInSignedURLInstance = uploadImageInSignedURLInit({}, file, uploadCoresHeader).then((response) => {
        console.log("Files:: ", JSON.stringify(file), file)
        if (response === undefined) {
            return Promise.reject(false);
        }
        return Promise.resolve(true);
    });
    return {
        UploadImageInSignedURL: () => uploadImageInSignedURLInstance
    }

}

export const removeImagesFromAlbumAPIStore = (
    { baseUrl }: ISettings,
    albumName: any,
    imageName: any
): IRemoveImageFromAlbumStore => {
    const removeImageFromAlbumInit = consumer<RemoveImageFileFromAlbum>(baseUrl)(
        'data/removefiles',
        HttpMethod.POST
    );
    let removeImageFromAlbumInstance = removeImageFromAlbumInit(
        {},
        { files: [`${albumName}/${imageName}`] },
        authHeader
    ).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        isRemoveImageFileFromAlbum = response;
        return Promise.resolve(true);
    });
    return {
        RemoveImageFromAlbum: () => removeImageFromAlbumInstance,
    };
};

export const setAlbumCoverImageAPIStore = (
    { baseUrl }: ISettings,
    albumName: any,
    imageName: any
): ISetAlbumCoverImageStore => {
    const setAlbumCoverImageInit = consumer<SetAlbumCoverImage>(baseUrl)(
        'data/setalbumcover',
        HttpMethod.POST
    );
    let setAlbumCoverImageInstance = setAlbumCoverImageInit(
        {},
        { name: albumName, image: imageName },
        authHeader
    ).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        setAlbumCoverImageManual = response;
        return Promise.resolve(true);
    });
    return {
        SetAlbumCoverImage: () => setAlbumCoverImageInstance,
    };
};

export const deleteAlbumAPIStore = (
    { baseUrl }: ISettings,
    albumName: any
): IDeleteAlbumStore => {
    const deleteAlbumInit = consumer<DeleteAlbum>(baseUrl)(
        'data/deletealbum',
        HttpMethod.POST
    );
    let deleteAlbumInstance = deleteAlbumInit(
        `name=${albumName}`,
        {},
        authHeader
    ).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        isDeleteAlbum = response;
        return Promise.resolve(true);
    });
    return {
        DeleteAlbum: () => deleteAlbumInstance,
    };
};

export const getLocationsListAPIStore = ({
    baseUrl,
}: ISettings): IGetLocationsListStore => {
    const getLocationsListInit = consumer<GetLocationsList>(baseUrl)(
        'mail/getlocations',
        HttpMethod.POST
    );
    let getLocationsListInstance = getLocationsListInit({}, {}, authHeader).then(
        (response) => {
            if (response === undefined) {
                return Promise.reject(false);
            }
            locationsListReponceData = response;
            return Promise.resolve(true);
        }
    );
    return {
        GetLocations: () => getLocationsListInstance,
    };
};

export const setLocationOfUser = (
    { baseUrl }: ISettings,
    locId: number
): ISetLocationUserStore => {
    const setLocationOfUserInit = consumer<SetLocationUser>(baseUrl)(
        'mail/setlocation',
        HttpMethod.POST
    );
    let setLocationOfUserInstance = setLocationOfUserInit(
        `id=${locId}`,
        {},
        authHeader
    ).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        setLocationUser = response;
        return Promise.resolve(true);
    });
    return {
        SetLocationID: () => setLocationOfUserInstance,
    };
};

export const viewSelectedLargeImageAPIStore = (url: string): IViewLargeImageStore => {
    const viewSelectedLargeImageInit = consumerTreditional<ViewSelectedImage>(url)("", HttpMethod.GET);
    let viewSelectedLargeImageInstance = viewSelectedLargeImageInit({}).then((response) => {
        if (response === undefined) {
            return Promise.reject(false);
        }
        binaryImageData = response;
        return Promise.resolve(true);
    }
    );
    return {
        ViewLargeImage: () => viewSelectedLargeImageInstance
    }
}