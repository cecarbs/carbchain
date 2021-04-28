import React, { useContext } from 'react';
import { MyContext } from '../../contextAPI/UserContext';
import { axiosInstance } from '../../api/axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'

const CoinData = ({ data }) => {
    let history = useHistory()
    const { user } = useContext(MyContext)

    const sendData = async (e) => {
        e.preventDefault()
        try {
            let response = await axiosInstance.post('/portfolio/', {
                "name": data.name,
                "symbol": data.symbol.toUpperCase(),
                "quantity": e.target[0].value,
                "image_url": data.image,
                "user": parseInt(user)
            })
            history.push('/user/portfolio')
            return response
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Details>
            {data && (<div>
                {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
                <p><span>24h High</span>: ${data.high_24h.toLocaleString()}</p>
                <p><span>24h Low</span>: ${data.low_24h.toLocaleString()}</p>
                <p><span>Market Cap</span>: {data.market_cap}</p>
                <p><span>Market Cap Change</span>: {data.market_cap_change_percentage_24h.toFixed(2)}%</p>
                <p><span>Circulating Supply</span>: {data.circulating_supply}</p>
                <p><span>Max Supply</span>: {data.max_supply}</p>
                {user && (
                    <form onSubmit={sendData}>
                        <input type="text" placeholder="amount" name="portfolio" />
                        <button>Add</button>
                    </form>
                )}
            </div>)}
        </Details>
    )
}

export default CoinData

const Details = styled.div`
    span {
        font-weight: 700;
    }

    input {
        border-radius: 4px 0 0 4px;
        border: 1px solid gray;
        width: 8rem;
        padding: 4px 10px;

        &:focus {
            outline: none
        }

        &::placeholder {
            font-style: italic;
        }
    }

    button {
        padding: 4px;
        width: 4rem;
        border-radius: 0 4px 4px 0;
        border: 1px solid gray;
        border-left: none;
        background-color: #00a9a5;
        color: white;

        &:hover {
          cursor: pointer;
          background: #092327;
        }
    }

`