import React from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Divider from '@mui/material/Divider';

type Props = {}

function SaySomethingModel({ }: Props) {
    return (
        <div className="saySomethingModelContainer">
            <div className="talk-bubble tri-right btm-right">
                <div className="talktext">
                    <div className='priviousComment'>
                        <span>First Comment</span>
                    </div>
                    <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                    <div style={{ display: "flex", alignItems: "center", width: "100%", marginTop: 15 }}>
                        <input type="text" className='talkText_input' placeholder='Enter Comments' />
                        <span className='sendBtnComment'>
                            <SendRoundedIcon />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaySomethingModel