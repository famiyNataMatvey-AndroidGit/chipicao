import React from 'react';
import Sketchbook from "../Sketchbook/Sketchbook";
import s from "../Home/Home.module.css";

const tests = [40, 50, 60, 70, 40, 50, 60, 70]

const Home = (props) => {
    return (
        <div>
            <div>
                <button>Back</button>
                <img src='https://onetwo.tv/storage/images/avatars/original/0/0/20/48/e60su30gggoc.jpg'/>
                <a href='/'>Stop</a>
                <button>Next</button>
            </div>
            <hr size='3px' width='500px' align='left'/>
            <div className={s.content}>
                {
                    tests.map(test => <Sketchbook
                        name='Шамман кинг'
                        total_stickers={test}
                        front_cover='https://evro-keramika.ru/wa-data/public/shop/products/61/54/5461/images/28365/28365.750x0.jpg'/>)
                }
            </div>
        </div>
    )
}

export default Home;