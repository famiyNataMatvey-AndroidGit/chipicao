import React from 'react';
import s from "../Sketchbook/Sketchbook.module.css";

const Sketchbook = (props) => {
    return (
        <div className={s.sketchbook}>
            <img src={props.front_cover} width='250px'/>
            <br/>{props.name} ({props.total_stickers})
            <br/>*****
        </div>
    )
}

export default Sketchbook