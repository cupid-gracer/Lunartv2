import { FC, useEffect, useState } from 'react';
import { useConnectedWallet, UserDenied, CreateTxFailed, TxFailed, TxUnspecifiedError, useWallet, useLCDClient } from '@terra-money/wallet-provider'
import { MsgExecuteContract, TxResult } from '@terra-money/terra.js';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import Modal from '../../components/Modal';
import Wallet from '../../components/Wallet';
import { useTerraWebapp } from 'hooks/context';
import { approve, provide_liquidity, swap } from 'utils/msgGenerator';
import { expectedSwapAmount, expectedReverseSwapAmount } from 'hooks/usePair';
import DownArrow from '../../assets/icons/down_arrow.svg';
import CartIcon from '../../assets/icons/cart.svg'
import RewardIcon from '../../assets/icons/rewards.svg'
import UstIcon from '../../assets/icons/ust.svg'
import hoverArrow from '../../assets/icons/hoverArrow.png'
import c1 from '../../assets/icons/c1.png'
import c2 from '../../assets/icons/c2.png'
import c3 from '../../assets/icons/c3.png'
import c4 from '../../assets/icons/c4.png'
import c5 from '../../assets/icons/c5.png'
import Wait from 'components/Wait';
import ReactTooltip from 'react-tooltip';

interface Props {
  handleSidebar: Function;
} 

export type PostError =
  | UserDenied
  | CreateTxFailed
  | TxFailed
  | TxUnspecifiedError

