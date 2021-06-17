import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import { iconGenerator } from '../../iconGenerator';
import './Item.scss';

function getFullName(name){
  console.log("name",name)
  if(name === "TON"){
    return "TON Crystal"
  }else if(name === "fBTC"){
    return "fBitcoin"
  }else if(name === "WETH"){
    return "Ethereum"
  }else if(name === "fETH"){
    return "fEthereum"
  }else if(name === "WBTC"){
    return "Bitcoin"
  }else if(name === "DS-TON/USDT"){
    return "Pool tokens of TON/USDT pair"
  }else if(name === "DS-TON/ETH"){
    return "Pool tokens of TON/ETH pair"
  }else if(name === "DS-TON/BTC"){
    return "Pool tokens of TON/BTC pair"
  }else if(name === "USDT"){
    return "Tether"
  }else{
    return "default tokens"
  }
}


import {checkPubKey, mintTokens} from '../../extensions/webhook/script'
function Item(props) {
  const walletIsConnected = useSelector(state => state.appReducer.walletIsConnected);
  const [isVisible, setVisible] = useState(false);
  const pairsList = useSelector(state => state.walletReducer.pairsList);
  async function copyAddress() {
    await navigator.clipboard.writeText(props.walletAddress);
    await setVisible(true);
    await timer();
  }

  function timer() {
    setTimeout(() => {
      setVisible(false);
    }, 1000)
  }
  return (
      <React.Fragment>
        <div className="select-item" onClick={copyAddress}>
          <div className="select-item-wrapper">
            <img src={iconGenerator(props.symbol)} alt={props.symbol}/>
            <div>
              <p className="select-item-title">{props.symbol}</p>
              <p className="select-item-descr">{!isVisible && getFullName(props.symbol)} {isVisible && "Address copied"}</p>
            </div>
          </div>
          <div>
            { walletIsConnected && <span className="select-item-balance">{props.balance > 0 ? parseFloat(props.balance.toFixed(4)) : props.balance}</span> }
            {props.lp===false && <button className="btn input-btn" onClick={faucet}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
                <g id="surface1">
                  <path d="M 9.617188 0.125 C 9.128906 0.398438 9.039062 0.933594 9.421875 1.351562 C 9.644531 1.609375 9.734375 1.636719 10.265625 1.671875 L 10.855469 1.707031 L 10.855469 3.378906 L 8.417969 3.378906 C 6.273438 3.378906 5.90625 3.398438 5.4375 3.550781 C 3.984375 4.003906 2.855469 5.285156 2.578125 6.789062 C 2.519531 7.082031 2.492188 8.132812 2.507812 9.261719 L 2.535156 11.226562 L 2.785156 11.441406 C 3.035156 11.65625 3.050781 11.65625 4.980469 11.65625 L 6.921875 11.65625 L 7.199219 11.421875 L 7.472656 11.191406 L 7.472656 8.371094 L 12.234375 8.34375 L 16.992188 8.320312 L 17.234375 8.070312 L 17.480469 7.828125 L 17.480469 5.835938 C 17.480469 3.851562 17.480469 3.835938 17.269531 3.613281 L 17.054688 3.378906 L 14.777344 3.363281 L 12.5 3.335938 L 12.472656 2.507812 L 12.445312 1.691406 L 12.898438 1.691406 C 13.433594 1.691406 13.914062 1.511719 14.046875 1.261719 C 14.207031 0.960938 14.164062 0.558594 13.933594 0.292969 L 13.71875 0.0429688 L 11.769531 0.0273438 C 10.277344 0.0078125 9.785156 0.0273438 9.617188 0.125 ZM 9.617188 0.125 " fill="white"/>
                  <path d="M 4.644531 13.433594 C 4.199219 13.613281 2.652344 16.414062 2.535156 17.25 C 2.410156 18.195312 2.9375 19.199219 3.824219 19.699219 C 4.253906 19.9375 4.394531 19.972656 4.980469 19.964844 C 5.996094 19.957031 6.671875 19.5625 7.1875 18.691406 C 7.394531 18.335938 7.429688 18.183594 7.429688 17.570312 C 7.429688 16.902344 7.402344 16.804688 7.011719 15.996094 C 6.503906 14.957031 5.757812 13.761719 5.453125 13.523438 C 5.214844 13.335938 4.972656 13.308594 4.644531 13.433594 Z M 4.644531 13.433594 " fill="white"/>
                </g>
              </svg>
            </button>
            }
          </div>
        </div>
      </React.Fragment>
  )
}

export default Item;
