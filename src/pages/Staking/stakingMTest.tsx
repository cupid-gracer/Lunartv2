import { useState, FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { MsgExecuteContract } from '@terra-money/terra.js';
import { useTerraWebapp } from 'hooks/context';
import { PostError } from '../Nft/NftHeader';
import Modal from '../../components/Modal';
import RewardIcon from '../../assets/icons/rewards.svg'
import { approve, farm_staking } from 'utils/msgGenerator';
import unFarmWarn from '../../assets/icons/unFarmWarn.svg';
import timeLeft from '../../assets/images/time-left.png';
import StakeWait from 'components/StakeWait';
import { _months } from './staking_utils';
import './staking.scss'
import { ContractAddressMap } from 'core/contracts';
import { isDotDotDotToken } from 'typescript';

import useStaking from '../../hooks/useStakingM';

interface Props {
  _month: _months;
}

let i = 0;
const StakingMTest: React.FC = (props: any) => {
  const { network, client, balances, address, networkType} = useTerraWebapp();
  const {stakingData, LOOPPrice, stakingPools} = useStaking(_months.M3);
  const fetch_interval_time = 1000;
  // console.log('staking child component');
  const [test, setTest] = useState(0);
  useEffect(()=>{
    // setTest(()=>test+1);
  },[ balances, network, client, stakingData, LOOPPrice, stakingPools, address, networkType ]);
  // setTest();
  // const { data: stakingMUserStaking } =  useQuery(
  //   ['stakingMUserStaking', address, network.chainID],
  //    async () => {
  //     if (!address || !stakingPools) return undefined;
  //      return await client.wasm.contractQuery(stakingPools[month_index], {
  //       "query_staked_by_user": {
  //         "wallet": address
  //       }
  //     })
  //   },
  //   {refetchInterval: fetch_interval_time}
  // )



  // const { data: stakingMUserReward }  = useQuery(
  //   ['stakingMUserReward', address, network.chainID],
  //   async () => {
  //     if (!address || !stakingPools) return "0";
  //     return await client.wasm.contractQuery(stakingPools[month_index], {
  //       "query_user_reward": {
  //         "wallet": address
  //       }
  //     })
  //   },
  // )

  // const { data: stakingMTotalStaking  } = useQuery(
  //   ['stakingMTotalStaking', network.chainID],
  //   async () => {
  //     return await client.wasm.contractQuery(stakingPools[month_index], {
  //       "query_total_staked": {}
  //     })
  //   },
  //   {refetchInterval: fetch_interval_time}
  // )


  // const { data: stakingMTotalDailyReward } = useQuery(
  //   ['stakingMTotalDailyReward', network.chainID],
  //   async () => {
  //     return await client.wasm.contractQuery(stakingPools[month_index], {
  //       "query_total_daily_reward": {}
  //     })
  //   }
  // )

  // const { data: stakingMLastDistributionTime } = useQuery(
  //   ['stakingMLastDistributionTime', network.chainID],
  //   async () => {
  //     return await client.wasm.contractQuery(stakingPools[month_index], {
  //       "query_last_distribution_time": {}
  //     })
  //   }
  // )

  // const { data: stakingMUserStakedTime } = useQuery(
  //   ['stakingMUserStakedTime', address, network.chainID],
  //   async () => address ? await client.wasm.contractQuery<number>(stakingPools[month_index], {
  //     "query_user_staked_time":{
  //       "wallet": address
  //     }
  //   }) : undefined,
  //   {refetchInterval: fetch_interval_time}
  // )




  
  // const { data: stakingMUserNextReward } = useQuery(
  //   ['stakingMUserNextReward', address, network.chainID],
  //   () => {
  //     if (!address || !stakingMUserStaking || !stakingMTotalStaking || !stakingMTotalDailyReward || !stakingMLastDistributionTime || !stakingMUserStakedTime) {
  //       return "0";
  //     }
  //     const timePeriod = Math.floor(Date.now() / 1000) - Number(Number(stakingMLastDistributionTime) > Number(stakingMUserStakedTime) ? stakingMLastDistributionTime : stakingMUserStakedTime);
  //     return (Math.floor(Number(stakingMUserStaking) / Number(stakingMTotalStaking) * Number(stakingMTotalDailyReward) * timePeriod / 86400)).toString();
  //   },
  //   {refetchInterval: fetch_interval_time}
  // )

  
  // const { data: stakingMUserLeftTime }  = useQuery(
  //   ['stakingMUserLeftTime', address, network.chainID],
  //   () => {
  //     if (!address || !stakingMUserStakedTime) {
  //       return 0;
  //     }
  //     const currentTime = Date.now() / 1000;
  //     const endTime = Number(stakingMUserStakedTime) + 86400 * 90;
  //     return endTime - currentTime;
  //   },
  //   {refetchInterval: fetch_interval_time}
  // )




  
  
  
  // const stakingDataM = stakingData? stakingData["staking"+_month+"Months"] : undefined;
  // const userStaked = (Number(stakingMUserStaking) / Math.pow(10, 6) || 0).toString()
  // const connectedWallet = useConnectedWallet()

  // const [stakeModal, setStakeModal] = useState<boolean>(false);
  // const [notEnoughBalance, setNotEnoughBalance] = useState<boolean>(false);
  // const [stakeAmount, setStakeAmount] = useState<string>("");
  // const [stakingResponse, setStakingResponse] = useState<any>();
  // const [stakingError, setStakingError] = useState<PostError>();
  // const [unstakeModal, setUnstakeModal] = useState<boolean>(false);
  // const [unstakeAmount, setUnstakeAmount] = useState<string>("");
  // const [unstakeConfirmed, setUnstakeConfirmed] = useState(false);

  
  








  // const closeStakeModal = () => {
  //   setStakeModal(false);
  //   setStakeAmount("");
  //   setNotEnoughBalance(false);
  // }

  // const closeUnstakeModal = () => {
  //   setUnstakeModal(false);
  //   setUnstakeAmount("");
  //   setNotEnoughBalance(false);
  // }

  // const onChangeStakeAmount = (value: string) => {
  //   setStakeAmount(value);
  //   if(value == "" || Number(value) <= 0){
  //     setNotEnoughBalance(true);
  //     return;
  //   }
  //   if (Number(value) > Number(balances.loop) ) setNotEnoughBalance(true);
  //   if(Number(value) <= Number(balances.loop) ) setNotEnoughBalance(false);
  // }

  // const onChangeUnstakeAmount = (value: string) => {
  //   setUnstakeAmount(value);
  //   if(value == "" || Number(value) <= 0){
  //     setNotEnoughBalance(true);
  //     return;
  //   }
  //   if (Number(value) > Number(balances.loop)) setNotEnoughBalance(true);
  //   if(Number(value) <= Number(balances.loop)) setNotEnoughBalance(false);
  // }

  // const closeStakingResponse = () => {
  //   setStakeAmount("");
  //   setStakingResponse(undefined);
  //   setStakingError(undefined);
  // }

  // const stakingTryAgain = () => {
  //   handleStake();
  // }

  // const handleStake = async () => {
  //   const stakingAddr = stakingPools[month_index];
  //   const tokenAddr = ContractAddressMap[networkType].loop;
  //   // const tokenAddr = tokenPairInfo.info.token.contract_addr;
  //   const msgs: MsgExecuteContract[] = [];
  //   const _stakeAmount = (Math.floor(Number(stakeAmount) * Math.pow(10, 6))).toString();
  //   msgs.push(approve(address, tokenAddr, _stakeAmount, stakingAddr));
  //   msgs.push(farm_staking(address, tokenAddr, _stakeAmount, stakingAddr));
  //   try {
  //     if (connectedWallet) {
  //       const response = await connectedWallet.post({
  //         msgs: msgs
  //       });
  //       setStakingResponse(response);
  //       setStakeModal(false);
  //       setStakeAmount("");
  //     }
  //   } catch (error) {
  //     setStakingError(error as Error)
  //   }
  // }
  
  // const userConfirmed = (status: string) => {
  //   setUnstakeConfirmed(false);
  // }

  // const getLeftTime = () => {
  //   const __stakingMUserLeftTime = stakingMUserLeftTime || 0
  //   const month = Math.floor(__stakingMUserLeftTime / (86400 * 30))
  //   const day = Math.floor((__stakingMUserLeftTime % (86400 * 30)) / 86400)
  //   const hour = Math.floor((__stakingMUserLeftTime % 86400) / 3600)
  //   const minute = Math.floor((__stakingMUserLeftTime % 3600) / 60)
  //   const second = Math.floor(__stakingMUserLeftTime % 60)
  //   return (
  //     <span className="text-primary">
  //       <img src={timeLeft} className="mr-5" />{month}<span className="text-white"> M </span>{day}<span className="text-white"> D </span>{`${hour}:${minute}:${second}`}
  //     </span>
  //   )
  // }

  return (
    <section className="staking-form">
      <p>{test}</p>
      <p>{i++}</p>
    </section>
  );
};

export default StakingMTest;
