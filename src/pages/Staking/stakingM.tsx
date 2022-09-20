import { useState, FC, useEffect, useRef  } from 'react';
import { useQuery } from 'react-query';
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { MsgExecuteContract } from '@terra-money/terra.js';
import { useTerraWebapp } from 'hooks/context';
import { PostError } from '../Nft/NftHeader';
import Modal from '../../components/Modal';
import RewardIcon from '../../assets/icons/rewards.svg'
import { approve, farm_staking, pool_unstaking } from 'utils/msgGenerator';
import unFarmWarn from '../../assets/icons/unFarmWarn.svg';
import timeLeft from '../../assets/images/time-left.png';
import StakeWait from 'components/StakeWait';
import UnStakeWait from 'components/UnStakeWait';
import { _months } from './staking_utils';
import './staking.scss'
import { ContractAddressMap } from 'core/contracts';
import { isDotDotDotToken } from 'typescript';
import { Network } from 'core/constants';
import useStakingM from '../../hooks/useStakingM';
import { constSelector } from 'recoil';


const StakingM = (_month:_months ) => {
  const month_index = _month == 3 ? "3M" : _month == 12 ? "12M" : "18M"; 
  
  // const { balances, address,  networkType } = useTerraWebapp();
  const {stakingMUserStaking, stakingMUserReward, stakingMUserNextReward, stakingMUserLeftTime, LOOPPrice, stakingPools, stakingData, balances, address,  networkType, stakingMUserStakedTime } = useStakingM(_month);
  
  const stakingDataM = stakingData? stakingData["staking"+_month+"Months"] : undefined;
  const userStaked = (Number(stakingMUserStaking) / Math.pow(10, 6) || 0).toString()
  const connectedWallet = useConnectedWallet()

  const [stakeModal, setStakeModal] = useState<boolean>(false);
  const [notEnoughBalance, setNotEnoughBalance] = useState<boolean>(true);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [stakingResponse, setStakingResponse] = useState<any>();
  const [unStakingResponse, setUnStakingResponse] = useState<any>();
  const [stakingError, setStakingError] = useState<PostError>();
  const [unStakingError, setUnStakingError] = useState<PostError>();
  const [unstakeModal, setUnstakeModal] = useState<boolean>(false);
  const [unstakeAmount, setUnstakeAmount] = useState<string>("");
  const [unstakeConfirmed, setUnstakeConfirmed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputUnstake = useRef("");

  const closeStakeModal = () => {
    setStakeModal(false);
    setStakeAmount("");
    setNotEnoughBalance(true);
  }

  const closeUnstakeModal = () => {
    setUnstakeModal(false);
    // setUnstakeAmount("");
    setUnstakeConfirmed(false);
    setNotEnoughBalance(true);
  }

  const onChangeStakeAmount = (value: string) => {
    setStakeAmount(value);
    if(value == "" || Number(value) <= 0){
      setNotEnoughBalance(true);
      return;
    }
    if (Number(value) > Number(balances.loop) ) setNotEnoughBalance(true);
    else setNotEnoughBalance(false);
  }

  const onChangeUnstakeAmount = (value: string) => {
    setUnstakeAmount(value);
    if(value == "" || Number(value) <= 0){
      setNotEnoughBalance(true);
      return;
    }
    if(Number(value) <= Number(userStaked) && unstakeConfirmed && isEnable24Hrs()) setNotEnoughBalance(false);
    else setNotEnoughBalance(true);
  }

  const closeStakingResponse = () => {
    setStakeAmount("");
    setStakingResponse(undefined);
    setStakingError(undefined);
  }

  const stakingTryAgain = () => {
    handleStake();
  }

  const closeUnStakingResponse = () => {
    setUnStakingResponse(undefined);
    setUnStakingError(undefined);
  }

  const unStakingTryAgain = () => {
    handleUnStake();
  }

  

  const handleStake = async () => {
    const stakingAddr = stakingPools[month_index];
    const tokenAddr = ContractAddressMap[networkType].loop;
    // const tokenAddr = tokenPairInfo.info.token.contract_addr;
    const msgs: MsgExecuteContract[] = [];
    const _stakeAmount = (Math.floor(Number(stakeAmount) * Math.pow(10, 6))).toString();
    msgs.push(approve(address, tokenAddr, _stakeAmount, stakingAddr));
    msgs.push(farm_staking(address, tokenAddr, _stakeAmount, stakingAddr));
    try {
      if (connectedWallet) {
        const response = await connectedWallet.post({
          msgs: msgs
        });
        setStakingResponse(response);
        setStakeModal(false);
        setStakeAmount("");
      }
    } catch (error) {
      setStakingError(error as Error)
      setStakeModal(false);
    }
  }

  
  const handleUnStake = async () => {
    const stakingAddr = stakingPools[month_index];
    const tokenAddr = ContractAddressMap[networkType].loop;
    const msgs: MsgExecuteContract[] = [];
  
    const _unStakeAmount = (Math.floor(Number(unstakeAmount) * Math.pow(10, 6))).toString()
    if(isDisableUnstake()) msgs.push(pool_unstaking(address, _unStakeAmount, stakingAddr, false));
    else msgs.push(pool_unstaking(address, _unStakeAmount, stakingAddr, true));

    try {
      if (connectedWallet) {
        const response = await connectedWallet.post({
          msgs: msgs
        });
        setUnStakingResponse(response);
        setUnstakeModal(false);
      }
    } catch (error) {
        setUnStakingError(error as Error)
        setUnstakeModal(false);
        setUnstakeConfirmed(false);
        setNotEnoughBalance(true);
    }
  }
  
  const userConfirmed = (status: string) => {
    setUnstakeConfirmed(!unstakeConfirmed);
    console.log('unstakeAmount:', unstakeAmount);
    console.log('isEnable24Hrs():', isEnable24Hrs());   
  
    if(unstakeAmount == "" || Number(unstakeAmount) <= 0 || !isEnable24Hrs()){
      setNotEnoughBalance(true);
      return;
    }
   
    if(Number(unstakeAmount) <= Number(balances.loop) && !unstakeConfirmed && isEnable24Hrs()) setNotEnoughBalance(false);
    else  setNotEnoughBalance(true);
  }

  useEffect(()=>{
    return(()=>{
      if(isEnable24Hrs()){
        setUnstakeAmount(Number(userStaked).toString());
      }
    })
  });

  const getLeftTime = () => {
    const __stakingMUserLeftTime = stakingMUserLeftTime || 0
    const month = Math.floor(__stakingMUserLeftTime / (86400 * 30))
    const day = Math.floor((__stakingMUserLeftTime % (86400 * 30)) / 86400)
    const hour = Math.floor((__stakingMUserLeftTime % 86400) / 3600)
    const minute = Math.floor((__stakingMUserLeftTime % 3600) / 60)
    const second = Math.floor(__stakingMUserLeftTime % 60)
    return (
      <span className="text-primary">
        <img src={timeLeft} className="mr-5" />{month}<span className="text-white"> M </span>{day}<span className="text-white"> D </span>{`${hour}:${minute}:${second}`}
      </span>
    )
  }

  const isEnable24Hrs = () => {
    const currentTime = Date.now() / 1000;
    const endTime = Number(stakingMUserStakedTime);
    if( (currentTime - endTime) <= 86400) return false
    return true;
  }

  const isDisableUnstake = () =>  {
    if(!stakingMUserLeftTime) return false;
    return true;
  }

  const until24H = () => {
      if( !isEnable24Hrs()){
      return (
        <div className="flex-line mt-5">
          <img src={unFarmWarn} />
          <span className="farm-form-text ml-10 mt-1 warn-text">Unstake will be enabled after 24Hrs</span>
        </div>
      );
    }
    else return(<></>)
  }

  return (
    <section className="staking-form">
      {
        (stakingResponse || stakingError) && (
          <StakeWait response={stakingResponse} error={stakingError} onConfirm={closeStakingResponse} onTryAgain={stakingTryAgain} />
        )
      }
      {
        (unStakingResponse || unStakingError) && (
          <UnStakeWait response={unStakingResponse} error={unStakingError} onConfirm={closeUnStakingResponse} onTryAgain={unStakingTryAgain} />
        )
      }
      <div className='stakingSetHeader'>
        <label>
          <span><img src="/lunartImages/stking.png" alt=""/></span>
          <h6><p><b>{_month} Months</b> ART Stake</p><div>{`${((Number(stakingDataM?.dailyReward) || 0) / 1000).toFixed(1)}K Arts`}<i>/day</i></div></h6>
          <div className='aprValues'>{`${(Math.floor((Number(stakingDataM?.stakingApr) || 0) * 100) / 100)}% APR`}</div>
        </label>
      </div>
      <div className='stakingValues'>
        <ul>
          <li><label>Next reward <img src="/lunartImages/info.png" alt=""/></label><b>{(Number(stakingMUserNextReward) || 0) / Math.pow(10, 6)}</b></li>
          <li><label>your rewards <img src="/lunartImages/info.png" alt=""/></label><b>{(Number(stakingMUserReward) || 0) / Math.pow(10, 6)}</b></li>
          <li><label>total arts <img src="/lunartImages/info.png" alt=""/></label><b>{(Number(stakingMUserStaking) || 0) / Math.pow(10, 6) + (Number(stakingMUserReward) || 0) / Math.pow(10, 6)}</b></li>
        </ul>
        <section><button onClick={ () => setUnstakeModal(true)} disabled={!isEnable24Hrs()}><b>-</b> Unstake</button><button onClick={ () => setStakeModal(true)}><b>+</b> Stake</button></section>
      </div>
      <Modal
        isOpen={stakeModal}
        title=''
        onClose={closeStakeModal}
      >
        <div className='stakingModal'>
          <div className="card-wrapper">
            <div className="card-content-wrapper">
              <div className="card-heading">
                <p className='title'><span>{_month} Months</span> ART Stake</p>
                <p className="sub-title">Min {_month} month staking period before you're able to claim rewards. You can still withdraw after 24hrs, before the 12 month stake period is over without rewards.</p>
              </div> 
              <div className="card-content-margin">
                <div className="card-content-row">
                  <div className="farm-form-text">
                    Balance:&nbsp;
                    <span className="farm-form-text white-text">{balances.loop || "0.00"}</span>
                    &nbsp;
                    <span className="farm-form-text">ARTS</span>
                  </div>
                </div>
                <div className="input-box">
                  <span ><img src={RewardIcon} /><span>ARTS</span></span>
                  <input type="text" placeholder='0.00' value={stakeAmount} onChange={e => onChangeStakeAmount(e.target.value)} />
                  <button onClick={() => onChangeStakeAmount(balances.loop)}>max</button>
                </div>
                <div className="card-content-row">
                  <div className="farm-form-text">
                    Value:&nbsp;
                    <span className="farm-form-text white-text">{(Number(balances.loop) * LOOPPrice).toFixed(2)}</span>
                    &nbsp;
                    <span className="farm-form-text">UST</span>
                  </div>
                </div>
                <button className="farm-button mt-36" disabled={notEnoughBalance} onClick={handleStake}>
                  {/* <img src={CartIcon} />  */}
                  Stake
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={unstakeModal}
        title=''
        onClose={closeUnstakeModal}
      >
        <div className='stakingModal'>
          <div className="card-wrapper">
            <div className="card-content-wrapper">
              <div className="card-heading card-content-margin">
                <p className='title'><span>{_month} Months</span>  Unstake ARTS</p>
                <div className="flex-line mt-36">
                  <img src={unFarmWarn} />
                  <span className="farm-form-text mt-0 ml-10 warn-text">Your min {_month} months staking period is not over. <br />Unstake without rewards?</span>
                </div>
                {until24H()}
              </div> 
              <div className="card-content-margin mt-20">
                <div className="posotion-relative">
                  <div className="gradient-background">
                    <span>Time Left</span>
                  </div>
                  <div className="gradient-content">
                    <span>Time Left</span>
                    {getLeftTime()}
                  </div>
                </div>
                <div className="card-content-row mt-20">
                  <div className="farm-form-text">
                    Balance:&nbsp;
                    <span className="farm-form-text white-text">{userStaked}</span>
                    &nbsp;
                    <span className="farm-form-text">ARTS</span>
                  </div>
                </div>
                <div className="input-box">
                  <span ><img src={RewardIcon} /><span>ARTS</span></span>
                  <input type="text" placeholder='0.00' value={isDisableUnstake()? Number(userStaked).toString() : unstakeAmount} disabled={isDisableUnstake() }   onChange={e => onChangeUnstakeAmount(e.target.value)} />
                  {/* <input type="text" placeholder='0.00' value={isDisableUnstake()? Number(userStaked).toString() : unstakeAmount}   onChange={e => onChangeUnstakeAmount(e.target.value)} /> */}
                  {/* <input type="text" placeholder='0.00' value={Number(userStaked).toString()} disabled={true} onChange={e => onChangeUnstakeAmount(e.target.value)} /> */}
                  <button onClick={() => onChangeUnstakeAmount(Number(userStaked).toString())}>max</button>
                </div>
                <div className="card-content-row">
                  <div className="farm-form-text">
                    Value:&nbsp;
                    <span className="farm-form-text white-text">{(Number(userStaked) * LOOPPrice).toFixed(2)}</span>
                    &nbsp;
                    <span className="farm-form-text">UST</span>
                  </div>
                </div>
                <div className="flex-line farm-form-text mb-16 mt-36">
                  <label className="checkbox">
                    <input type="checkbox" className="checkbox" onChange={(e) => userConfirmed(e.target.value)} />
                  </label>
                  <span className="mt-0 ml-10">I am sure I want to unstake everything without rewards.</span>
                </div>
                <button className="farm-button" disabled={notEnoughBalance} onClick={handleUnStake}>
                  {/* <img src={CartIcon} />  */}
                  Unstake
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default StakingM;
