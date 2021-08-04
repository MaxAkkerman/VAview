import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import MenuItem from "@material-ui/core/MenuItem";
import {Chip} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        display: "flex",
        justifyContent: "center",
        marginLeft: "10px",
        marginRight: "10px",
        height:"fit-content",
        minHeight:"65px",
        marginTop: "20px",
    }
}));



export default function CustomSeparator(props) {
    const classes = useStyles();
    function handleClick(name) {
        props.handler(name)
    }
    return (
        <div className={classes.root}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {props.links.map(item=>
                    <div key={item}>
                        <Chip
                            label={item}
                            onClick={()=>handleClick(item)}
                            clickable
                            color="primary"
                            variant="outlined"

                                />
                    </div>
                )}
            </Breadcrumbs>

        </div>
    );
}
