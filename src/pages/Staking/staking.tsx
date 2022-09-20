import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { MsgExecuteContract } from '@terra-money/terra.js';
import { useTerraWebapp, TerraWebappContext } from 'hooks/context';
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';
import Modal from '../../components/Modal';
import RewardIcon from '../../assets/icons/rewards.svg'
import { Helmet } from 'react-helmet';
import { approve, provide_liquidity, farm_staking } from 'utils/msgGenerator';
import './staking.scss'
import unFarmWarn from '../../assets/icons/unFarmWarn.svg';
import timeLeft from '../../assets/images/time-left.png';
import { _months } from './staking_utils';
import StakingM from './stakingM';

import useStaking from '../../hooks/useStakingM';
const Staking: React.FC = (props: any) => {
  const [sidebarActive, setSidebar] = useState(false);

  const handleSidebar = (status: any) => {
    setSidebar(status);
  };


  return (
    <>
      <div className='staking-page'>
        <NftHeader handleSidebar={handleSidebar} />
        <div className={sidebarActive ? 'sidebarActiveBg' : ''}>
          <div className='bgSet'>
            <div className='container'>
              <div className="farm-heading"><p className="farm-heading-title">Staking</p><p className="farm-head-sub">Stake your Arts tokens and let them compund automatically</p></div>
              <div className='stakingSet'>
                {StakingM(_months.M18)}
                {StakingM(_months.M12)}
                {StakingM(_months.M3)}
              </div>
            </div>
          </div>
        </div>
        <NftFooter />
      </div>
    </>
  );
};

export default Staking;
