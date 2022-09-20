import React, { useEffect, useState } from 'react';
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { MsgExecuteContract } from '@terra-money/terra.js';
import { useTerraWebapp } from 'hooks/context';
import NftFooter from '../Nft/NftFooter';
import NftHeader, { PostError } from '../Nft/NftHeader';
import Modal from '../../components/Modal';
import RewardIcon from '../../assets/icons/rewards.svg'
import { Helmet } from 'react-helmet';
import { approve, provide_liquidity, farm_staking } from 'utils/msgGenerator';
import './staking.scss'
import unFarmWarn from '../../assets/icons/unFarmWarn.svg';
import timeLeft from '../../assets/images/time-left.png';
import StakeWait from 'components/StakeWait';
import { ContractAddressMap } from 'core/contracts';
import useStaking from '../../hooks/useStakingM';
import { _months } from './staking_utils';




let i = 0;
const Staking3M = () => {
  console.log('staking 3m component');

  const { balances, address,  networkType } = useTerraWebapp();
  const { stakingData, LOOPPrice, stakingPools, stakingMUserStaking, stakingMUserReward, stakingMUserNextReward, stakingMUserLeftTime} = useStaking(_months.M3);
  const stakingData3M = stakingData?.staking3Months || undefined;
  const userStaked = (Number(stakingMUserStaking) / Math.pow(10, 6) || 0).toString()
  const connectedWallet = useConnectedWallet()

  const [stakeModal, setStakeModal] = useState<boolean>(false);
  const [notEnoughBalance, setNotEnoughBalance] = useState<boolean>(false);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [stakingResponse, setStakingResponse] = useState<any>();
  const [stakingError, setStakingError] = useState<PostError>();
  const [unstakeModal, setUnstakeModal] = useState<boolean>(false);
  const [unstakeAmount, setUnstakeAmount] = useState<string>("");
  const [unstakingResponse, setUnstakingResponse] = useState<any>();
  const [unstakingError, setUnstakingError] = useState<PostError>();
  const [nextReward, setNextReward] = useState<string>();
  const [unstakeConfirmed, setUnstakeConfirmed] = useState(false);

  const closeStakeModal = () => {
    setStakeModal(false);
    setStakeAmount("");
    setNotEnoughBalance(false);
  }

  const closeUnstakeModal = () => {
    setUnstakeModal(false);
    setUnstakeAmount("");
    setNotEnoughBalance(false);
  }

  const onChangeStakeAmount = (value: string) => {
    setStakeAmount(value);
    if (Number(value) > Number(balances.loop) && !notEnoughBalance) setNotEnoughBalance(true);
    if(Number(value) <= Number(balances.loop) && notEnoughBalance) setNotEnoughBalance(false);
  }

  const onChangeUnstakeAmount = (value: string) => {
    setUnstakeAmount(value);
    if (Number(value) > Number(balances.loop) && !notEnoughBalance) setNotEnoughBalance(true);
    if(Number(value) <= Number(balances.loop) && notEnoughBalance) setNotEnoughBalance(false);
  }

  const closeStakingResponse = () => {
    setStakeAmount("");
    setStakingResponse(undefined);
    setStakingError(undefined);
  }

  const stakingTryAgain = () => {
    handleStake();
  }

  const handleStake = async () => {
    console.log('here');
    const stakingAddr = stakingPools['3M'];
    // const tokenAddr = tokenPairInfo.info.token.contract_addr;
    const tokenAddr = ContractAddressMap[networkType].loop;
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
    }
  }
  
  const userConfirmed = (status: string) => {
    setUnstakeConfirmed(false);
  }

  const getLeftTime = () => {
    const _staking3MUserLeftTime = stakingMUserLeftTime || 0
    const month = Math.floor(_staking3MUserLeftTime / (86400 * 30))
    const day = Math.floor((_staking3MUserLeftTime % (86400 * 30)) / 86400)
    const hour = Math.floor((_staking3MUserLeftTime % 86400) / 3600)
    const minute = Math.floor((_staking3MUserLeftTime % 3600) / 60)
    const second = Math.floor(_staking3MUserLeftTime % 60)
    return (
      <span className="text-primary">
        <img src={timeLeft} className="mr-5" />{month}<span className="text-white"> M </span>{day}<span className="text-white"> D </span>{`${hour}:${minute}:${second}`}
      </span>
    )
  }

  return (
    <section className="staking-form">
      {
        (stakingResponse || stakingError) && (
          <StakeWait response={stakingResponse} error={stakingError} onConfirm={closeStakingResponse} onTryAgain={stakingTryAgain} />
        )
      }
      <p>{i++}</p>
      <div className='stakingSetHeader'>
        <label>
          <span><img src="/lunartImages/stking.png" alt=""/></span>
          <h6><p><b>3 Months</b> ART Stake</p><div>{`${((Number(stakingData3M?.dailyReward) || 0) / 1000).toFixed(1)}K Arts`}<i>/day</i></div></h6>
          <div className='aprValues'>{`${(Math.floor((Number(stakingData3M?.stakingApr) || 0) * 100) / 100)}% APR`}</div>
        </label>
      </div>
      <div className='stakingValues'>
        <ul>
          <li><label>Next reward <img src="/lunartImages/info.png" alt=""/></label><b>{(Number(stakingMUserNextReward) || 0) / Math.pow(10, 6)}</b></li>
          <li><label>your rewards <img src="/lunartImages/info.png" alt=""/></label><b>{(Number(stakingMUserReward) || 0) / Math.pow(10, 6)}</b></li>
          <li><label>total arts <img src="/lunartImages/info.png" alt=""/></label><b>{(Number(stakingMUserStaking) || 0) / Math.pow(10, 6) + (Number(stakingMUserReward) || 0) / Math.pow(10, 6)}</b></li>
        </ul>
        <section><button onClick={ () => setUnstakeModal(true)}><b>-</b> Unstake</button><button onClick={ () => setStakeModal(true)}><b>+</b> Stake</button></section>
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
                <p className='title'><span>3 Months</span> ART Stake</p>
                <p className="sub-title">Min 3 month staking period before you're able to claim rewards. You can still withdraw after 24hrs, before the 12 month stake period is over without rewards.</p>
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
                <p className='title'>Unstake ARTS</p>
                <div className="flex-line mt-36">
                  <img src={unFarmWarn} />
                  <span className="farm-form-text mt-0 ml-10 warn-text">Your min 12 month staking period is not over. <br />Unstake without rewards?</span>
                </div>
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
                  <span ><img src={RewardIcon} /><span>UST</span></span>
                  <input type="text" placeholder='0.00' value={unstakeAmount} onChange={e => onChangeUnstakeAmount(e.target.value)} />
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
                <button className="farm-button" disabled={notEnoughBalance}>
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

export default Staking3M;