const NftHeader: FC<Props> = handleSidebar => {
  const { network, isConnected, balances, pair, pairAddress, uusdPairInfo, tokenPairInfo, address } = useTerraWebapp();
  const connectedWallet = useConnectedWallet()
  const lcd = useLCDClient()

  const [uusdAmount, setUusdAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [notEnoughBalance, setNotEnoughBalance] = useState(false);
  const [expecting, setExpecting] = useState(false);
  const [expectingTimer, setExpectingTimer] = useState<any>();
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<PostError>()
  const [isWaitingForBuyArts, setIsWaitingForBuyArts] = useState(false);

  const location = useLocation();
  const [menuToggle, setToggle] = useState(false);
  const [isOpenStakeModal, setIsOpenStakeModal] = useState(false);
  const [BuyArtsModal, setBuyArtsModal] = useState(false);
  const [nftToggle, setNftToogle] = useState(false);
  const [scrolledClassName, setScrolledClassName] = useState('nftHeader');
  const { availableConnections, availableInstallations, connect, disconnect, post } =
    useWallet();

    const closeBuyArtsModal = () => {
      setBuyArtsModal(false);
    };
  const closeStakeModal = () => {
    setIsOpenStakeModal(false);
    setIsWaitingForBuyArts(false);
  };

  useEffect(() => {
    if (address && isWaitingForBuyArts) {
      setIsOpenStakeModal(false);
      setBuyArtsModal(true);
      setIsWaitingForBuyArts(false);
    }
  }, [address, isWaitingForBuyArts])
  

  const onDisconnect = () => {
    disconnect();
  };

  const toggleMenu = () => {
    setToggle(!menuToggle);
    handleSidebar.handleSidebar(!menuToggle);
  };
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 30) {
      setScrolledClassName('scrolled');
    } else {
      setScrolledClassName('nftHeader');
    }
  };

  useEffect(() => {
    if ( isConnected ) {
      setIsOpenStakeModal(false)
    } 
  }, [isConnected]);

  useEffect(() => {
   window.addEventListener('scroll', handleScroll);
  });

  const onChangeUusdAmount = async (amount: string) => {
    if (expecting) return;
    else if (expectingTimer) {
      clearTimeout(expectingTimer);
      setExpectingTimer(undefined);
    }
    setUusdAmount(amount);
    if (Number(amount) > Number(balances.uusd)) setNotEnoughBalance(true);
    else if (notEnoughBalance) setNotEnoughBalance(false);
    const _timer = setTimeout(async () => {
      setExpecting(true)
      const _amount = Number(amount) * Math.pow(10, 6)
      const result: any = await expectedSwapAmount( network, pairAddress, uusdPairInfo.info, _amount.toFixed(0));
      // console.log(result);
      const returnAmount = result?.return_amount || "0";
      // const spreadAmount = result?.spread_amount || "0";
      // const commissionAmount = result?.commission_amount || "0";
      setTokenAmount((Number(returnAmount) / Math.pow(10, 6)).toFixed(6));
      setExpecting(false)
    }, 1000)
    setExpectingTimer(_timer);
  }

  const onChangeTokenAmount = async (amount: string) => {
    if (expecting) return;
    else if (expectingTimer) {
      clearTimeout(expectingTimer);
      setExpectingTimer(undefined);
    }
    setTokenAmount(amount);
    const _timer = setTimeout(async () => {
      setExpecting(true)
      const _amount = Number(amount) * Math.pow(10, 6);
      const result: any = await expectedReverseSwapAmount(network, pairAddress, tokenPairInfo.info, _amount.toFixed(0));
      const returnAmount = result?.offer_amount || "0";
      setUusdAmount((Number(returnAmount) / Math.pow(10, 6)).toFixed(6));
      setExpecting(false)
    }, 1000)
    setExpectingTimer(_timer);
  }

  const handleSwap = async () => {
    const tokenAddress = tokenPairInfo.info.token.contract_addr;
    const msgs: MsgExecuteContract[] = [];
    msgs.push(swap(address, "uusd", (Math.floor(Number(uusdAmount) * Math.pow(10, 6))).toFixed(0), tokenAddress, (Number(tokenAmount) * Math.pow(10, 6)).toFixed(0), pairAddress));
    try {
      const response = await post({
        msgs: msgs
      });
      setResponse(response);
      setBuyArtsModal(false);
    } catch (error) {
      setError(error as Error)
      setBuyArtsModal(false);
    }
  }

  const closeResponse = () => {
    setResponse(undefined);
    setError(undefined);
    setTokenAmount("")
    setUusdAmount("")
  }

  const tryAgain = () => {
    setResponse(undefined);
    setError(undefined);
    handleSwap();
  }

  const handleBuyARTS = () => {
    if (!address) {
      setIsOpenStakeModal(true)
      setIsWaitingForBuyArts(true)
    }
    else setBuyArtsModal(true)
  }

  const buyArtsCancel = () => {
    setResponse(undefined);
    setError(undefined);
  }

  return (
    <>
      {
        (response || error) && (
          <Wait response={response} error={error} onConfirm={closeResponse} onTryAgain={tryAgain} onCancel={buyArtsCancel} />
        )
      } 
      <div className={scrolledClassName}>
        <header className={menuToggle ? 'mobileHeader' : 'header'}>
          <div className='wrap'>
            <div className='logo'>
              <Link to='/' rel='noreferrer'>
                <img className='logo_img' src='/lunartImages/lunartLogo.svg' alt='logo' />
              </Link>
            </div>
            <a className='menu_icon' onClick={toggleMenu}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='50'
                height='41'
                viewBox='0 0 50 41'
                fill='none'
              >
                <path
                  d='M0 10C0 4.47715 4.47715 0 10 0H40C45.5228 0 50 4.47715 50 10V31C50 36.5228 45.5228 41 40 41H10C4.47715 41 0 36.5228 0 31V10Z'
                  fill='#1B1B1B'
                />
                <rect x='10' y='19' width='30' height='3' fill='white' />
                <rect x='10' y='28' width='30' height='3' fill='white' />
                <rect x='10' y='10' width='30' height='3' fill='white' />
              </svg>
            </a>
            <nav className='navbar'>
              <div className='logo'>
                <img className='logo_img' src='/lunartImages/lunartLogo.svg' alt='logo' />
              </div>
              <div className='icn_cloz' onClick={toggleMenu}></div>
              <ul className='menu'>
                <li><span><a onClick={handleBuyARTS}><img src='/lunartImages/buyArts.png' alt="images"/> Buy ARTS</a></span></li>
                <li className='loginCredHeaderHold'>
                  <Wallet
                    onConnect={() => setIsOpenStakeModal(true)}
                    onDisconnect={onDisconnect}
                  />
                </li>
                {/* <li>
                  <Link to='/' rel='noreferrer'>
                    Home
                  </Link>
                </li> */}
                {/* <li className={ location.pathname == '/' ? 'activeluna':''}> */}
                <li className='cmsoon'>
                  <a
                    // href='/'
                    rel='noreferrer'
                  >
                    Bakery
                  </a>
                </li>
                <li className={ location.pathname == '/collections' || location.pathname == '/collections-detail' ? 'activeluna':''}>
                  <Link to='/collections' rel='noreferrer'>
                    Collection
                  </Link>
                </li>
                <li className={ location.pathname == '/artist' ||  location.pathname == '/artist-detail' ? 'activeluna':''}>
                  <Link to='/artist' rel='noreferrer'>
                    Artists
                  </Link>
                </li>
                
                <li className='cmsoon'>
                  <a
                    rel='noreferrer'
                  >
                   Staking
                  </a>
                </li>
                <li className={ location.pathname == '/farming' ? 'activeluna':''}>
                  <Link to='/farming' rel='noreferrer'>
                    Farming
                  </Link>
                </li>
               
              </ul>
              <ul className='menu mneuValues'>
                <li><span><a onClick={handleBuyARTS}><img src='/lunartImages/buyArts.png' alt="images"/> Buy ARTS</a></span></li>
                <li>
                  <Wallet
                    onConnect={() => setIsOpenStakeModal(true)}
                    onDisconnect={onDisconnect}
                  />
                </li>
              </ul>
              {/* <div className='trendingNewMenu'>
                <div className='trendingNewMenuLabel Actsidebar'>
                  Side Menu's
                </div>
              <ul className='sidemenuBar'>
              <li  className='trendingActiveMenu'><a href="/nftExplore"><span><img src='/m1.svg' alt='menu' /><img src='/m1a.svg' alt='menu' /></span> Marketplace</a></li>
                  <li><a href="/launchpad"><span><img src='/m2.svg' alt='menu' /><img src='/m2a.svg' alt='menu' /></span> Launchpad</a></li>
                  <li><a href="/collections"><span><img src='/m3.svg' alt='menu' /><img src='/m3a.svg' alt='menu' /></span> Collections</a></li>
                  <li><a href="/nftFarm"><span><img src='/m5.svg' alt='menu' /><img src='/m5a.svg' alt='menu' /></span> Minting Studio</a></li>
                </ul>
                <ul>
                  <li><a href="/myNft"><span><img src='/m5.svg' alt='menu' /><img src='/m5a.svg' alt='menu' /></span> My NFTs</a></li>
                  <li><a href=""><span><img src='/m8.svg' alt='menu' /><img src='/m8a.svg' alt='menu' /></span> Log Out</a></li>
                </ul>
              </div> */}
            </nav>
          </div>
          {!address && (
            <Modal
              isOpen={isOpenStakeModal}
              title='Connect Wallet'
              onClose={closeStakeModal}
            >
              <div className='buyArtModal connectModal'>
              <div className="card-wrapper">
                <ul>
                  {/* <li><a href=""><img src={c1} alt="image"/> Terra Station Extention <b><img src={hoverArrow}/></b></a></li>
                  <li><a href=""><img src={c2} alt="image"/> Terra Station Mobile <b><img src={hoverArrow}/></b></a></li>
                  <li><a href=""><img src={c3} alt="image"/> XDEFI Extension <b><img src={hoverArrow}/></b></a></li>
                  <li><a href=""><img src={c4} alt="image"/> Leap Wallet <b><img src={hoverArrow}/></b></a></li>
                  <li><a href=""><img src={c5} alt="image"/> Learn More About Terra Wallets <b><img src={hoverArrow}/></b></a></li> */}
                  {availableConnections
                    .filter((wallet) => {
                        return !availableInstallations.some(
                            (i) => i.identifier === wallet.identifier
                        )
                    })
                    .map(({ type, identifier, name, icon }, index) =>
                        type === "READONLY" ? (
                            ""
                        ) : name === "Wallet Connect" ? (
                          <li key={name}><img src={icon} alt={name} /> Terra Station Mobile <b><img src={hoverArrow}/></b></li>
                        ) : (
                          <li key={identifier+type} onClick={() => connect(type, identifier)}><img src={icon} alt={name} /> Connect {name} <b><img src={hoverArrow}/></b></li>
                        )
                    )}
                  {availableInstallations.map(({ type, identifier, name, icon, url }) => (
                      <li key={identifier+type} onClick={() => (window.open(url, '_blank'))}><img src={icon} alt={name} /> Install {name} <b><img src={hoverArrow}/></b></li>
                  ))}
                  <li><a href={`https://dex.loop.markets/wallets`} target="_blank" rel="noreferer" className="walletInfo"><img src={c5} alt="image"/> Learn More About Terra Wallets <b><img src={hoverArrow}/></b></a></li>
                </ul>
              </div>
              </div>
            </Modal>
          )}

          <Modal
            isOpen={BuyArtsModal}
            title='Buy ARTS'
            onClose={closeBuyArtsModal}
          >
            <div className='buyArtModal'>
              <div className="card-wrapper">
                <div className="card-content-wrapper">
                  <div className="card-heading">
                    <p className='title'>Buy ARTS</p>
                    <p className="sub-title">ARTS is the utility token for LunArt</p>
                  </div> 
                  <div className="">
                    <div className="card-content-row">
                      <div className="farm-form-text">
                        <span className="farm-form-text">{`Balance: ${balances.uusd || "0.00"} UST`}</span>
                      </div>
                      <div className="farm-form-text">
                        <ReactTooltip effect='solid' place='top' type='light' multiline textColor="white" backgroundColor="rgba(2, 2, 16, 0.8)" className="tooltip" />
                        <span data-tip="Coming Soon" className="colored"><a>+Add Balance</a></span>
                      </div>
                    </div>
                    <div className="input-box">
                      <span ><img src={UstIcon} /><span>UST</span></span>
                      <input type="text" placeholder='0.00' value={uusdAmount} onChange={e => onChangeUusdAmount(e.target.value)} disabled={pair === undefined} />
                      <button onClick={() => onChangeUusdAmount((Number(balances.uusd) - 0.5).toString())}>max</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '24px', }}>
                    <div className="round-button">
                      <img src={DownArrow} />
                    </div>
                  </div>
                  <div className="input-box-2">
                    <span ><img src={RewardIcon} /><span>ARTS</span></span>
                    <input type="text" placeholder='0.00' value={tokenAmount} onChange={e => onChangeTokenAmount(e.target.value)} disabled={pair === undefined} />
                    {/* <button onClick={() => onChangeUusdAmount((Number(balances.uusd) - 0.5).toString())}>max</button> */}
                  </div>
                  <div >
                    <button className="farm-button" onClick={handleSwap} disabled={notEnoughBalance}>
                      <img src={CartIcon} /> Buy ARTS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </header>
      </div>
    </>
  );
};

export default NftHeader;
