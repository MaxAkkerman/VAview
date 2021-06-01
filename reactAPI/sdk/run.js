import {signerKeys, TonClient} from "@tonclient/core";
import {libWeb} from "@tonclient/lib-web";
import {Account} from "@tonclient/appkit";
import {checkExtensions, getCurrentExtension} from "../extensions/checkExtensions";
import {DexrootData} from "../contracts/DEXrootContract.js";

TonClient.useBinaryLibrary(libWeb);

import {DEXrootContract} from "../contracts/DEXRoot.js";
import {DEXclientContract} from "../contracts/DEXClient.js";

const Radiance = require('../Radiance.json');

/*
    deploy new client
*/


function getShard(string) {
    return string[2];
}
let clientAddress = ""
export async function onSharding() {

    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        // const clientKeys = signerKeys(await TonClient.default.crypto.generate_random_sign_keys());
        //
        // console.log("clientKeys.keys.public:", clientKeys.keys.public);
        // let pubkeyH = '0x'+clientKeys.keys.public;

        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        let targetShard = getShard(Radiance.networks['2'].dexroot);
        console.log("pubkeypubkey",pubkey)
        let status = false;
        let n = 0;
        while (!status) {
            let response = await runMethod("getClientAddress", {_answer_id:0,clientPubKey:'0x'+pubkey,clientSoArg:n}, rootContract)
            console.log("response",response)
            let clientAddr;
            if(name==="broxus"){
                clientAddr = response.value0._address;
            }else{
                clientAddr = response.value0;
            }


            let shard = getShard(clientAddr);
            console.log(shard,targetShard)
            if (shard === targetShard) {
                status = true;
                clientAddress = clientAddr;
                console.log({address: clientAddr, keys: pubkey, clientSoArg: n})
                await createDEXclient({address: clientAddr, keys: '0x'+pubkey, clientSoArg: n}).catch(e=>console.log(e))
                // return {address: clientAddr, keys: pubkey, clientSoArg: n}
            } else {console.log(n);}
            n++;
        }
    } catch (e) {
        console.log("catch E", e);
    }
}


// 0:3e0b005781c00c4ace572ea9b06ff094ac3f0d1572d40f10b973492f48fd1b0f
export async function createDEXclient(shardData) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod, internal} = curExt._extLib

    // const shardData = onSharding()
    // console.log("shardData", shardData)
    try {
        let resp = {};
        console.log("shardData.clientSoArg",shardData.clientSoArg, typeof shardData.clientSoArg)
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        console.log("rootContract",rootContract)
        let deployresp = await callMethod("createDEXclient", {pubkey: shardData.keys,souint:shardData.clientSoArg}, rootContract).then(res => {
            resp = res;
            console.log("res",res)
        }).catch(e=>console.log(e));
    console.log("deployresp",deployresp)
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

export async function checkPubKey() {
    //put curExt to global store
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);

        let checkPubKey = await runMethod("checkPubKey", {pubkey:"0x"+pubkey}, rootContract)

        console.log( "checkPubKey",checkPubKey)
        return checkPubKey
        // console.log("getBalanceTONgrams",getBalanceTONgrams)

    } catch (e) {

        console.log("catch E", e);
    }
}

export async function getGiverAddress() {
    //put curExt to global store
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        console.log("pubkey",pubkey,"address",address)
        let getGiverAddress = await runMethod("getGiverAddress", {_answer_id:0,giverPubKey:"0x"+pubkey}, rootContract)

        console.log( "getGiverAddress",getGiverAddress)
        return getGiverAddress
        // console.log("getBalanceTONgrams",getBalanceTONgrams)

    } catch (e) {

        console.log("catch E", e);
    }
}


export async function getRootData() {
    //put curExt to global store
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);

        let getBalanceTONgrams = await runMethod("getBalanceTONgrams", {}, rootContract)
        let balanceOf = await runMethod("balanceOf", {}, rootContract)
        let pubkeys = await runMethod("pubkeys", {}, rootContract)
        let pairs = await runMethod("pairs", {}, rootContract)
        let pairKeys = await runMethod("pairKeys", {}, rootContract)
        let clients = await runMethod("clients", {}, rootContract)
        let clientKeys = await runMethod("clientKeys", {}, rootContract)
