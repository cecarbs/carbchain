import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion'

const Coin = ({ image, name, symbol, volume, price, priceChange, id }) => {

    return (
        <CoinContainer
            // variants={popup}
            // initial="hidden"
            // animate="show"
            layoutId={id}
        >
            <div className="row">
                <div className="coin">
                    <img src={image} alt="crypto" />
                    <Link to={`/cryptocurrencies/${id}`}>
                        <h3>{name}</h3>
                    </Link>
                    <p>{symbol}</p>
                </div>
                <div className="data">
                    <p className="price">${price.toLocaleString()}</p>
                    <p className="coin-volume">${volume.toLocaleString()}</p>
                    <Percent className="percent" priceChange={priceChange}>{priceChange}%</Percent>
                </div>
            </div>
        </CoinContainer>
    )
}

export default Coin

const CoinContainer = styled(motion.div)`
    display: flex;
    justify-content: center;

    .row {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        height: 80px;
        border-bottom: 1px solid #424242;
        width: 900px;
    }

    .coin {
        display: flex;
        align-items: center;
        padding-right: 24px;
        min-width: 300px;

        a {
            text-decoration: none;
            color: #fafafa;
            font-weight: 500;

            &:hover {
                text-decoration: underline;
            }
        }

        h3 {
            font-size: 16px;
            width: 240px;
        }

        img {
            height: 30px;
            width: 30px;
            margin-right: 10px;
        }

        p {
            width: 50px;
            text-transform: uppercase;
            color: #9e9e9e;
        }
    }

    .data {
        display: flex;
        text-align: center;
        justify-content: space-between;
        width: 100%;

        .price {
            margin-left: 50px;
            width: 180px;
            color: #9e9e9e;
        }

        .coin-volume {
            margin-right: 40px;
            width: 180px;
            color: #9e9e9e;
        }

        .percent {
            width: 80px;
        }
    }
`

const Percent = styled.p`
    color: ${({ priceChange }) => (priceChange > 0 ? "green" : "red")}
`