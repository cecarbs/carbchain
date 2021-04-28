import React from 'react';
import styled from 'styled-components';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useLocation } from 'react-router-dom'
import image from '../../images/favi.png';

function Transaction({ transaction_data, metadata }) {
    const location = useLocation()
    const recipients = Object.keys(transaction_data);

    return (
        <TransactionContainer location={location.pathname}>
            <div className="left">
                <p>
                    {metadata.address}
                </p>
            </div>
            <div className="middle">
                <ArrowForwardIcon className="middle" />
            </div>
            <div className="right">
                {
                    recipients.map(recipient => (
                        <div className="recipients" key={recipient}>
                            {recipient} | {transaction_data[recipient]} CC <span><img src={image} alt="" /></span>
                        </div>
                    ))
                }
            </div>
        </TransactionContainer>
    )
}

export default Transaction;

const TransactionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    border: ${({ location }) => location === '/blockchain' ? 'none' : '1px solid gray'};
    border-top: none;
    
    img {
        width: 1rem;
        align-items: center;
        transform: translateY(2px);
    }

    .left {
        flex-basis: 33.33%;
        color: ${({ location }) => location === '/blockchain/transactions' ? 'white' : 'black'};
    }
    .middle {
        flex-basis: 33.33%;
        color: green;
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .right {
        padding-top: 5px;
        padding-bottom: 5px;
        flex-basis: 33.33%;
        color: ${({ location }) => location === '/blockchain/transactions' ? '#e0e0e0' : '#424242'};
    }
`