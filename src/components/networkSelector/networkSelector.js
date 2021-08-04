import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export default function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        console.log("networks",props)
        setAnchorEl(event.currentTarget);


    };
const [defaultMenu, setDefaultMenu] = useState("")

    useEffect(()=>{
        setDefaultMenu("NET.TON.DEV")
console.log(props)
    },[])

    const handleClose = (e) => {
        console.log("e",e)
        setAnchorEl(null);
        let curNet = props.networks.filter(item=>item.name===e.target.id)
        setDefaultMenu(curNet[0].name)
        console.log("curNet",curNet)
        props.onCL(curNet[0])
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {defaultMenu}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    props.networks.map(item=><MenuItem id={item.name} key={item.name} onClick={(e)=>handleClose(e)}>{item.name}</MenuItem>)
                }
            </Menu>
        </div>
    );
}
