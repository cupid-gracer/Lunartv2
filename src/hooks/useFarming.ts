import React, { useMemo, Context,ContextType,createContext,useContext,useEffect} from 'react';
import { useTerraWebapp } from './context';

import { useQuery } from 'react-query';
import { LCDClient, Account, Coins } from '@terra-money/terra.js';
import { useWallet, useConnectedWallet, NetworkInfo, WalletStatus, ConnectType, } from '@terra-money/wallet-provider';
import { Network, DEFAULT_NETWORK, SupportedCoins, SupportedTokens, DENOM_UNIT, } from 'core/constants';
import { ContractAddressMap, LOOP_UST_FARM, LOOP_UST_POOL, LOOPR_UST_POOL, LOOP_STAKING_POOL, ARTS_UST_POOL, ARTS_UST_FARM } from 'core/contracts';
import useBalance from './useBalance';
import usePair from './usePair';
import axios from 'axios';


type Denom = string;
type Amount = string;
type GasPrices = Record<Denom, Amount>;
const REFETCHTIME = 3000;

const useFarming = () => {
    let suserReward : any;
    const { network, networkType, client, pairAddress, address } = useTerraWebapp();
    const { data: totalLp } = useQuery(
        ['totalLp', network.chainID],
        () => {
          return client.wasm.contractQuery<any>(uLP, {
            "token_info":{}
          }).then((res: any) => res?.total_supply)
        },
        {refetchInterval: REFETCHTIME}
      )

    const { data: ustOfPair } = useQuery(
        ['ustOfLp', network.chainID],
        () => {
          return client.bank.balance(pairAddress).then((res: any) => {
            return res[0]?.get('uusd')?.amount.toNumber()
          })
        },
        {refetchInterval: REFETCHTIME}
      )
      
    const uLP:string            = ContractAddressMap[networkType].ARTSuLP;
    const farm:string           = ARTS_UST_FARM[networkType]?.contract;
    const uLF:string            = ARTS_UST_FARM[networkType]?.uLF;
    const { data: userStaked } = useQuery(
        ['userStaked', network.chainID, address, uLP],
        () => address ? client.wasm.contractQuery<number>(farm, {
          "query_staked_by_user":{
            "wallet": address,
            "staked_token": uLP
          }
        }) : undefined,
        {refetchInterval: REFETCHTIME}
    )
    const userLpValue:number    = (totalLp && userStaked && ustOfPair) ? Math.floor(userStaked / totalLp * ustOfPair * 2) : 0;
    const { data: remainTime } : any = useQuery(
        ['remainTime', network.chainID],
        () => {
          if (!userStakedTime) return undefined;
          const currentTime = Math.floor(Date.now() / 1000);
          let _remainTime = 604800 - (currentTime - Number(userStakedTime));
          if (_remainTime < 0) _remainTime = 0;
          return _remainTime;
        },
        {refetchInterval: 1000}
    );
    const { data: tradingData }  :any = useQuery(
        ['traidingData'],
        () => {
          return axios.get('https://middlewareapi.loop.markets/v1/contracts/tradingData').then((res: any) => {
            return res
          })
        },
        {refetchInterval: 60000}
    )
    const { data: userReward } :any = useQuery(
        ['userReward', network.chainID, address],
        () => {
          return client.wasm.contractQuery(farm, {
            "query_user_reward_in_pool": {
              "wallet": address,
              "pool": {
                "token": {
                  "contract_addr": uLP
                }
              }
            }
          })
        },
        {refetchInterval: 60000}
    )
    const { data: userStakedTime } = useQuery(
        ['userStakedTime', network.chainID, address, uLP],
        () => address ? client.wasm.contractQuery<number>(farm, {
          "query_user_staked_time":{
            "wallet": address,
            "pool": uLP
          }
        }) : undefined,
        {refetchInterval: REFETCHTIME}
      )

    return {uLP, farm, uLF, userLpValue, remainTime, tradingData, userReward, userStaked, userStakedTime};
};



export default useFarming
