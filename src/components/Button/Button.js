import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Button.scss';


export default function Btn(props) {

    return (
        <div className="btn">
            <Button onClick={props.onClick} variant="contained" color="primary">
                {props.label}
            </Button>

        </div>
    );
}
