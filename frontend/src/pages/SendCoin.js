import React, { useState, useEffect, useContext } from 'react'
import { axiosInstance } from '../api/axios'
import { useHistory, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { MyContext } from '../contextAPI/UserContext'

const SendCoin = () => {
    const { user } = useContext(MyContext)
    const [addresses, setAddresses] = useState([])
    let history = useHistory()

    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axiosInstance.get('blockchain/addresses/')
                setAddresses(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let response = await axiosInstance.post('blockchain/transaction/', {
                recipient: e.target[0].value,
                amount: Number(e.target[1].value)
            })
            if (response.status === 200) {
                history.push('/blockchain/transactions')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PageContainer>
            {user ? <>
                <h1 className="transaction">Make a Transaction</h1>
                <FormContainer>
                    <form onSubmit={submitHandler}>
                        <div className="inputs">
                            <input className="form__input" type="text" placeholder=" " name="recipient" />
                            <label htmlFor="recipient">Recipient</label>
                        </div>

                        <div className="inputs">
                            <input className="form__input" type="text" placeholder=" " name="amount" />
                            <label htmlFor="amount">Amount</label>
                        </div>
                        <input className="btn" type="submit" value="SEND" />
                    </form>
                </FormContainer>
                <h1 className="book">Address Book</h1>
                <div className="address__book">
                    {addresses.map((address) => (
                        <div className="address">
                            <p>{address}</p>
                        </div>
                    ))}
                </div>
            </>
                :
                <Redirect to="/login" />
            }
        </PageContainer>
    )
}

export default SendCoin


const PageContainer = styled.div`
    margin: 0 !important;
    padding: 0;
    text-align: left;
    padding: 0.5rem calc((100vw - 1200px) / 2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* min-height: 90vh; */

    .transaction {
        padding-top: 4rem;
        padding-bottom: 3rem;
        font-weight: 700;
        color: white;
        font-size: 2rem;
    }

    h1 {
        margin: 0;
    }
    
    .book {
        padding-top: 6rem;
        padding-bottom: 3rem;
        border-bottom: 1px solid gray;
        width: 100% !important;
        text-align: center;
        color: white;
        font-weight: 700;
        font-size: 2rem;
    }

    .address__book {
       display: flex;
       flex-direction: row;
       flex-wrap: wrap;

       .address {
            color: #0b5351;
            padding-left: 4px; 
            padding-right: 4px;
            font-weight: 700;
            font-size: 1rem;
         }
     }
`
const FormContainer = styled.div`
    color: black;
    background-color: white;
    border-radius: 8px;

    .signin {
        font-weight: 400;
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    form {
        width: 300px;
        padding: 4rem 2rem;
        border-radius: 1rem;
    }

    .inputs {
        position: relative;
        height: 48px;
        margin-bottom: 1.5rem;
    }

    .form__input {
        position: absolute;
        top: 0;
        left: 0;
        width: 90%;
        height: 40%;
        font-size: 1rem; // change this
        border: 1px solid gray; //change this
        border-radius: 0.5rem;
        outline: none;
        padding: 1rem;
        background: none;
        z-index: 1;
    }

    label {
        position: absolute;
        left: 1rem;
        top: 1rem;
        padding: 0 .25rem;
        background-color: #fff;
        color: lightgray; //change this
        font-size: 1rem;
        transition: .3s;
    }

    .btn {
        display: block;
        margin-left: auto;
        padding: .75rem 2rem;
        outline: none;
        border: none;
        background-color: #00a9a5;
        color: #fff;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: .3s;
        margin-top: 3rem;
        font-weight: 700;

        &:hover {
            /* box-shadow: 0 10px 36px rgba(0, 0, 0, 0.15); */
            background: #092327;
        }
    }

    .form__input:focus + label {
        top: -0.5rem;
        left: 0.8rem;
        color: #0b3531;
        font-size: 0.75rem;
        font-weight: 500;
        z-index: 10;
    }

    .form__input:not(:placeholder-shown).form__input:not(:focus)+ label {
        top: -0.5rem;
        left: 0.8rem;
        
        font-size: 0.75rem;
        font-weight: 500;
        z-index: 10;
    }

    .form__input:focus {
        border: 2px solid #0b5351;

    }
`