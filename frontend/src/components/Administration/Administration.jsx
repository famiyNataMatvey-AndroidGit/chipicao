import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import React, {useState} from "react";
import Tab from "@material-ui/core/Tab";
import SketchbookList from "./SkechbookList/SketchbookList";
import Button from "@material-ui/core/Button";


const CREATED_TAB = 'Созданые Альбомы'
const ACTIVATED_TAB = 'Активированные Альбомы'
const DEACTIVATED_TAB = 'Деактивированные Альбомы'

const Administration = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Button hidden={value !== 0} variant="contained" color="primary" href="">
                Создать Sketchbook
            </Button>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label={CREATED_TAB}/>
                    <Tab label={ACTIVATED_TAB}/>
                    <Tab label={DEACTIVATED_TAB}/>
                </Tabs>
            </AppBar>
            <div>
                <SketchbookList selectedTab={value}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({})

export default compose(withAuthRedirect,
    connect(mapStateToProps, {})
)(Administration)