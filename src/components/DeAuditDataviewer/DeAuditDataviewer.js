import React, {useEffect, useState} from 'react';
const hex2ascii = require('hex2ascii');
import './DeAuditDataviewer.scss';

export default function DeAuditDataviewer(props) {

    function timeConverter(timeStmp){

        const date = new Date(timeStmp * 1000);
        const hours = date.getHours();
        let day;
        let month;
        if(date.getDay() < 10){
            day = "0" + date.getDay()
            month = "0" + date.getMonth()
        }else{
            day = date.getDay()
            month = date.getMonth()
        }
        const year = date.getFullYear()
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime = day + "." + month +"." + year +", "+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        console.log("date",date.getUTCDate(),typeof date);
return formattedTime

    }

    function getStatus(){

        let timeStampNow = Math.round(new Date().getTime()/1000)

        let tiStart = props.deAudit.timeStartRaw
        let colPr = props.deAudit.colPeriodRaw
        let valPer = props.deAudit.valPeriodRaw
console.log("timeStampNow",timeStampNow,"tiStart",tiStart,"colPr",colPr,"valPer",valPer)
        if(timeStampNow<tiStart){
           return "Not started"
        }else if((timeStampNow > tiStart) && (timeStampNow < (tiStart + colPr + valPer))){
            return "Underway - collation period"
        }else if((timeStampNow > (tiStart + colPr)) && (timeStampNow < (tiStart + colPr + valPer))){
            return "Underway - validation period"
        }else{
            return "Finished"
        }
    }


    return (
        <div onClick={()=>console.log("hereprops", props)} style={{"fontSize":"14px","width":"93%","margin":"auto","marginTop":"25px"}} className="DAcontainer">
            <div style={{"overflow": "hidden", "textOverflow": "ellipsis"}}>
                DeAudit address: {props.deAudit.address}
            </div>

            <div className="infoHeader">Time frame</div>
            <div style={{"marginTop": "5px"}}>
                Starting DeAudit at: <br/>{timeConverter(props.deAudit.timeStartRaw)}
            </div>
            <div style={{"marginTop": "2px"}}>
                Collation period ended at: <br/>{timeConverter(props.deAudit.timeStartRaw + props.deAudit.colPeriodRaw)}
            </div>
            <div style={{"marginTop": "2px"}}>
                Validation period ended at: <br/>{timeConverter(props.deAudit.timeStartRaw + props.deAudit.colPeriodRaw + props.deAudit.valPeriodRaw)}
            </div>

            <div className="infoHeader">Stakes</div>
            <div style={{"marginTop": "5px"}}>
                Collation stake: <br/>{props.deAudit.colStake} nanoTons
            </div>
            <div style={{"marginTop": "2px"}}>
                Validation stake: <br/>{props.deAudit.valStake} nanoTons
            </div>
            <div className="infoHeader">
                Candidates

            </div>
            {props.deAudit.candidates.map((item,i)=><div style={{"marginTop": "2px"}} key={i}>{item.name} : {Number(item.votes)}</div>)}
            <div className="infoHeader">Token info</div>
            <div style={{"marginTop": "5px"}}>
                Token name: <br/>{props.deAudit.tokenData.name}
            </div>
            <div style={{"marginTop": "2px"}}>
                Total supply: <br/>{props.deAudit.tokenData.total_supply}
            </div>
            <div>
                <div className="statusWrapper">Status: {getStatus()}</div>
            </div>
        </div>
    );
}

