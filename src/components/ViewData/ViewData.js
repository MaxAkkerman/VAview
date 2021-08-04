import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '95%',
        // maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
        // margin:"auto",
        background:"transparent",
    },
}));

export default function SelectedListItem(props) {
    const classes = useStyles();

    const [selected, setSelected] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        console.log("selected",index, event.currentTarget.name)
        setSelectedIndex(index)
        props.onChange(index)
    };
    useEffect(()=>{
        console.log("props.data",props.data)
        setSelected(props.data ? props.data : [])
    },[props.data])

    return (
        <div className={classes.root}>
            <div className="blockLabel">{props.blockName}</div>
            <List component="nav" style={{"padding":0}} aria-label="main mailbox folders">
                {selected && selected.map((item,i)=>
                    <div key={item.name}>
                    <ListItem
                        button
                        name={item.name}
                        selected={selectedIndex === i}
                        onClick={(event) => handleListItemClick(event,i)}
                    >
                        <ListItemText primary={item.name}/>
                    </ListItem>
                    </div>
                )}
            </List>

        </div>
    );
}
