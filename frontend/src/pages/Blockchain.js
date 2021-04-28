import React, { useEffect, useState, useContext } from 'react'
import { axiosInstance } from '../api/axios';
import Carbchain from '../components/blockchain/Carbchain';
import styled from 'styled-components'
import coin from '../images/favi.png'
import { MyContext } from '../contextAPI/UserContext'

const Blockchain = () => {
    const [wallet, setWallet] = useState([])
    const { user } = useContext(MyContext)
    useEffect(() => {
        async function getData() {
            let { data } = await axiosInstance.get('http://localhost:8000/api/wallet/balance/')
            setWallet(data)
        }
        getData()
    }, [])

    return (
        <BlockchainContainer>
            {/* <pre>{JSON.stringify(wallet, null, 2)}</pre> */}
            <div className="page__title">
                <img src={coin} alt="" />
                <h1 className="carbchain">CarbChain</h1>
            </div>
            {user && (
                <div className="header">
                    <h1>Address: <span className="wallet">{wallet.address}</span></h1>
                    <h1>Balance: <span className="wallet">{wallet.balance} CC</span></h1>
                </div>
            )}
            <Carbchain />
        </BlockchainContainer>
    )
}

export default Blockchain

const BlockchainContainer = styled.section`
    padding: 0.5rem calc((100vw - 1200px) / 2);
    border: none;
    
    .page__title {
        width: 100%;
        display: flex; 
        align-items: center;
        justify-content: center;

        img {
            width: 2.3rem;
            transform: translateY(8px);
            padding-right: 0.5rem;
            z-index: 1;
        }
        .carbchain {
            font-size: 2.5rem;
            margin-top: 3rem;
            font-weight: 700;
            color: white;
        }
    }

    .header {
        font-size: 1rem;
        margin-top: 4rem;
        margin-bottom: 4rem;

        h1 {
            color: #eeeeee;
        }
    }

    .wallet {
        font-weight: 300;
        padding-left: 6px;
    }
`