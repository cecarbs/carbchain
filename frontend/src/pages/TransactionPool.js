import React, { useState, useEffect, useContext } from 'react'
import { axiosInstance } from '../api/axios'
import Transaction from '../components/blockchain/Transactions'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { MyContext } from '../contextAPI/UserContext'

const TransactionPool = () => {
    const [transactionPool, setTransactionPool] = useState([])
    let history = useHistory()
    const { user } = useContext(MyContext)

    async function getData() {
        try {
            let { data } = await axiosInstance.get('transactions/')
            setTransactionPool(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()

        const id = setInterval(getData, 10000)

        return () => clearInterval(id)
    }, [])

    const mineHandler = async () => {
        let response = await axiosInstance.get('blockchain/mine/')
        if (response.status === 200) {
            history.push('/blockchain')
        }
    }

    return (
        <TransactionContainer>
            {/* <pre>{JSON.stringify(transactionPool, null, 2)}</pre> */}
            <h1>Transaction Pool</h1>
            <div className="transactions">
                {transactionPool?.map((transaction) => (
                    <Transaction transaction_data={transaction.transaction_data} metadata={transaction.metadata} />
                ))}
            </div>

            {user && <button onClick={mineHandler}>Mine Transactions</button>}
        </TransactionContainer>
    )
}

export default TransactionPool

const TransactionContainer = styled.div`
    padding: 0.5rem calc((100vw - 1200px) / 2);
    
    h1 {
        color: white;
        font-weight: 700;
        font-size: 2rem;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
    
    .transactions {
        border-top: 1px solid gray;
    }

    button {
        margin-top: 3rem;
        background-color: #0b3531;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        cursor: pointer;

        &:hover {
            transition: 0.3s ease;
            background-color: #00a9a5; 
            color: black;
        }

    }
`
