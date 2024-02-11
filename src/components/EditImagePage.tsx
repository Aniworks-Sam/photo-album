import React from 'react'
import ControlEditBtnBasic from './ControlEditBtnBasic'
// import 'tui-image-editor/dist/tui-image-editor.css';
// import ImageEditor from '@toast-ui/react-image-editor';
import { DEFAULT_OPTIONS } from "../bo/Variables";
import ControlEditSlider from './ControlEditSlider';
import { saveAs } from 'file-saver';

type Props = {
    editImageCloseModel: () => void,
    selectedImageInfo: any,
    currentIndex: number,
}

function EditImagePage({ editImageCloseModel, selectedImageInfo, currentIndex }: Props) {
    const [options, setOptions] = React.useState(DEFAULT_OPTIONS);
    const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(0);
    const canvasRef = React.useRef<any>(null)!;
    const imageRef = React.useRef<any>(null)!;
    const linkRef = React.useRef<any>(null)!;
    const selectedOption = options[selectedOptionIndex];

    const handleSliderChange = ({ target }: any) => {
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if (index !== selectedOptionIndex) return option;

                return { ...option, value: target.value };

            })
        });
    }

    function getImageStyle() {
        const filter = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        return { filter: filter.join(' ') }
    }
    function downloadImg() {
        var canvas = document.getElementById("canvas") as HTMLCanvasElement;
        var ctx = canvas.getContext("2d")!;
        ctx.filter = "blur(5px)";
        var img = document.getElementById("dataImage") as HTMLImageElement;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const blob = canvas.toBlob(function (blob: any) {
            saveAs(blob, "blur.png");
        });
        // saveAs(blob, selectedImageInfo.imageData[currentIndex].name);

    }


    return (
        <div className='editImagePageMainCont'>
            <div className="editImagePageHeader">
                <h1 style={{ color: "#fff", margin: 0 }}>Edit</h1>
                <div className="editImageControlMenu">
                    <div className='btnSaveCancle' onClick={editImageCloseModel}>Cancel</div>
                    <a ref={linkRef} onClick={downloadImg}><div className='btnSaveCancle'>Save</div></a>
                </div>
            </div>
            <div className='editPageImageContainer'>
                <img crossOrigin='anonymous' ref={imageRef} src={selectedImageInfo.imageData[currentIndex].url} alt="" id="dataImage" style={getImageStyle()} />
                <canvas ref={canvasRef} id="canvas" style={{ display: "none" }}></canvas>
            </div>
            <div className='editPageBtnControlCenter'>
                {options.map((option, index) => (
                    <ControlEditBtnBasic
                        key={index}
                        name={option.name}
                        active={selectedOptionIndex === index}
                        handleClick={() => {
                            setSelectedOptionIndex(index);
                        }}
                    />
                ))}
            </div>
            <div className='slideControlUnit'>
                <ControlEditSlider
                    min={selectedOption.range.min}
                    max={selectedOption.range.max}
                    value={selectedOption.value}
                    handleChange={handleSliderChange}
                />
            </div>
        </div>
    )
}

export default EditImagePage