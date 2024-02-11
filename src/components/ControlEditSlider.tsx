import React from 'react'

type Props = {
    min: number,
    max: number,
    value: number,
    handleChange: (e: any) => void,
}

function ControlEditSlider({ min, max, value, handleChange }: Props) {
    return (
        <>
            <input type="range" className='slider' min={min} max={max} value={value} onChange={handleChange} />
        </>
    )
}

export default ControlEditSlider