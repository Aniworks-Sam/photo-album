export const VARIABLES = {
    label: {
        email: "Email",
        password: "Password",
        rememberMe: "Remember me",
    },
    placeholder: {
        email: "Enter your Email",
        password: "Enter your Password",
    },
    pageTitle: {
        login: "Login",
        homePage: "Album Page",
    },
}

export const PROPS = {
    models: {
        permissionModel: {
            delete: {
                albumView: {
                    title: "Delete Album",
                    message: "Are you sure you want to delete this album?",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    actionName: "deleteAlbum",
                    pathName: "albumView",
                },
            },
        },
    },
}

export const STYLES = {
    AlbumView: {
        modelStyle: {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }
    },
    ImageView: {
        modelStyle: {
            position: 'absolute' as 'absolute',
            // top: '50%',
            // left: '50%',
            // transform: 'translate(-50%, -50%)',
            width: "100vw",
            height: "100vh",
            // bgcolor: 'background.paper',
            // border: '2px solid #000',
            // boxShadow: 24,
            // p: 4,
        }
    },
    AlbumPage: {
        modelStyle: {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "50%",
            bgcolor: 'background.paper',
            borderRadius: '5px',
            border: "none",
            boxShadow: 24,
            p: 4,
            outline: 'none',
        }
    }

}
export const DEFAULT_OPTIONS = [
    {
        name: "Brightness",
        property: "brightness",
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: "%",
    },
    {
        name: "Contrast",
        property: "contrast",
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: "%",
    },
    {
        name: "Saturation",
        property: "saturate",
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: "%",
    },
    {
        name: "Hue",
        property: "hue-rotate",
        value: 0,
        range: {
            min: 0,
            max: 360,
        },
        unit: "deg",
    },
    {
        name: "Grayscale",
        property: "grayscale",
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: "%",
    },
    {
        name: "Sepia",
        property: "sepia",
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: "%",
    },
    {
        name: "Blur",
        property: "blur",
        value: 0,
        range: {
            min: 0,
            max: 20,
        },
        unit: "px",
    }
]