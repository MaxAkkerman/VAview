import React, { useEffect, useState } from 'react';

import {getAllDeAudits} from "../../sdk/index"
import './Main.scss';
import SimpleSelect from "../../components/Select/Select";
import Btn from "../../components/Button/Button";
import SelectedListItem from "../../components/ViewData/ViewData";
import hex2ascii from "hex2ascii";
import CustomSeparator from "../../components/BreadCrumbs/BreadCrumbs";
import VCviewer from "../../components/VCviewer/VCviewer";
import DeAuditDataviewer from "../../components/DeAuditDataviewer/DeAuditDataviewer";
import CircularIndeterminate from "../../components/loader/loader";
import SimpleMenu from "../../components/networkSelector/networkSelector";

function Main(props) {

    const [deAuditNameArr, setDeauditNamesArr] = useState([])
    function normData(){
        const deAuditNames = [];
        props.data && props.data.map(item=>{
            deAuditNames.push(item.name)
        })
        setDeauditNamesArr(deAuditNames)
    }
    useEffect(()=>{
       normData();
        setCurDarrS(props.data[0])
    },[props.data])

    useEffect(()=>{
        setDistrictTouched(false)
        setDistricrSelected(false)

        setMBselected(false)

        setCrumbs([])
        setVPselected(false)
        setshowVCdata(false)
        setshowDAdata(false)
    },[props.onFetch])



    const [curDeaudit, setCurDeAudit] = useState("")
    const [districtTiuched, setDistrictTouched] = useState(false)
    function handleChangeDeAudit(curD){
        setCurDeAudit(curD)
        setDistrictTouched(true)
        setDistricrSelected(false)
        setMB([])
        setMBselected(false)
        setVP([])
        setCrumbs([])
        setVPselected(false)
        setshowVCdata(false)
        setshowDAdata(true)
    }

    const [showDAdata, setshowDAdata] = useState(false)
    const [DistricrSelected, setDistricrSelected] = useState(false)


    const [curDistrict, setCurDarrS] = useState([])
    useEffect(()=>{
        const curDarr = props.data.filter(item=>item.name === curDeaudit)
        setCurDarrS(curDarr[0])
    },[curDeaudit])

    const [mbData, setMB] = useState({})

    function handleChangeDistrict(index){
        const curDistrictData = curDistrict.formated[index]
        let MBarray = []
        for (const [key, value] of Object.entries(curDistrictData.data.municipalBodies)) {
            MBarray.push({id:key,data:value,name:hex2ascii(value.name)})
        }
        setMB(MBarray)
        setDistricrSelected(true)
        setMBselected(false)
        setVPselected(false)

        let crumb = []
        crumb.push(curDistrictData.name)
        setCrumbs(crumb)
    }

    const [vpData, setVP] = useState({})
    const [MBselected, setMBselected] = useState(false)

    function handleChangeMB(index){
        const curMBdata = mbData[index]
        let VParray = []
        for (const [key, value] of Object.entries(curMBdata.data.votingPools)) {
            VParray.push({id:key,data:value,name:hex2ascii(value.name)})
        }
        setVP(VParray)
        setMBselected(true)
        setVCselected(true)
        setVPselected(false)
        let crumbMB = crumbs
        if(crumbMB.length === 2){
            crumbMB.splice(crumbMB.length-1)
        }else{
            crumbMB.splice(crumbMB.length)
        }


        crumbMB.push(curMBdata.name)

        setCrumbs(crumbMB)
    }

    const [vcData, setVC] = useState({})
    const [VPselected, setVPselected] = useState(false)

    function handleChangeVP(index){
        const curVPdata = vpData[index]
        let VCarray = []
        for (const [key, value] of Object.entries(curVPdata.data.votingCenters)) {
            VCarray.push({id:key,data:value,name:hex2ascii(value.name)})
        }
        setVC(VCarray)

        let crumbVP = crumbs

        if(crumbVP.length === 3){
            crumbVP.splice(crumbVP.length-1)
        }else{
            crumbVP.splice(crumbVP.length)
        }
        setVPselected(true)
        setVCselected(false)
        crumbVP.push(curVPdata.name)
        setCrumbs(crumbVP)
    }

    const [curVC, setCurVC] = useState([])
    const [showVCdata, setshowVCdata] = useState(false)
    function handleChangeVC(index){
        const curVC = vcData[index]
        setCurVC(curVC)
        let crumbVC = crumbs
        if(crumbVC.length === 4){
            crumbVC.splice(crumbVC.length-1)
        }else{
            crumbVC.splice(crumbVC.length)
        }
        crumbVC.push(curVC.name)
        setCrumbs(crumbVC)
        setVCselected(true)
        setshowVCdata(true)

    }
    const [VCselected ,setVCselected] = useState(false)
    const [crumbs ,setCrumbs] = useState([])


    function handleTouchCrumbs(e){
        // console.log("curDistrict",curDistrict,"mbData",mbData,"vpData",vpData,"vcData",vcData)
        let newCrumbs = crumbs.slice(0);
        let i = newCrumbs.indexOf(e)
        if(i ===0){
            setDistricrSelected(false)
            setMBselected(false)
            setVPselected(false)
            setVCselected(false)
            setshowVCdata(false)
            newCrumbs.splice(1)
            setCrumbs(newCrumbs)
            return
        }
        if(i ===1){
            setMBselected(false)
            setVCselected(false)
            setVPselected(false)
            setshowVCdata(false)
        }
        if(i ===2){
            setVCselected(false)
            setVPselected(false)
            setshowVCdata(false)
        }
        if(i ===3){
            setVCselected(false)
            setVPselected(true)
            setshowVCdata(false)
          return
        }
        newCrumbs.splice(i+1)
        setCrumbs(newCrumbs)
    }

  return (

      <div>
          {/*{console.log("999",DistricrSelected, VCselected, curDistrict)}*/}



          {props.loading &&
              <CircularIndeterminate/>


          }
          {!props.loading &&
              <div>
          <SimpleSelect
              data ={deAuditNameArr}
              label = "DeAudit"
              onClick={(e)=>handleChangeDeAudit(e)}

          />
          <div className="mainWrapper">
          <div className="DAWrapper">


          {showDAdata &&
              <DeAuditDataviewer
                  deAudit={curDistrict}
              />
              }
          </div>
<div className="DAplacesWrapper">
            <CustomSeparator
                links={crumbs}
                handler={(e)=>handleTouchCrumbs(e)}
                />

              {!DistricrSelected && districtTiuched && <div className="vier">
                <SelectedListItem
              data={curDistrict.formated}
              blockName={"Districts"}
              onChange={(data)=>handleChangeDistrict(data)}
              />
              </div>}

                  {!MBselected && DistricrSelected &&
              <div className="vier">
                  <SelectedListItem
                      data={mbData}
                      blockName={"Municipal bodies"}
                      onChange={(data)=>handleChangeMB(data)}
                  />
              </div>}

              {!VPselected && MBselected &&
              <div className="vier">
                  <SelectedListItem
                      data={vpData}
                      blockName={"Voting pools"}
                      onChange={(data)=>handleChangeVP(data)}
                  />
              </div>}

              {!VCselected && VPselected &&
              <div className="vier">
                  <SelectedListItem
                      data={vcData}
                      blockName={"Voting centers"}
                      onChange={(data)=>handleChangeVC(data)}
                  />
              </div>}

              {showVCdata && VCselected &&
                <VCviewer
                    VC={curVC}
                    curCand={curDistrict}
                    curNet={props.curNet}
                />
              }
              </div>
              </div>
              </div>}

      </div>



  )
}

export default Main;
