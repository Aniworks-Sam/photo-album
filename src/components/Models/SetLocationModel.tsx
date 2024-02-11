import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getLocationsListAPIStore, IGetLocationsListStore, ISetLocationUserStore, locationsListReponceData, setLocationOfUser, setLocationUser } from '../../stores/AlbumStores';
import { IGetLocationListGetDTO } from '../../dto/Location/GetLocationList';

const settingsPromise = import("../../settings").then(
    ({ settings }) => settings
)

type Props = {
    handleCloseSetLocationModel: () => void;
}

function SetLocationModel({ handleCloseSetLocationModel }: Props) {
    const [value, setValue] = React.useState<IGetLocationListGetDTO | null>(null)!;
    const [listLocationR, setListLocationR] = React.useState<IGetLocationListGetDTO[]>([]);

    useEffect(() => {

        const fetchLocationList: any = async (): Promise<void> => {
            settingsPromise.then(async (settings): Promise<IGetLocationsListStore> => {
                const locationList = await getLocationsListAPIStore(settings).GetLocations();
                if (locationList === true) {
                    console.log(locationList);
                    if (locationsListReponceData.length > 0) {
                        setListLocationR(locationsListReponceData);
                    }
                }
                return { GetLocations: async () => locationList };
            })
        }
        fetchLocationList();
    }, [])

    const dataUpload = async () => {
        if (value) {
            const fetchSetLocation: any = async (): Promise<void> => {
                settingsPromise.then(async (settings): Promise<ISetLocationUserStore> => {
                    const setLocation = await setLocationOfUser(settings, value.id).SetLocationID();
                    if (setLocation === true) {
                        console.log(setLocation);
                        if (setLocationUser === true) {
                            localStorage.setItem("isLocationSet", `${setLocationUser}`);
                            handleCancle();
                        } else {
                            alert("Error in setting location! Please try again.")
                        }
                    }
                    return { SetLocationID: async () => setLocation };
                })
            }
            fetchSetLocation();
        }
    }

    const handleCancle = () => {
        setValue(null)
        handleCloseSetLocationModel();
    }
    const defaultProps = {
        options: listLocationR,
        getOptionLabel: (option: IGetLocationListGetDTO) => option.name,
    };


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <h2>Set Location</h2>
                <CloseIcon onClick={handleCancle} style={{ fontSize: 30 }} />
            </div>
            <span style={{ marginBottom: 20 }}>You Haven't Added any Location Yet, To Proceed Add Your location</span>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "100%" }}>
                    <div style={{ display: 'flex', flexDirection: "column" }}>
                        <Autocomplete
                            {...defaultProps}
                            id="disable-close-on-select"
                            disableCloseOnSelect
                            onChange={(event: any, newValue: IGetLocationListGetDTO | null) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="disableCloseOnSelect" variant="standard" />
                            )}
                        />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", marginTop: 35, justifyContent: "flex-end" }}>
                <button className='clickCancleBtn' onClick={handleCancle}>Cancle</button>
                <button className="clickUploadBtn" onClick={dataUpload}>Click To Set</button>
            </div>
        </div >
    )
}

export default SetLocationModel