console.log( {...getBalanceTONgrams,...balanceOf,...pubkeys,...pairs,...pairKeys,...clients,...clientKeys})
        return {...getBalanceTONgrams,...balanceOf,...pubkeys,...pairs,...pairKeys,...clients,...clientKeys}
        // console.log("getBalanceTONgrams",getBalanceTONgrams)

    } catch (e) {

        console.log("catch E", e);
    }
}
export async function getClientData() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    console.log("address",address)


    try {
        let resp = {};
        //todo check address
        const clientContract = await contract(DEXclientContract.abi, "0:3faf8b711558183290d3ad0a1a9860423e2432a049086075fe432eed2bf1f9d0");
        let soUINT = await runMethod("soUINT", {}, clientContract)
        let rootConnector = await runMethod("rootConnector", {}, clientContract)
        let rootDEX = await runMethod("rootDEX", {}, clientContract)
        let pairs = await runMethod("pairs", {}, clientContract)
        let rootWallet = await runMethod("rootWallet", {}, clientContract)
        let getAllDataPreparation = await runMethod("getAllDataPreparation", {}, clientContract)
        let counterCallback = await runMethod("counterCallback", {}, clientContract)

        console.log( {...soUINT,...rootConnector,...rootDEX,...pairs,...rootWallet,...getAllDataPreparation,...counterCallback})
        return {...soUINT,...rootConnector,...rootDEX,...pairs,...rootWallet,...getAllDataPreparation,...counterCallback}
    } catch (e) {
        console.log("catch E", e);
    }
}

export async function getPairData() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    console.log("address",address)
    try {
        let resp = {};
        //todo check address
        const clientContract = await contract(DEXclientContract.abi, "0:3faf8b711558183290d3ad0a1a9860423e2432a049086075fe432eed2bf1f9d0");
        let soUINT = await runMethod("soUINT", {}, clientContract)
        let rootConnector = await runMethod("rootConnector", {}, clientContract)
        let rootDEX = await runMethod("rootDEX", {}, clientContract)
        let pairs = await runMethod("pairs", {}, clientContract)
        let rootWallet = await runMethod("rootWallet", {}, clientContract)
        let getAllDataPreparation = await runMethod("getAllDataPreparation", {}, clientContract)
        let counterCallback = await runMethod("counterCallback", {}, clientContract)

        console.log( {...soUINT,...rootConnector,...rootDEX,...pairs,...rootWallet,...getAllDataPreparation,...counterCallback})
        return {...soUINT,...rootConnector,...rootDEX,...pairs,...rootWallet,...getAllDataPreparation,...counterCallback}
    } catch (e) {
        console.log("catch E", e);
    }
}
/*
    pairAddr type string
 */
export async function connectToPair(pairAddr) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod, internal} = curExt._extLib
    console.log("address",address)
    try {
        let resp = {};
        //todo check address
        const clientContract = await contract(DEXclientContract.abi, address);

        let statusOfConnection = await callMethod("connectPair", {
            pairAddr: pairAddr,
        }, clientContract)

        console.log("statusOfConnection",statusOfConnection)

    } catch (e) {

        console.log("catch E", e);
    }
}





export async function getPairClientWallets(pairAddr) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("getPairClientWallets", {
            pairAddr: pairAddr,
        }, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

/*
    {
        pairKeysR:address[]
        rootKeysR: address[]
     }

 */
export async function getAllDataPreparation() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("getAllDataPreparation", {}, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

/*
    {
        "dexclient": "address"
        "dexclientUINT256":"uint256"
    }
*/

export async function showContractAddress() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("showContractAddress", {}, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

export async function rootDEX() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("rootDEX", {}, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

export async function wTONwrapper() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("wTONwrapper", {}, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

/*
  pairKeys: address[]
*/
export async function pairKeys() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    console.log("curExt", curExt)
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        console.log("rootContract", rootContract)
        await runMethod("pairKeys", {}, rootContract).then(res => {
            console.log("resp", res)
            resp = res
        });

        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

export async function getDexClientData() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    // console.log("curExt", curExt)
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
        const {pairKeysR, rootKeysR} = await getAllDataPreparation();
        const pairsData = [];
        await pairKeysR.map(async item => {
            let curDat = {};
            let {walletA, walletB} = await getPairClientWallets(item);
            curDat.pairAddress = item;
            curDat.walletA = walletA;
            curDat.walletB = walletB;
            await pairsData.push(curDat)
        })

        return pairsData

        // const pairsData = [];
        // pairKeysR.map(item)
        // console.log("pairKeysR", pairKeysR, "rootKeysR",rootKeysR)
//         const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
//         console.log("rootContract", rootContract)
//         await runMethod("pairKeys", {}, rootContract).then(res => {
//             console.log("resp", res)
//             resp = res
//         });
//
//         return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

