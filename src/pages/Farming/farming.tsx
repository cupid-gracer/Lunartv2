import React, { useEffect, useState } from 'react';
import { useConnectedWallet, UserDenied, CreateTxFailed, TxFailed, TxUnspecifiedError, } from '@terra-money/wallet-provider'
import { MsgExecuteContract } from '@terra-money/terra.js';
import { useTerraWebapp } from 'hooks/context';
import ReactTooltip from 'react-tooltip';
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';
import SwiperCore, {
  Navigation,
  Scrollbar,
  Pagination,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Helmet } from 'react-helmet';

import { approve, provide_liquidity, farm_staking, farm_unstaking, remove_liquidity } from 'utils/msgGenerator';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/pagination/pagination.min.css';
import './farming.scss';
import RewardIcon from '../../assets/icons/rewards.svg'
import UstIcon from '../../assets/icons/ust.svg';
import LoopIcon from '../../assets/icons/loopIcon.svg';
import RewardIconBig from '../../assets/icons/rewardsB.svg'
import UstIconBig from '../../assets/icons/ustB.svg';
import LoopIconBig from '../../assets/icons/loopIconB.png';

import FarmIcon from '../../assets/icons/farmIcon.svg';
import unFarmIcon from '../../assets/icons/unFarmIcon.svg';
import unFarmWarn from '../../assets/icons/unFarmWarn.svg';
import unFarmNotify from '../../assets/icons/unFarmNotify.svg';
import iconSuccess from '../../assets/icons/iconSuccess.png';
import iconFail from '../../assets/icons/iconFail.png';
import TimerIcon from '../../assets/icons/timer.svg';

import plusIcon from '../../assets/icons/plusIcon.svg';
import UnFarmWait from 'components/UnFarmWait';
import FarmWait from 'components/FarmWait';
import NftPopup from 'components/NftPopup';

import useFarming from '../../hooks/useFarming';

const InfoIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM9 4C9 4.26522 8.89464 4.51957 8.70711 4.70711C8.51957 4.89464 8.26522 5 8 5C7.73478 5 7.48043 4.89464 7.29289 4.70711C7.10536 4.51957 7 4.26522 7 4C7 3.73478 7.10536 3.48043 7.29289 3.29289C7.48043 3.10536 7.73478 3 8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4ZM7 7C6.73478 7 6.48043 7.10536 6.29289 7.29289C6.10536 7.48043 6 7.73478 6 8C6 8.26522 6.10536 8.51957 6.29289 8.70711C6.48043 8.89464 6.73478 9 7 9V12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H9C9.26522 13 9.51957 12.8946 9.70711 12.7071C9.89464 12.5196 10 12.2652 10 12C10 11.7348 9.89464 11.4804 9.70711 11.2929C9.51957 11.1054 9.26522 11 9 11V8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7H7Z" fill="#E6DBDB" fillOpacity="0.75" />
</svg>
)

export type PostError =
  | UserDenied
  | CreateTxFailed
  | TxFailed
  | TxUnspecifiedError

