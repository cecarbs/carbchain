import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

const PlotData = ({ data }) => {
    const [timespan, setTimespan] = useState("24")
    const [isActiveOne, setIsActiveOne] = useState(true)
    const [isActiveTwo, setIsActiveTwo] = useState(false)
    const [isActiveThree, setIsActiveThree] = useState(false)
    const { day, month, year, detail } = data



    const timeViewHandler = () => {
        switch (timespan) {
            case "24h":
                return day;
            case "30d":
                return month;
            case "1y":
                return year;
            default:
                return day;
        }
    }

    const transformData = (data) => {
        let plotData = []
        let x = []
        let y = []

        data?.forEach(each => {
            x.push(each.t)
            y.push(each.y)
        })
        plotData['x'] = x;
        plotData['y'] = y;

        return plotData
    }

    const dayBtn = () => {
        setTimespan("24h")
        setIsActiveOne(true)
        setIsActiveTwo(false)
        setIsActiveThree(false)
    }
    const monthBtn = () => {
        setTimespan("30d")
        setIsActiveOne(false)
        setIsActiveTwo(true)
        setIsActiveThree(false)
    }
    const yearBtn = () => {
        setTimespan("1y")
        setIsActiveOne(false)
        setIsActiveTwo(false)
        setIsActiveThree(true)
    }

    return (
        <div>
            {detail && (
                <>
                    <div>
                        <p>${detail.current_price.toLocaleString()}</p>
                        <PriceChange price={detail.price_change_percentage_24h}>{detail.price_change_percentage_24h.toFixed(2)}%</PriceChange>
                    </div>
                </>
            )}
            {
                day && (
                    <>
                        <Plot data={[
                            {
                                type: 'scatter',
                                mode: 'lines',
                                x: transformData(timeViewHandler())['x'],
                                y: transformData(timeViewHandler())['y'],
                                marker: { color: '#ed022d' },
                            }
                        ]}
                            layout={{ autosize: true, title: `${detail.name}` }}
                            useResizeHandler={true}
                            style={{ width: "100%", height: "100%" }}
                        />
                        <Buttons>
                            <One isActiveOne={isActiveOne} className="btn" onClick={dayBtn}>1 Day</One>
                            <Two isActiveTwo={isActiveTwo} className="btn" onClick={monthBtn}>1 Month</Two>
                            <Three isActiveThree={isActiveThree} className="btn" onClick={yearBtn}>1 Year</Three>
                        </Buttons>
                    </>
                )
            }
        </div>
    )
}

export default PlotData

const PriceChange = styled.p`
    color: ${({ price }) => (price > 0 ? "green" : "red")};
`

const Buttons = styled.div`
    .btn {
        margin: 0 8px 0 8px;
        padding: 2px 8px;
        border-radius: 4px;
        outline: none;
        border: 1px solid gray;
        padding: 4px 10px;
    }
`

const One = styled.button`
    background-color: ${({ isActiveOne }) => isActiveOne ? '#092327' : '#0b5351'};
    color: white;

    &:hover {
        background-color: #00a9a5;
        cursor: pointer;
    }
`

const Two = styled.button`
    background-color: ${({ isActiveTwo }) => isActiveTwo ? '#092327' : '#0b5351'};
    color: white;

    &:hover {
        background-color: #00a9a5;
        cursor: pointer;
    }

`
const Three = styled.button`
    background-color: ${({ isActiveThree }) => isActiveThree ? '#092327' : '#0b5351'};
    color: white;

    &:hover {
        background-color: #00a9a5;
        cursor: pointer;
    }
`