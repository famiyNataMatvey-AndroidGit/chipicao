import React from 'react';
import s from './Preloader.module.css';
import preloadPhoto from "../../assets/images/preload.png";
import scoobyDooPhoto from "../../assets/images/scoobyDoo.png";

const Preloader = (props) => {
    return (
        <div className={s.preload}>
            <div>
                <img className={s.img_scooby_doo} src={scoobyDooPhoto}/>
            </div>
            <div>
                <img className={s.img_preload} src={preloadPhoto}/>
            </div>
        </div>
    )
}

export default Preloader;