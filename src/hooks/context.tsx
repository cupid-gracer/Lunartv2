import React, {
  useMemo,
  Context,
  ContextType,
  createContext,
  useContext,
  useEffect
} from 'react';
import { useQuery } from 'react-query';
import { LCDClient, Account, Coins } from '@terra-money/terra.js';
import {
  useWallet,
  useConnectedWallet,
  NetworkInfo,
  WalletStatus,
  ConnectType,
} from '@terra-money/wallet-provider';

import {
  Network,
  DEFAULT_NETWORK,
  SupportedCoins,
  SupportedTokens,
  DENOM_UNIT,
} from 'core/constants';
import { ContractAddressMap, LOOP_UST_FARM, LOOP_UST_POOL, LOOPR_UST_POOL, LOOP_STAKING_POOL, ARTS_UST_POOL, ARTS_UST_FARM } from 'core/contracts';
import useBalance from './useBalance';
import usePair from './usePair';
import axios from 'axios';

// refetch every 5 seconds
const REFETCHTIME = 3000;

type TerraWebapp = {
  network: NetworkInfo;
  networkType: Network;
  status: WalletStatus;
  address: string;
  client: LCDClient;
  accountInfo: Account | undefined;
  isConnected: boolean;
  balances: Record<string, string>;
  pair: any,
  pairAddress: string;
  uusdPairInfo: any,
  tokenPairInfo: any,
  uusdLOOPPairInfo: any,
  tokenLOOPPairInfo: any,
  uusdLOOPRPairInfo: any,
  tokenLOOPRPairInfo: any,
  tradingData: any,
  connect: (type: ConnectType, identifier?: string) => void;
  disconnect: () => void;
};  

export const TerraWebappContext: Context<TerraWebapp> =
  createContext<TerraWebapp>({
    network: DEFAULT_NETWORK,
    networkType: Network.MAINNET,
    status: WalletStatus.WALLET_NOT_CONNECTED,
    address: '',
    client: new LCDClient({
      URL: DEFAULT_NETWORK.lcd,
      chainID: DEFAULT_NETWORK.chainID,
    }),
    accountInfo: undefined,
    isConnected: false,
    balances: {},
    pair: undefined,
    pairAddress: "",
    uusdPairInfo: undefined,
    tokenPairInfo: undefined,
    uusdLOOPPairInfo: undefined,
    tokenLOOPPairInfo: undefined,
    uusdLOOPRPairInfo: undefined,
    tokenLOOPRPairInfo: undefined,
    tradingData: undefined,
    connect: (type: ConnectType, identifier?: string) => null,
    disconnect: () => null,
  });

export const TerraWebappProvider: React.FC = ({ children }) => {
  const { network, status, connect, disconnect } = useWallet();
  const networkType =
    network.name === 'mainnet' ? Network.MAINNET : Network.TESTNET;

  const connectedWallet = useConnectedWallet();
  const address = connectedWallet?.terraAddress || '';

  const client = useMemo(() => {
    return new LCDClient({
      URL: network.lcd,
      chainID: network.chainID,
    });
  }, [network]);

  const { data: balanceData } = useQuery(
    ['balances', network.chainID, address],
    () => address ? client.bank.balance(address) : undefined,
    {refetchInterval: REFETCHTIME}
  );

  let balances = {};
  if (balanceData?.length && balanceData[0] instanceof Coins) {
    const coinBalances = Object.values(SupportedCoins).reduce(
      (prev, symbol) => ({
        ...prev,
        [symbol]: (
          (balanceData[0].get(symbol)?.amount.toNumber() || 0) / DENOM_UNIT
        ).toFixed(1),
      }),
      {}
    );
    balances = { ...coinBalances };
  }
  const tokenBalances = Object.values(SupportedTokens).reduce(
    (prev, symbol) => ({
      ...prev,
      [symbol]: useBalance(
        ContractAddressMap[networkType][symbol],
        address,
        client
      ),
    }),
    {}
  );
  balances = { ...balances, ...tokenBalances };
  const pair = usePair(ARTS_UST_POOL[networkType], client);
  const LOOPPair = usePair(LOOP_UST_POOL[networkType], client);
  const LOOPRPair = usePair(LOOPR_UST_POOL[networkType], client);
  const pairAddress = ARTS_UST_POOL[networkType];
  const uusdIndex = pair?.assets[0].info?.native_token?.denom === "uusd" ? 0 : 1;
  const uusdPairInfo = pair?.assets[uusdIndex];
  const tokenPairInfo = pair?.assets[(uusdIndex + 1) % 2];
  const uusdLOOPIndex = LOOPPair?.assets[0].info?.native_token?.denom === "uusd" ? 0 : 1;
  const uusdLOOPPairInfo = LOOPPair?.assets[uusdLOOPIndex]
  const tokenLOOPPairInfo = LOOPPair?.assets[(uusdLOOPIndex + 1) % 2];
  const uusdLOOPRPairIndex = LOOPRPair?.assets[0].info?.native_token?.denom === "uusd" ? 0 : 1;
  const uusdLOOPRPairInfo = LOOPRPair?.assets[uusdLOOPRPairIndex];
  const tokenLOOPRPairInfo = LOOPRPair?.assets[(uusdLOOPRPairIndex + 1) % 2];

  const { data: accountInfo } = useQuery(
    ['accountInfo', network.chainID, address],
    () => address ? client.auth.accountInfo(address) : undefined,
    {refetchInterval: REFETCHTIME}
  );

  const { data: tradingData } = useQuery(
    ['traidingData'],
    () => {
      return axios.get('https://middlewareapi.loop.markets/v1/contracts/tradingData').then((res: any) => {
        return res
      })
    },
    {refetchInterval: 60000}
  )

  

  const contextValue = {
    network,
    networkType,
    status,
    address,
    client,
    accountInfo,
    isConnected: status === WalletStatus.WALLET_CONNECTED,
    balances,
    pair,
    pairAddress,
    uusdPairInfo,
    tokenPairInfo,
    uusdLOOPPairInfo,
    tokenLOOPPairInfo,
    uusdLOOPRPairInfo,
    tokenLOOPRPairInfo,
    tradingData,
    connect,
    disconnect,
  };

  return (
    <TerraWebappContext.Provider value={contextValue}>
      {children}
    </TerraWebappContext.Provider>
  );
};

export const useTerraWebapp = (): ContextType<typeof TerraWebappContext> =>
  useContext(TerraWebappContext);
