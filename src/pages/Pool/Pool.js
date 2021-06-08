import React from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { connectWallet } from '../../store/actions/app';
import Header from './../../components/Header/Header';
import MainBlock from '../../components/MainBlock/MainBlock';
import LiquidityItem from '../../components/LiquidityItem/LiquidityItem';
import AddLiquidity from '../AddLiquidity/AddLiquidity';
import './Pool.scss';

function Pool () {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  let curExt = useSelector(state => state.appReducer.curExt);

  const connectingWallet = useSelector(state => state.appReducer.connectingWallet);
  const accountIsVisible = useSelector(state => state.appReducer.accountIsVisible);
  const wallet = useSelector(state => state.walletReducer.wallet);
  const walletIsConnected = useSelector(state => state.appReducer.walletIsConnected);

  const handleClick = () => {
    dispatch(connectWallet());
    history.push('/account');
  }

  return (
    <div className="container">
      <MainBlock
        class={'pool'}
        title={'Your liquidity'}
        button={
          <Link to="/add-liquidity" className="btn liquidity-btn">Add liquidity</Link>
        }
        content={
          !walletIsConnected ?
            <button className="btn mainblock-btn" disabled={!curExt} onClick={handleClick}>Connect wallet</button> :
            <>
              <LiquidityItem />
              <LiquidityItem />
              <LiquidityItem />
              <LiquidityItem />
            </>
        }
      />
    </div>
  )
}

export default Pool;