import React, {useEffect, useState} from 'react';
const hex2ascii = require('hex2ascii');
import './VCviewer.scss';
import {getAct4Info} from "../../sdk";
import {networks} from "../../sdk/networks"

export default function VCviewer(props) {
    async function handleListItemClick(act4addrress){
       let curAct4 = await getAct4Info(act4addrress,props.curNet[0].network)
        let newAct4arr=[];
        curAct4.voteMatrix.map((item,i)=>
            newAct4arr.push({candidate:props.curCand.candidates[i].name, votes:item})
        )
        setCurAct4(curAct4)
        setCurAct4voteM(newAct4arr)
        setshowAct4data(true)

    };
    // useEffect(()=>{
    //     console.log("props.data",props.data)
    //     setSelected(props.data ? props.data : [])
    // },[props.data])
    const [curAct4vm, setCurAct4voteM] = useState([])
const [curAct4, setCurAct4] = useState({})
const [showAct4data, setshowAct4data] = useState(false)

    return (
        <div onClick={()=>console.log(props)} className="VCContainer">
            <div className="VCName">{props.VC.name}</div>
            <div className="VCLocation">Location: {hex2ascii(props.VC.data.location)}</div>
<div className="VCact4Container">
            {props.VC.data.act4Arr.map(item=>
                <div onClick={()=>handleListItemClick(item)} className="VCact4item" key={item}>
                    <div>Act4:</div>

                    <div className="VCact4address clicable">{item}</div>

                </div>
            )}
</div>

            {showAct4data && <div className="act4Container">
                <div className="collatorContainer">Collator: {curAct4.collator && curAct4.collator}</div>
                <div className="photolink">Photo link to Act4:</div>
                <div>{curAct4.collatorPhotoLink && curAct4.collatorPhotoLink}</div>
                <div className="voteMartix">
                    Votes
                    {curAct4vm && curAct4vm.map((item, i) =>
                        <div key={i}>{item.candidate}: {Number(item.votes)
                        }</div>)}
                </div>
                <div className="totalamountValidators">Total amount of validators: {curAct4.countValidators && Number(curAct4.countValidators)}</div>
                <div className="valFor">Validated for: {curAct4.validatorsFor && curAct4.validatorsFor.length}</div>
                <div className="valAgainst" >Validated against: {curAct4.validatorsAgainst && curAct4.validatorsAgainst.length}</div>
            </div>
            }

        </div>
    );
}
