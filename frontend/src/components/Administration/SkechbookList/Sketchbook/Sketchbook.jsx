import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Sketchbook = (props) => {
    const {selectedTab, sketchbookId, frontCover, name, ...other} = props
    return (
        <ListItem key={sketchbookId} alignItems="flex-start" button>
            <ListItemAvatar>
                <Avatar src={frontCover}/>
            </ListItemAvatar>
            <ListItemText primary={`Sketchbook item ${sketchbookId}`}>
                {name}
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton hidden={selectedTab === 1} edge="end" aria-label="activate">
                    <CheckCircleIcon/>
                </IconButton>
                <IconButton hidden={selectedTab !== 1} edge="end" aria-label="edit">
                    <ArrowBackIcon/>
                </IconButton>
                <IconButton hidden={selectedTab !== 1} edge="end" aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const mapStateToProps = (state) => ({})

export default compose(withAuthRedirect,
    connect(mapStateToProps, {})
)(Sketchbook)