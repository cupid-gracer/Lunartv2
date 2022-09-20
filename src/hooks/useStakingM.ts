import React, { useMemo, Context,ContextType,createContext,useContext,useEffect} from 'react';
import { useQuery } from 'react-query';
import { LCDClient, Account, Coins } from '@terra-money/terra.js';
import { useWallet, useConnectedWallet, NetworkInfo, WalletStatus, ConnectType, } from '@terra-money/wallet-provider';
import { Network, DEFAULT_NETWORK, SupportedCoins, SupportedTokens, DENOM_UNIT, } from 'core/constants';
import { ContractAddressMap, LOOP_UST_FARM, LOOP_UST_POOL, LOOPR_UST_POOL, LOOP_STAKING_POOL, ARTS_UST_POOL, ARTS_UST_FARM } from 'core/contracts';
import useBalance from './useBalance';
import usePair from './usePair';
import axios from 'axios';
import { _months } from '../pages/Staking/staking_utils';

import { useTerraWebapp } from './context';

const useStakingM = (_month: _months) => {
    const month_index = _month == 3 ? "3M" : _month == 12 ? "12M" : "18M"; 
    const { network, uusdLOOPPairInfo, tokenLOOPPairInfo, networkType, address, client, balances} = useTerraWebapp();

    const LOOPPrice:number = Number(uusdLOOPPairInfo?.amount) / Number(tokenLOOPPairInfo?.amount) || 0;
    const { data: stakingData } = useQuery(
        ['stakingData'],
        async () => {
        return await axios.get('https://middlewareapi.loop.markets/v1/contracts/stakingData').then((res: any) => {
            return res.data
        })
        },
        {refetchInterval: 300000}
    )


    const stakingPools = LOOP_STAKING_POOL[networkType];

    const { data: stakingMUserStaking } = useQuery(
        ['staking' + _month + 'MUserStaking', address, network.chainID],
        async () => {
          if (!address || !stakingPools) return undefined;
          return await client.wasm.contractQuery(stakingPools[month_index], {
            "query_staked_by_user": {
              "wallet": address
            }
          })
        },
        {refetchInterval: 10000}
    )


    const { data: stakingMUserReward } = useQuery(
        ['staking' + _month + 'MUserReward', address, network.chainID],
        async () => {
          if (!address || !stakingPools) return "0";
          return await client.wasm.contractQuery(stakingPools[month_index], {
            "query_user_reward": {
              "wallet": address
            }
          })
        },
    )

    const { data: stakingMUserStakedTime } = useQuery(
        ['staking' + _month + 'MUserStakedTime', address, network.chainID],
        async ()  => address ? await client.wasm.contractQuery<number>(stakingPools[month_index], {
          "query_user_staked_time":{
            "wallet": address
          }
        }) : undefined,
        {refetchInterval: 10000}
    )
    // inside
    const { data: stakingMTotalStaking } = useQuery(
        ['staking' + _month + 'MTotalStaking', network.chainID],
        async () => {
          return await client.wasm.contractQuery(stakingPools[month_index], {
            "query_total_staked": {}
          })
        },
        {refetchInterval: 60000}
    )
    //inside
    const { data: stakingMTotalDailyReward } = useQuery(
        ['staking' + _month + 'MTotalDailyReward', network.chainID],
        async () => {
          return await client.wasm.contractQuery(stakingPools[month_index], {
            "query_total_daily_reward": {}
          })
        }
    )
    //inside
    const { data: stakingMLastDistributionTime } = useQuery(
    ['staking' + _month + 'MLastDistributionTime', network.chainID],
    async () => {
        return await client.wasm.contractQuery(stakingPools[month_index], {
        "query_last_distribution_time": {}
        })
    }
    )
    const { data: stakingMUserNextReward } = useQuery(
        ['staking' + _month + 'MUserNextReward', address, network.chainID],
        () => {
          if (!address || !stakingMUserStaking || !stakingMTotalStaking || !stakingMTotalDailyReward || !stakingMLastDistributionTime || !stakingMUserStakedTime) {
            return "0";
          }
          const timePeriod = Math.floor(Date.now() / 1000) - Number(Number(stakingMLastDistributionTime) > Number(stakingMUserStakedTime) ? stakingMLastDistributionTime : stakingMUserStakedTime);
          return (Math.floor(Number(stakingMUserStaking) / Number(stakingMTotalStaking) * Number(stakingMTotalDailyReward) * timePeriod / 86400)).toString();
        },
        {refetchInterval: 1000}
    )
    const { data: stakingMUserLeftTime } = useQuery(
        ['staking' + _month + 'MUserLeftTime', address, network.chainID],
        () => {
          if (!address || !stakingMUserStakedTime) {
            return 0;
          }
          const currentTime = Date.now() / 1000;
          const endTime = Number(stakingMUserStakedTime) + 86400 * _month * 30;
          return endTime - currentTime;
        },
        {refetchInterval: 1000}
    )
    const getStaking3MNextReward = () => {
    if (!address || !stakingMUserStaking || !stakingMTotalStaking || !stakingMTotalDailyReward || !stakingMLastDistributionTime) {
        return "0";
    }
    const timePeriod = Math.floor(Date.now() / 1000) - Number(Number(stakingMLastDistributionTime) > Number(stakingMUserStakedTime) ? stakingMLastDistributionTime : stakingMUserStakedTime);
    return (Math.floor(Number(stakingMUserStaking) / Number(stakingMTotalStaking) * Number(stakingMTotalDailyReward) * timePeriod / 86400)).toString();
    }

   
    
    return {LOOPPrice, stakingData, stakingPools, stakingMUserStaking, stakingMUserReward, stakingMUserStakedTime, stakingMLastDistributionTime, stakingMUserNextReward, stakingMUserLeftTime, balances, address,  networkType }
};

export default useStakingM
