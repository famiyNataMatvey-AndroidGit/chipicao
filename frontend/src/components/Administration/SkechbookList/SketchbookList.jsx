import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import Sketchbook from "./Sketchbook/Sketchbook";

const SketchbookList = (props) => {
    return (
        <div role="tabpanel">
            <List dense>
                <Sketchbook selectedTab={props.selectedTab} sketchbookId frontCover name/>
            </List>
        </div>
    )
}

const mapStateToProps = (state) => ({})

export default compose(withAuthRedirect,
    connect(mapStateToProps, {getSketchbook})
)(SketchbookList)