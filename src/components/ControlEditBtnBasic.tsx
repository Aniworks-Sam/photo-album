import React from 'react'


type Props = {
    name: string,
    active: boolean,
    handleClick: () => void,
}

function ControlEditBtnBasic({ name, active, handleClick }: Props) {

    return (
        <>
            <button className={`editBtn ${active ? "active" : ""}`} onClick={handleClick}>{name}</button>
        </>
    )
}

export default ControlEditBtnBasic