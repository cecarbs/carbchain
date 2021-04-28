import React, { useState, useEffect, useContext } from 'react';
import { coinGecko } from '../../api/axios';
import Coin from './Coin';
import styled from 'styled-components';
import { MyContext } from '../../contextAPI/UserContext';
import Detail from '../../pages/Detail';
import { useLocation } from 'react-router-dom'

const CryptoData = () => {
  const [search, setSearch] = useState("")
  const { coins, setCoins } = useContext(MyContext)
  const location = useLocation()
  let pathId = location.pathname.split("/")[2]

  const getData = async () => {
    try {
      let { data } = await coinGecko.get("/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      setCoins(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()

    const id = setInterval(getData, 60000)

    return () => clearInterval(id)
  }, [])

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  const onChangeHandler = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <FormContainer>
        <form class="form">
          <input name="search" placeHolder="filter your search" className="form__input" type="text" onChange={onChangeHandler}></input>
        </form>
      </FormContainer>
      <CoinList>
        <Detail pathId={pathId} />
        {filteredCoins.map(coin => {
          return (
            <Coin key={coin.id}
              id={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              volume={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
            />
          )
        })}
      </CoinList>
    </div>
  )
}

export default CryptoData


const FormContainer = styled.div`
  form {
    padding-top: 5rem;
    padding-bottom: 2rem;

    input {
      border-radius: 4px ;
      border: 1px solid gray;
      /* height: 20px; */
      width: 15rem;
      margin-bottom: 1rem;
      padding: 8px;
      
      &:focus {
        outline: none;
      }

      &::placeholder {
        font-style: italic;
      }
    }
      button {
        padding: 8px;
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
  }
`

const CoinList = styled.div`
  padding-bottom: 10rem;
`