const NftWelcome: React.FC = (props: any) => {
  const { connect, balances, pair, pairAddress, uusdPairInfo, tokenPairInfo, address, tradingData } = useTerraWebapp();
  const {uLP, farm, uLF, userLpValue, remainTime, userReward, userStaked, userStakedTime } = useFarming();
  const connectedWallet = useConnectedWallet()
  const [sidebarActive, setSidebar] = useState(false);
  const [uusdAmount, setUusdAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [notEnoughBalance, setNotEnoughBalance] = useState(false);
  const [tabStatus, setTabStatus] = useState("farm");
  const [unFarmModal, setUnFarmModal] = useState(false);
  const [leftTime, setLeftTime] = useState<number|undefined>(undefined);
  const [lpAmount, setLpAmount] = useState("");
  const [unstakeEverything, setUnstakeEverything] = useState(false);
  const [noAmount, setNoAmount] = useState(true);
  const [unFarmResponse, setUnFarmResponse] = useState<any>();
  const [unFarmError, setUnFarmError] = useState<PostError>()
  const [farmResponse, setFarmResponse] = useState<any>();
  const [farmError, setFarmError] = useState<PostError>()
  SwiperCore.use([Navigation, Scrollbar, Pagination, Autoplay]);
  const handleSidebar = (status: any) => {
    setSidebar(status);
  };

  useEffect(() => {
    setLeftTime(remainTime);
  }, [remainTime])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!Number(uusdAmount)) return;
      const _tokenAmount = pair ? (Number(tokenPairInfo.amount) / Number(uusdPairInfo.amount) * Number(uusdAmount)).toFixed(6) : "";
      setTokenAmount(_tokenAmount);
      if ((Number(balances.uusd) < Number(uusdAmount) || Number(balances.arts) < Number(_tokenAmount))) setNotEnoughBalance(true);
      else setNotEnoughBalance(false);
    }, 15000)
    return () => clearInterval(timer);
  }, [tokenPairInfo, uusdPairInfo, balances, pair, uusdAmount])

  // function handleSearch(e: any) {
  //   if (e.key === 'Enter' && e.target.value) {
  //     props.history.push({
  //       pathname: '/nftExplore',
  //       state: { search: e.target.value },
  //     });
  //   }
  // }

  const onChangeUusdAmount = (amount: string) => {
    if (Number(amount)) setNoAmount(false);
    else setNoAmount(true);
    setUusdAmount(amount);
    const _amount = Number(amount);
    const _tokenAmount = pair ? (Number(tokenPairInfo.amount) / Number(uusdPairInfo.amount) * _amount).toFixed(6) : "";
    setTokenAmount(_tokenAmount);
    if ((Number(balances.uusd) < Number(amount) || Number(balances.arts) < Number(_tokenAmount))) setNotEnoughBalance(true);
    else setNotEnoughBalance(false);
  }
  
  const onChangeTokenAmount = (amount: string) => {
    if (Number(amount)) setNoAmount(false);
    else setNoAmount(true);
    setTokenAmount(amount);
    const _amount = Number(amount);
    const _uusdAmount = pair? (Number(uusdPairInfo.amount) / Number(tokenPairInfo.amount) * _amount).toFixed(6) : "";
    setUusdAmount(_uusdAmount);
    if ((Number(balances.uusd) < Number(_uusdAmount) || Number(balances.arts) < Number(_amount))) setNotEnoughBalance(true);
    else setNotEnoughBalance(false);
  }

  const onChangeMaxAmount = () => {
    const _maxUUSDAmount = Number(balances.uusd) - 0.5;
    const _maxTokenAmount = Number(balances.arts);
    const _rate = Number(uusdPairInfo.amount) / Number(tokenPairInfo.amount);
    if (_maxUUSDAmount <= 0 || _maxTokenAmount <= 0) {
      setNoAmount(true);
      setUusdAmount("0");
      setTokenAmount("0");
      return;
    }
    setNoAmount(false);
    if (_maxUUSDAmount / _maxTokenAmount > _rate) {
      const _possibleMaxTokenAmount = (_maxTokenAmount).toString();
      const _possibleMaxUUSDAmount = (_maxTokenAmount * _rate).toFixed(6);
      setUusdAmount(_possibleMaxUUSDAmount);
      setTokenAmount(_possibleMaxTokenAmount);
    } else {
      const _possibleMaxUUSDAmount = (_maxUUSDAmount).toString();
      const _possibleMaxTokenAmount = (_maxUUSDAmount / _rate).toFixed(6);
      setUusdAmount(_possibleMaxUUSDAmount);
      setTokenAmount(_possibleMaxTokenAmount);
    }
    setNotEnoughBalance(false);
  }

  const onChangeLPMax = () => {
    if (Number(userStaked)) setNoAmount(false);
    else setNoAmount(true);
    setLpAmount((Number(userStaked || 0) / Math.pow(10, 6)).toString());
  }

  const onChangeLpAmount = (amount: string) => {
    if (Number(amount)) setNoAmount(false);
    else setNoAmount(true);
    setLpAmount(amount);
    const maxAmount = Number(userStaked) / Math.pow(10, 6);
    if (Number(amount) > maxAmount) setNotEnoughBalance(true);
    else setNotEnoughBalance(false);
  } 

  const handleFarm = async () => {
    const tokenAddress = tokenPairInfo.info.token.contract_addr;
    const msgs: MsgExecuteContract[] = [];
    const expectedULPTokenAmount = (Math.floor((Number(pair.total_share) * Number(uusdAmount) * Math.pow(10, 6) / Number(uusdPairInfo.amount)) * 0.999)).toFixed(0);
    msgs.push(approve(address, tokenAddress, (Number(tokenAmount) * Math.pow(10, 6)).toFixed(0), pairAddress));
    msgs.push(provide_liquidity(address, tokenAddress, (Math.floor(Number(tokenAmount) * Math.pow(10, 6))).toFixed(0), "uusd", (Number(uusdAmount) * Math.pow(10, 6)).toFixed(0), pairAddress));
    msgs.push(farm_staking(address, uLP, expectedULPTokenAmount, farm));
    try {
      if (connectedWallet) {
        const response = await connectedWallet.post({
          msgs: msgs
        });
        setFarmResponse(response);
        setUusdAmount("");
        setTokenAmount("");
      }
    } catch (error) {
      setFarmError(error as Error)
    }
  }

  const handleUnFarm = async () => {
    const msgs: MsgExecuteContract[] = [];
    let amount = (Math.floor(Number(lpAmount) * Math.pow(10, 6))).toString()
    // if (userStaked && userStakedTime && (Date.now() / 1000 - Number(userStakedTime)) < 604800) amount = userStaked.toString()
    if (userStaked) amount = userStaked.toString()
    msgs.push(farm_unstaking(address, uLF, amount, farm));
    msgs.push(remove_liquidity(address, uLP, amount, pairAddress));
    try {
      if (connectedWallet) {
        const response = await connectedWallet.post({
          msgs: msgs
        });
        setUnFarmResponse(response);
      }
    } catch (error) {
      setUnFarmError(error as Error)
    }
    // setUnFarmModal(!unFarmModal);
  }

  const getLeftTime = (type: string) => {
    let value = leftTime ? leftTime : 0;
    switch(type) {
      case "d" :
        value = Math.floor(value / 86400);
        return value.toString();
      case "h":
        value = Math.floor((value % 86400) / 3600);
        return value.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      case "m":
        value = Math.floor((value % 3600) / 60);
        return value.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      case "s":
        value = value % 60;
        return value.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      default:
        value = value % 60;
        return value.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      }
  }

  const changeTab = (state: string) => {
    setTabStatus(state);
    setNotEnoughBalance(false);
    setUnstakeEverything(false);
    setUusdAmount("");
    setTokenAmount("");
    setLpAmount("");
    setNoAmount(true);
  }

  const switchUnstakeEverything = () => {
    setUnstakeEverything(!unstakeEverything);
  }

  const closeUnFarmResponse = () => {
    setUnFarmResponse(undefined);
    setUnFarmError(undefined);
  }

  const unFarmTryAgain = () => {
    handleUnFarm()
  }
  const closeFarmResponse = () => {
    setFarmResponse(undefined);
    setFarmError(undefined);
  }

  const farmTryAgain = () => {
    handleFarm()
  }

  const farmCancel = () => {
    setFarmResponse(undefined);
    setFarmError(undefined);
  }

  const unFarmCancel = () => {
    setUnFarmResponse(undefined);
    setUnFarmError(undefined);
  }

  const getARTSAPY = () => {
    if (!tradingData) return '0.00%'
    const ARTSUSTTradingData = tradingData.data.filter((each: any) => each.pairAddress === pairAddress)
    return `${Number(ARTSUSTTradingData[0].APY).toLocaleString('en-US', { minimumIntegerDigits: 2})}%`
  }

  const getARTSRewardInteger = () => {
    if (!userReward || !userReward[0].rewards_info.length) return "0";
    return Math.floor(Number(userReward[0].rewards_info[1].amount) / Math.pow(10, 6) || 0)
  }

  const getARTSRewardFraction = () => {
    if (!userReward || !userReward[0].rewards_info.length) return "00";
    return ((Number(userReward[0].rewards_info[1].amount) % Math.pow(10, 6) || 0) / Math.pow(10, 6)).toString().slice(2)
  }

  const getLOOPRewardInteger = () => {
    if (!userReward || !userReward[0].rewards_info.length) return "0";
    return Math.floor(Number(userReward[0].rewards_info[0].amount) / Math.pow(10, 6) || 0)
  }

  const getLOOPRewardFraction = () => {
    if (!userReward || !userReward[0].rewards_info.length) return "00";
    return ((Number(userReward[0].rewards_info[0].amount) % Math.pow(10, 6)) / Math.pow(10, 6)).toString().slice(2)
  }

  const getTotalRewardInteger = () => {
    if (!userLpValue) return "0"
    return Math.floor(userLpValue / Math.pow(10, 6))
  }

  const getTotalRewardFraction = () => {
    if (!userLpValue) return "00"
    return ((userLpValue % Math.pow(10, 6)) / Math.pow(10, 6)).toString().slice(2)
  }

  return (
    <>
      
      <div className='nftMain'>
        {
          (farmResponse || farmError) && (
            <FarmWait response={farmResponse} error={farmError} onConfirm={closeFarmResponse} onTryAgain={farmTryAgain} onCancel={farmCancel} />
          )
        }
        {
          (unFarmResponse || unFarmError) && (
            <UnFarmWait response={unFarmResponse} error={unFarmError} onConfirm={closeUnFarmResponse} onTryAgain={unFarmTryAgain} onCancel={unFarmCancel} />
          )
        }
        <NftHeader handleSidebar={handleSidebar} />
        <div className={sidebarActive ? 'sidebarActiveBg' : ''}>
          <div className='bgSet'>
          <div className="container" id='farming-page'>
            <div className="farm-heading">
              <p className="farm-heading-title">Farming</p>
              <p className='farm-head-sub' >Loop Finance has a 7 day wait period to access rewards on this pool. This period starts each time you farm, and rewards will be forfeited when withdrawing before this period ends.</p>
            </div>

            <div className="farm-row">
              <div className="farm-col-stats">

                <div className="left-divs">
                  <div className="" style={{ display: 'flex' }}>
                    <p className="small-head">APY &nbsp;</p>
                    <ReactTooltip effect='solid' place='top' type='light' multiline textColor="white" backgroundColor="rgba(2, 2, 16)" className="tooltip" />
                    <span data-tip="This farming APY is derived from the current tx fees + farm rewards. It is assumed the user will manually compound rewards every week. Loop will be providing an option to users to enable auto daily compounding of rewards in the near future.">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM9 4C9 4.26522 8.89464 4.51957 8.70711 4.70711C8.51957 4.89464 8.26522 5 8 5C7.73478 5 7.48043 4.89464 7.29289 4.70711C7.10536 4.51957 7 4.26522 7 4C7 3.73478 7.10536 3.48043 7.29289 3.29289C7.48043 3.10536 7.73478 3 8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4ZM7 7C6.73478 7 6.48043 7.10536 6.29289 7.29289C6.10536 7.48043 6 7.73478 6 8C6 8.26522 6.10536 8.51957 6.29289 8.70711C6.48043 8.89464 6.73478 9 7 9V12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H9C9.26522 13 9.51957 12.8946 9.70711 12.7071C9.89464 12.5196 10 12.2652 10 12C10 11.7348 9.89464 11.4804 9.70711 11.2929C9.51957 11.1054 9.26522 11 9 11V8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7H7Z" fill="#E6DBDB" fillOpacity="0.75" />
                      </svg>
                    </span>
                  </div>
                  <p className="figure nomargin">{getARTSAPY()}</p>
                </div>

                <div className="left-divs">
                  <div className="" style={{ display: 'flex' }}>
                    <p className="small-head" >your rewards &nbsp;</p>
                    {/* <ReactTooltip effect='solid' place='top' type='light' multiline textColor="white" backgroundColor="rgba(2, 2, 16)" className="tooltip" /> */}
                    <span data-tip="The total rewards you have earned by farming your ARTS tokens.">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM9 4C9 4.26522 8.89464 4.51957 8.70711 4.70711C8.51957 4.89464 8.26522 5 8 5C7.73478 5 7.48043 4.89464 7.29289 4.70711C7.10536 4.51957 7 4.26522 7 4C7 3.73478 7.10536 3.48043 7.29289 3.29289C7.48043 3.10536 7.73478 3 8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4ZM7 7C6.73478 7 6.48043 7.10536 6.29289 7.29289C6.10536 7.48043 6 7.73478 6 8C6 8.26522 6.10536 8.51957 6.29289 8.70711C6.48043 8.89464 6.73478 9 7 9V12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H9C9.26522 13 9.51957 12.8946 9.70711 12.7071C9.89464 12.5196 10 12.2652 10 12C10 11.7348 9.89464 11.4804 9.70711 11.2929C9.51957 11.1054 9.26522 11 9 11V8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7H7Z" fill="#E6DBDB" fillOpacity="0.75" />
                      </svg>
                    </span>
                  </div>
                  <div className="stats-row first" >

                    <img src={RewardIconBig} />
                    <div className="texts">
                      <p className="figure">{getARTSRewardInteger()}.<span>{getARTSRewardFraction()}</span></p>
                      <span className="sub">ARTS</span>
                    </div>
                  </div>
                  <div className="stats-row" >
                    <img src={UstIconBig} />
                    <div className="texts">
                      <p className="figure">{getLOOPRewardInteger()}.<span>{getLOOPRewardFraction()}</span></p>
                      <span className="sub">LOOP</span>
                    </div>
                  </div>
                </div>

                <div className="left-divs">
                  <div className="stats-row">
                    <p className="small-head">total value &nbsp;</p>
                    {/* <ReactTooltip effect='solid' place='top' type='light' multiline textColor="white" backgroundColor="rgba(2, 2, 16)" className="tooltip" /> */}
                    <span data-tip="The UST value of your farm position + total rewards earned.">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM9 4C9 4.26522 8.89464 4.51957 8.70711 4.70711C8.51957 4.89464 8.26522 5 8 5C7.73478 5 7.48043 4.89464 7.29289 4.70711C7.10536 4.51957 7 4.26522 7 4C7 3.73478 7.10536 3.48043 7.29289 3.29289C7.48043 3.10536 7.73478 3 8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4ZM7 7C6.73478 7 6.48043 7.10536 6.29289 7.29289C6.10536 7.48043 6 7.73478 6 8C6 8.26522 6.10536 8.51957 6.29289 8.70711C6.48043 8.89464 6.73478 9 7 9V12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H9C9.26522 13 9.51957 12.8946 9.70711 12.7071C9.89464 12.5196 10 12.2652 10 12C10 11.7348 9.89464 11.4804 9.70711 11.2929C9.51957 11.1054 9.26522 11 9 11V8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7H7Z" fill="#E6DBDB" fillOpacity="0.75" />
                      </svg>
                    </span>
                  </div>
                  <div className="stats-row">
                    <img src={UstIcon} width={32} />

                    <div className="texts">

                      <p className='figure'>{getTotalRewardInteger()}.<span>{getTotalRewardFraction()}</span></p>
                      <span className="sub">UST</span>
                    </div>
                  </div>
                </div>

                <div className="">

                </div>
              </div>

              <div className="tab-wrapper">

                <div className='form-tabs'>
                  <button className={`button ${tabStatus === "farm" ? "active-button" : "" }`} onClick={()=>changeTab("farm")}>
                    Farm
                  </button>
                  <button className={`button ${tabStatus === "unfarm" ? "active-button" : "" }`} onClick={()=>changeTab("unfarm")}>
                    UnFarm
                  </button>
                </div>

                <div className="tab-content-wrapper">
                  <div className={`tab-content ${tabStatus === "farm" ? "" : "d-none"}`} id="">

                    <div className="">
                      <div className="tab-content-row">
                        <div className="farm-form-text">
                          {`Balance: ${balances.uusd || "0.00"} UST`}
                        </div>
                        <div className="farm-form-text">
                          {/* <ReactTooltip effect='solid' place='top' type='light' multiline textColor="white" backgroundColor="rgba(2, 2, 16)" className="tooltip" /> */}
                          <span data-tip="Coming Soon">
                            <a className="colored">+Add Balance</a>
                          </span>
                          {/* <span><a className="colored" href="https://ramp.kado.money/" target="_blank">+Add Balance</a></span> */}
                        </div>
                      </div>
                      <div className="input-box">
                        <span ><img src={UstIcon} /><span>UST</span></span>
                        <input type="text" placeholder='0.00' value={uusdAmount} onChange={e => onChangeUusdAmount(e.target.value)} disabled={pair === undefined} />
                        <button onClick={onChangeMaxAmount}>max</button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px', }}>
                      <div className="round-button">
                        <img src={plusIcon} />
                      </div>

                    </div>

                    <div className="input-box-2">
                      <span ><img src={RewardIcon} /><span>ARTS</span></span>
                      <input type="text" placeholder='0.00' value={tokenAmount} onChange={e => onChangeTokenAmount(e.target.value)} disabled={pair === undefined} />
                      <button onClick={() => onChangeTokenAmount(balances.arts)}>max</button>
                    </div>

                    <div >
                      <button className="farm-button" onClick={handleFarm} disabled={notEnoughBalance || noAmount}>
                        <img src={FarmIcon} /> Farm
                      </button>

                      <p className="farm-form-text">Estimated Reward: <span className="white">{getARTSAPY()}</span></p>
                    </div>
                  </div>
                  <div className={`tab-content ${tabStatus === "unfarm" ? "" : "d-none"}`} id="">
                  {
                    Number(userStaked) > 0 && userStakedTime && (Date.now() / 1000 - Number(userStakedTime)) < 604800 ? 
                    <>
                      <div className="flex-line mb-18 ml-2">
                        <img src={unFarmWarn} />
                        <span className="farm-form-text mt-0 ml-10 warn-text">Your min 1 week farming period is not over.<br />Unfarm without rewards?</span>
                      </div>
                      <div className="time-left-div">
                        <div className="background" />
                        <span>Time Left</span>
                        <div className="flex-line">
                          <img src={TimerIcon} alt="timer-icon" className="mr-5" />
                          <span className="text-primary">{leftTime ? getLeftTime("d") : "--"}<span className="text-white">D &middot; </span>{leftTime ? `${getLeftTime("h")}:${getLeftTime("m")}:${getLeftTime("s")}` : "--:--:--"}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                          <span className="farm-form-text">Balance : </span>
                          <span className="farm-form-text text-white">{userStaked ? (userStaked / Math.pow(10, 6)).toFixed(2) : "0.00"} </span>
                          <span className="farm-form-text">UST-ARTS LP</span>
                      </div>
                      <div className="input-box-2 mb-0">
                        <span ><img src={RewardIcon} /><span>LP</span></span>
                        <input type="text" placeholder='0.00' value={userStaked ? (userStaked / Math.pow(10, 6)).toString() : "0.00"} onChange={e => onChangeLpAmount(e.target.value)} disabled />
                        <button onClick={onChangeLPMax}>max</button>
                      </div>
                      <div className="mb-32">
                        <div className="tab-content-row">
                          <div className="farm-form-text mt-10">
                            Value: <span className="farm-form-text text-white">{(userLpValue / Math.pow(10, 6)).toFixed(2) || "0.00"} UST</span>
                          </div>
                          <div className="farm-form-text mt-10">
                            <span className="farm-form-text mt-10">Tax fee: </span>
                            <span className="farm-form-text mt-10"><span className="farm-form-text text-white">~{"0.10"}</span> UST</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-line mb-16 length-limited">
                        <label className="checkbox">
                          <input type="checkbox" className="checkbox" checked={unstakeEverything} onChange={switchUnstakeEverything} />
                        </label>
                        <span className="farm-form-text mt-0 ml-10">I am sure I want to unstake everything without rewards.</span>
                      </div>
                      <div>
                        <button className="farm-button" onClick={handleUnFarm} disabled={!unstakeEverything}>
                          <img src={unFarmIcon} /> UnFarm 
                        </button>

                      </div>
                    </> :
                    <>
                      {
                        connectedWallet && Number(userStaked) ? 
                        <div className="flex-line mt-36 mb-32">
                            <img src={unFarmNotify} />
                            <span className="farm-form-text mt-0 ml-10 notify-text">Your min 1 week farming period is over.<br />Unfarm everything with rewards?</span>
                        </div> :
                        <></>
                      }
                      <div className="mb-4">
                          <span className="farm-form-text">Balance : </span>
                          <span className="farm-form-text text-white">{userStaked ? (userStaked / Math.pow(10, 6)).toFixed(2) : "0.00"} </span>
                          <span className="farm-form-text">UST-ARTS LP</span>
                      </div>
                      <div className="input-box-2 mb-0">
                        <span ><img src={RewardIcon} /><span>UA LP</span></span>
                        <input type="text" placeholder='0.00' value={userStaked ? (userStaked / Math.pow(10, 6)).toString() : "0.00"} onChange={e => onChangeLpAmount(e.target.value)} disabled />
                        <button onClick={onChangeLPMax}>max</button>
                      </div>
                      <div className="mb-32">
                        <div className="tab-content-row">
                          <div className="farm-form-text mt-10">
                            Value: <span className="farm-form-text text-white">{(userLpValue / Math.pow(10, 6)).toFixed(2) || "0.00"} UST</span>
                          </div>
                          <div className="farm-form-text mt-10">
                            <span className="farm-form-text mt-10">Tax fee: </span>
                            <span className="farm-form-text mt-10"><span className="farm-form-text text-white">~{"0.00"}</span> UST</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button className="farm-button" onClick={handleUnFarm} disabled={notEnoughBalance || noAmount}>
                          <img src={unFarmIcon} /> UnFarm 
                        </button>

                      </div>
                    </>
                  }
                  </div>

                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        <NftFooter />
      </div>
    </>
  );
};

export default NftWelcome;
