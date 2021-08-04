import React, {useEffect, useState} from 'react';

import Main from "./pages/Main/Main";
import {getAllDeAudits} from "./sdk";
import SimpleMenu from "./components/networkSelector/networkSelector";
import Btn from "./components/Button/Button";
import {networks} from "./sdk/networks"

function App() {
    const [loading, setLoading] = useState(true)
    const [deAuditArr, serDeaudits] = useState([])

    useEffect(async ()=>{
        const deAudits = await getAllDeAudits('net.ton.dev',"0:93b7fed94a94f158eb0609317545c692492f150c0ca50450f99c050d8bc9b1c9")
        setLoading(false)
        serDeaudits(deAudits)
        setNetD(networks)

        let curNN = networks.slice(0)
        curNN.splice(1)
        setCurNet(curNN)
    },[])

    const [netD, setNetD] = useState([])
    const [curNet, setCurNet] = useState([])
    const [onFetch, setonFetch] = useState(false)

    async function changeNet(netData){
        setCurNet([netData])

        console.log("netData",netData)
    }


    async function fetchData(){
        setLoading(true)
        setonFetch(true)
        const deAudits = await getAllDeAudits(curNet[0].network,curNet[0].rootAddress)
        setLoading(false)
        setonFetch(false)
        serDeaudits(deAudits)

    }

function checkData(){
    let curNN = networks.slice(0)

    curNN.splice(1)
    console.log("curNN",curNN)
}
    function changeNetwork(){
        console.log("crumgs", crumbs)
    }

    return (
        <div>
            <div onClick={()=>checkData()} className="main">
                RT Voting Audit System 1.0
            </div>
            <div className="netWrapper">

                <SimpleMenu
                    onCL={(data)=>changeNet(data)}
                    networks={netD}
                />

                <Btn
                    onClick ={() => fetchData()}
                    label = "Fetch"
                />
            </div>
            <Main
                data={deAuditArr}
                loading={loading}
                curNet={curNet}
                onFetch={onFetch}
            />

        </div>
    );
}

export default App;
