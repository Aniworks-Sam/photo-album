import React from 'react';
import * as IconBS from 'react-icons/bs';
import * as IconMD from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
/*
    Dark Sum Logo : MdWbSunny
*/
type Props = {
    setThame: React.Dispatch<React.SetStateAction<string>>;
    theme: string;
};

function NavBar({
    setThame,
    theme,
}: Props) {
    // const navigate = useNavigate();
    // const [image, setImage] = React.useState<string>('');
    // const [imageUploadModle, setImageUploadModle] =
    //     React.useState<boolean>(false);
    return (
        <div className="navBarMain">
            <div
                className="logo"
                style={{ display: 'flex', alignItems: 'center', marginRight: '5rem' }}
            >
                <img
                    src={
                        theme === 'light'
                            ? require('../assets/Image/logo/FullName_Black.png')
                            : require('../assets/Image/logo/FullName_White.png')
                    }
                    alt="logo"
                    style={{ height: '1.5rem', width: '10rem' }}
                />
                <p className="photosLogoTxt">Albums</p>
            </div>
            <div
                className="center-search-up-all"
                style={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div className="search" style={{ flex: '0 1 50vw' }}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="navInputSearchBar"
                    />
                </div>
            </div>
            <div className="userAccount">
                <IconMD.MdOutlineDarkMode
                    color={theme === 'light' ? '#000' : '#fff'}
                    size={25}
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                        theme === 'light' ? setThame('dark') : setThame('light');
                    }}
                />
                <IconBS.BsGrid3X3Gap
                    color={theme === 'light' ? '#000' : '#fff'}
                    size={25}
                    style={{ marginLeft: 10 }}
                />
                <div
                    style={{
                        backgroundColor: 'red',
                        height: 40,
                        width: 40,
                        borderRadius: '50%',
                        marginLeft: 10,
                    }}
                ></div>
            </div>
        </div>
    );
}

export default NavBar;
