import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { coinGecko } from '../api/axios';
import axios from 'axios';
import PlotData from '../components/crypto/PlotData';
import CoinData from '../components/crypto/CoinData';
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Detail = () => {
    const { id } = useParams()
    const [coinInfo, setCoinInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    let history = useHistory()

    let urlPath = `coins/${id}/market_chart`

    const exitDetailHandler = (e) => {
        const element = e.target;
        if (element.classList.contains("shadow")) {
            document.body.style.overflow = "auto";
            history.push("/cryptocurrencies");
        }
    };

    const formatData = (data) => {
        return data.map(el => {
            return {
                t: el[0],
                y: el[1].toFixed(2)
            }
        })
    }

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const [day, month, year, detail] = await axios.all([
                coinGecko.get(urlPath, {
                    params: {
                        vs_currency: "usd",
                        days: "1",
                    }
                }),
                coinGecko.get(urlPath, {
                    params: {
                        vs_currency: "usd",
                        days: "30",
                    }
                }),
                coinGecko.get(urlPath, {
                    params: {
                        vs_currency: "usd",
                        days: "365"
                    }
                }),
                coinGecko.get('/coins/markets/', { params: { vs_currency: "usd", ids: id } })
            ])

            setCoinInfo({
                day: formatData(day.data.prices),
                month: formatData(month.data.prices),
                year: formatData(year.data.prices),
                detail: detail.data[0]
            });
            setIsLoading(false)
        }
        getData()

    }, [urlPath, id])

    return (
        <>
            {!isLoading && (
                <CardShadow className="shadow" onClick={exitDetailHandler}>
                    <CoinDetail>
                        <PlotData data={coinInfo} />
                        <CoinData data={coinInfo.detail} />
                    </CoinDetail>
                </CardShadow>
            )
            }
        </>
    )
}

export default Detail

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const CoinDetail = styled(motion.div)`
  width: 50%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 20%;
  top: 5%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
`;