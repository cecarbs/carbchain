import React, { useContext } from 'react';
import { axiosInstance } from '../../api/axios';
import { useForm } from 'react-hook-form'
import { MyContext } from '../../contextAPI/UserContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
    const { register, handleSubmit } = useForm()
    let history = useHistory()
    const { user, setUser } = useContext(MyContext)
    console.log(user)

    const loginHandler = async (d) => {
        try {
            const response = await axiosInstance.post('/token/obtain/', d)
            if (response.status === 200) {
                localStorage.setItem("access_token", response.data.access)
                localStorage.setItem("refresh_token", response.data.refresh)
                axiosInstance.defaults.headers["Authorization"] = "JWT " + localStorage.getItem("access_token");
                setUser(response.data.id)
                history.push('/news')
            } else {
                console.log("wrong info")
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <LoginFormContainer>
            <form onSubmit={handleSubmit(loginHandler)}>
                <h1 className="signin">Sign In</h1>

                <div className="inputs">
                    <input className="form__input" type="text" placeholder=" " {...register("email")} />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="inputs">
                    <input className="form__input" type="password" placeholder=" " {...register("password")} />
                    <label htmlFor="password">Password</label>
                </div>
                <input className="btn" type="submit" value="SIGN IN" />
            </form>
        </LoginFormContainer>
    )
}

export default LoginForm

const LoginFormContainer = styled.div`
    
    .signin {
        
        font-weight: 400;
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    form {
        width: 300px;
        padding: 4rem 2rem;
        box-shadow: 0 10px 25px rgba(92, 99, 105, 0.2);
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
        /* font-size: 1rem; */
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