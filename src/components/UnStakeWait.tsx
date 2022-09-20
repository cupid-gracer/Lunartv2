import { useEffect, useState } from "react"
import { TxResult, useLCDClient } from "@terra-money/wallet-provider"
import { QueryKey, useQuery } from "react-query"
import { TX_POLLING_INTERVAL, STATUS } from "core/constants"
import "./Wait.scss"
import { TxInfo } from "@terra-money/terra.js"
import iconFail from "../assets/icons/failed.svg"
import iconRetry from "../assets/icons/retry.svg"
import iconDone from "../assets/icons/done.svg"
import RewardIcon from '../assets/icons/lunart_icon.svg'
import UstIcon from '../assets/icons/ust.svg'
import Modal from '../components/Modal';

interface Props {
    response: TxResult
    error: Error | undefined
    onConfirm: Function
    onTryAgain: Function
}

const UnStakeWait = (props: Props) => {
    const lcd = useLCDClient()
    const [txInfo, setTxInfo] = useState<TxInfo>()
    const [isOpen, setIsOpen] = useState(true)
    const { response, error, onConfirm } = props
    const success = !error
    const hash = props?.response?.result?.txhash

    const status =
    !success || !hash || (txInfo && txInfo?.code)
      ? STATUS.FAILURE
      : !txInfo
      ? STATUS.LOADING
      : STATUS.SUCCESS

    useEffect(() => {
        if (!success || !hash) return;
        const refetchTimer = Number(sessionStorage.getItem('refetchTimer'));
        const _func = () => {
            if (refetchTimer) clearInterval(refetchTimer);
            const _refetchTimer = setInterval(() => {
                lcd.tx.txInfo(hash).then((_txInfo: TxInfo) => {
                    console.log(_txInfo);
                    setTxInfo(_txInfo);
                })
            }, 1000)
            sessionStorage.setItem("refetchTimer", _refetchTimer.toString())
        }
        _func()
    }, [success, hash, lcd])

    useEffect(() => {
        const refetchTimer = Number(sessionStorage.getItem('refetchTimer'));
        if (status === STATUS.SUCCESS) {
            clearInterval(refetchTimer);
            sessionStorage.setItem("refetchTimer", "")
        }
    }, [status])

    const _onTryAgain = () => {
        setIsOpen(false)
        props.onTryAgain()
    }

    const calculateReceive = () => {
        const logs = txInfo?.logs;
        if (!logs) return 0;
        const events = logs[1].events;
        const wasmIndex = events.findIndex(each => each.type === 'wasm');
        if (wasmIndex === -1) return 0;
        const return_amount_index = events[wasmIndex].attributes.findIndex(each => each.key === "amount")
        if (return_amount_index === -1) return 0;
        return Number(events[wasmIndex]['attributes'][return_amount_index].value) / Math.pow(10, 6)
    }

    return (
        <>
        {isOpen?        
        <div id="myModal" className="modal">
            <div className="modal-content text-center">
            {/* loading */}
            {
                status === STATUS.LOADING && (
                    <>
                        <div className="loader"></div>
                        <p className="loading-text mb-8">Wait For UnStaking...</p>
                        <p className="receipt-text mb-40 font-14">Please wait while your request is being processed</p>
                        <div className="hash-link-div mb-40">
                            <div className="background" />
                            <p className="receipt-text font-13">Request ID</p>
                            <a className="receipt-text font-24 decoration_under" href={`https://finder.terra.money/${lcd.config.chainID === 'columbus-5' ? 'mainnet' : 'testnet'}/tx/${hash}`} target="_blank">{hash.slice(0, 14)}</a>
                        </div>
                    </>
                )
            }

            {/* failed */}
            {
                status === STATUS.FAILURE && (
                    <>
                        <img className="modal-icon mb-36 mt-40" src={iconFail}/>
                        <p className="loading-text mb-8 mt-14">User Denied</p>
                        <p className="receipt-text mb-40 font-14">Please wait while your request is being processed</p>
                        <div className="pr-40 pl-40">
                            <button className="farm-btn mb-28" onClick={_onTryAgain}>
                                <img src={iconRetry} className="mr-4" />
                                <span>Try Again</span>
                            </button>
                        </div>
                    </>
                )
            }

            {/* Success */}
            {
                status === STATUS.SUCCESS && (
                    <>
                        <img className="modal-icon mb-36 mt-40" src={iconDone}/>
                        <p className="loading-text mb-8 mt-14">Done!</p>
                        <p className="receipt-text mb-24 font-14">Transaction approved from wallet.</p>
                        <hr/>
                        <div className="hash-link-div mb-18">
                            <div className="background" />
                            <p className="receipt-text font-13">Amount</p>
                            <div className="center">
                                <img src={RewardIcon} className='mr-4' />
                                <p className="receipt-text font-16">{calculateReceive()} ARTS</p>
                            </div>
                        </div>
                        {/* <div className="center mb-14">
                            <p className="receipt-text font-13">Amount</p>
                            <div className="center">
                                <img src={UstIcon} className='mr-6' />
                                <p className="receipt-text font-24">{calculateReceive()} UST</p>
                            </div>
                        </div> */}
                        <div className="hash-link-div mb-38">
                            <p className="receipt-text font-13">Tx Hash</p>
                            <a className="receipt-text font-24 decoration_under" href={`https://finder.terra.money/${lcd.config.chainID === 'columbus-5' ? 'mainnet' : 'testnet'}/tx/${hash}`} target="_blank">{hash.slice(0, 14)}</a>
                        </div>
                        <div className="confirm-div">
                            <button className="farm-btn mb-28 w-100" onClick={() => onConfirm()}>
                                <span>Done</span>
                            </button>
                        </div>
                    </>
                )
            }

            {/* Success End */}
            
            </div>
        </div>: null}
        </>
    )
}

export default UnStakeWait
        