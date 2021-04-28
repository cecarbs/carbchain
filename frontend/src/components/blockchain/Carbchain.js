import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../api/axios'
import Block from './Block';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Carbchain = () => {
    const [blockchain, setBlockchain] = useState([])

    useEffect(() => {
        try {
            async function getData() {
                let { data } = await axiosInstance.get('blockchain/')
                setBlockchain(data.reverse())
            }
            getData()
        } catch (error) {
            console.log(error)
        }

    }, [])
    console.log(blockchain)
    return (
        <CarbChainContainer>
            {/* <pre>{JSON.stringify(blockchain, null, 2)}</pre> */}
            <div className="row__header">
                <p className="hash">Hash</p>
                <p className="timestamp">Timestamp</p>
                <p className="nonce">Nonce</p>
                <p className="difficulty">Difficulty</p>
                <ExpandMoreIcon className="icon" />
            </div>
            {blockchain.map((blockchain, i) => (
                <Block
                    key={i}
                    id={i}
                    data={blockchain.data}
                    difficulty={blockchain.difficulty}
                    hash={blockchain.hash}
                    lastHash={blockchain.last_hash}
                    nonce={blockchain.nonce}
                    timestamp={blockchain.timestamp} />
            ))}
        </CarbChainContainer>
    )
}

export default Carbchain

const CarbChainContainer = styled.div`
    margin-bottom: 6rem;
    border-radius: 4px;
    
    .row__header {
        
        display: flex;
        flex-direction: row;
        padding-left: 16px;
        padding-right: 16px;
        font-weight: 500;
        color: #fafafa;

        p {
            flex-basis: 25%;
        }

        .icon {
            opacity: 0;
        }

        .hash {
            transform: translateX(-5px)
        }
        .timestamp {
            transform: translateX(-8px)
        }
        .nonce {
            transform: translateX(-8px)
        }
        .difficulty {
            transform: translateX(-10px)
        }
    }
`