import React, { useEffect, useState, useContext } from 'react';
import CoinRow from './portfolio/CoinRow';
import { axiosInstance } from '../api/axios';
import axios from 'axios';
import styled from 'styled-components';
import { MyContext } from '../contextAPI/UserContext';
import { Link } from 'react-router-dom'

const Portfolio = () => {
    const { user } = useContext(MyContext)
    const [holdings, setHoldings] = useState([])
    const [total, setTotal] = useState(null)
    const [res, setRes] = useState(null)
    const [mergedArr, setMergedArr] = useState(null)
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axiosInstance.get(`/portfolio/`, {
                    params: {
                        id: user
                    }
                })
                setHoldings(data)
                let str = ""
                data.forEach((e, i) => {
                    if (i !== data.length - 1) {
                        str += e.name.toLowerCase() + "%2C%20"
                    } else {
                        str += e.name.toLowerCase()
                    }
                })

                let res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${str}`)
                setRes(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [total])

    const calcHandler = () => {
        const a3 = res.map(t1 => ({ ...t1, ...holdings.find(t2 => t2.name === t1.name) }))
        setMergedArr(a3)
        setDisplay(true)
    }

    const calculateSum = () => {
        let sum = mergedArr.reduce((a, b) => a + (b.quantity * parseFloat(b.current_price)), 0)
        setTotal(sum.toFixed(2))
    }

    useEffect(() => {
        if (display === true) {
            console.log('inside useeffect -- true')
            calculateSum()
        }
    }, [display])

    return (
        <>
            {holdings && (
                <div>
                    <PortfolioH1>My Portfolio</PortfolioH1>
                    {/* {total && <h1>${total}</h1>} */}
                    {holdings.length > 0 ?
                        holdings?.map((holding, i) => (
                            <CoinRow
                                key={i}
                                name={holding.name}
                                symbol={holding.symbol}
                                quantity={holding.quantity}
                                image={holding.image_url}
                                id={holding.id}
                                user_id={holding.user}
                                holdings={holdings}
                                setHoldings={setHoldings}
                            />
                        ))
                        :
                        <MessageContainer>
                            <h4>Sorry looks like your portfolio is empty.</h4>
                            <br />
                            <p>To add coins to your portfolio, please visit our <Link to="/cryptocurrencies">cryptocurrencies</Link> section.</p>
                        </MessageContainer>
                    }
                    {total && <TotalH2><span className="est">≈ </span><span className="total">${total}</span></TotalH2>}
                    {holdings.length > 0 && <StyledButton onClick={calcHandler}>Calculate</StyledButton>}
                </div >
            )}
        </>
    )
}

export default Portfolio

const StyledButton = styled.button`
    margin-top: 2rem;
    border-radius: 4px;
    border: none;
    padding: 8px 8px;
    width: 5rem;
    cursor: pointer;
    background-color: #0b5351;
    color: white;

    &:hover {
        transform: scale(1.1);
        transition: all 0.2s ease;
    }
`

const PortfolioH1 = styled.h1`
    padding-top: 3rem;
    padding-bottom: 3rem;
    font-weight: 700;
    font-size: 2rem;
    color: white;
`

const MessageContainer = styled.div`
    h4 {
        color: #e0e0e0;
    }

    p {
        color: white;
    }

    a {
        color: blue;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`

const TotalH2 = styled.h2`
    padding-top: 3rem;
    /* padding-bottom: 1rem;/ */
    color: #bdbdbd;
    
    .total {
        font-weight: 400;
    }
`