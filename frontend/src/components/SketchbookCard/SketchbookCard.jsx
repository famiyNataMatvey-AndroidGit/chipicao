import React, {useState} from 'react';
import styles from "./SketchbookCard.module.css";
import Button from "@material-ui/core/Button";
import {Image} from "@material-ui/icons";

const SketchbookCard = ({sketchbook, isPurchased}) => {
    let [currentPage, setCurrentPage] = useState(sketchbook.pages[0]);

    return (
        <div>
            {/*{!isPurchased && <Button variant="contained" color="primary" href="">Купить альбом</Button>}*/}
            {/*<div>*/}
            {/*    <div>*/}
            {/*        <div>*/}
            {/*            <h1>{sketchbook.name} ({sketchbook.stickerCount})</h1>*/}
            {/*            <p>*/}
            {/*                {sketchbook.description}*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <Image src={sketchbook.frontCover}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <hr size='3px' width='500px' align='left'/>*/}
            {/*    <div>*/}
            {/*        <img src={currentPage.image} alt={'Page number ' + currentPage.number_of_page}/>*/}
            {/*        <div>*/}
            {/*            sketchbook.pages.map(page => {*/}
            {/*                <span*/}
            {/*                    className={currentPage.id === page.id ? styles.selectedPage : styles.pageNumber}*/}
            {/*                    key={page.id}*/}
            {/*                    onClick={e => {setCurrentPage(page)}}*/}
            {/*                >page.number_of_page</span>*/}
            {/*            })*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default SketchbookCard