import React from 'react'

export default function Card(props) {
    return (
        <div className="container">
            <div className="card_box">
                <span className='status' data-live-text={props.status}></span>
                <h1 className="text-center my-5">
                    {props.name}
                </h1>
                <b className='text-center d-block'>Team numbers :- <span style={{"fontWeight":"400"}}>{props.number}</span></b>
                <b className='text-center d-block'>Mode :- <span style={{"fontWeight":"400"}}>{props.mode} mode</span>  </b>
            </div>
        </div>
    )
}
