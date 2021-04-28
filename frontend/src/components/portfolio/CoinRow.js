import React, { useState } from 'react'
import styled from 'styled-components'
import { axiosInstance } from '../../api/axios'

// IF TIME SET UP REDUCERS FOR DELETE AND EDIT TO 
const CoinRow = ({ name, symbol, quantity, image, id, user_id, callback }) => {
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [_quantity, setQuantity] = useState(quantity)

    const saveEditHandler = async (e) => {
        e.preventDefault()
        try {

            let response = await axiosInstance.put(`portfolio/${id}/`, {
                name,
                symbol,
                "quantity": e.target[0].value,
                image_url: image,
                user: user_id
            })
            console.log(response)
            setQuantity(e.target[0].value)
            setIsEdit(!isEdit)
            callback(true)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler = async (e) => {
        e.preventDefault()
        try {
            let response = await axiosInstance.delete(`portfolio/${id}/`)
            console.log(response)
            setIsDeleted(true)
        } catch (error) {
            console.log(error)
        }
    }

    const editHandler = () => {
        setIsEdit(!isEdit)
    }

    return (
        <CoinRowContainer isDeleted={isDeleted}>
            <div className="row">
                <div className="coin">

                    <img src={image} alt="" />
                    <h3>{name}</h3>
                    <p>{symbol}</p>
                </div>
                <div className="btns">
                    {!isEdit && (
                        <p className="quantity" isEdit={isEdit}>{_quantity}</p>
                    )}
                    {isEdit && (
                        <form className="save__edit" onSubmit={saveEditHandler} isEdit={isEdit}>
                            <input defaultValue={_quantity} className="edit__input" type="text" />
                            <button className="btn save">Save</button>
                        </form>
                    )}
                    {!isEdit && (
                        <button className="edit btn" onClick={editHandler}>Edit</button>

                    )}
                    {/* DONE */}
                    <form onSubmit={deleteHandler}>
                        <button isEdit={isEdit} className="delete btn">Delete</button>
                    </form>
                </div>
            </div>
        </CoinRowContainer>
    )
}

export default CoinRow

const CoinRowContainer = styled.div`
    display: flex;
    justify-content: center;
    display: ${({ isDeleted }) => isDeleted ? 'none' : ''};
    padding: 0.5rem calc((100vw - 1200px) / 2);
    
    .row {
        display: flex;
        align-items: center;
        justify-content: start;
        align-items: center;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #616161;
        border-radius: 4px;
    }

    .coin {
        display: flex;
        align-items: center;
        min-width: 300px;

        h3 {
            font-size: 16px;
            width: 150px;
            color: #fafafa;
            
        }

        img {
            height: 30px;
            width: 30px;
            margin-right: 10px;
        }

        p {
            text-transform: uppercase;
            color: #e9e9e9;
        }
    }

    .edit__input {
        width: 6.5rem;
        margin-right: 2rem;
        padding: 4px 8px;
    }

    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
            color: #e9e9e9;
        }
    }

    .quantity {
        padding-right: 1rem;
    }

    .edit {
        margin-right: 2rem;
    }

    .btn {
        border-radius: 2px;
        border: 1px solid #092327;
        padding: 4px 8px;
        width: 5rem;
        color: white;
        background-color: #092327;


        &:hover {
            cursor: pointer;
            background-color: #00a9a5;
            border: 1px solid #00a9a5;
            transition: all 0.3s ease-out;
        }
        
    }

    .save {
        border-left: none;
        /* padding: 4px 6px !important; */
        height: 1.70rem;
        border-radius: 0 2px 2px 0;
        transform: translateX(-32px);

    }

    .delete {
        color: ${({ isEdit }) => isEdit ? 'red' : ''};
    }
`

