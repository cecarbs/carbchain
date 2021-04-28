import React from 'react'
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../api/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})

const Register = () => {
    let history = useHistory()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const registerHandler = async (data) => {
        try {
            const response = await axiosInstance.post('/user/create/', {
                "email": data.email,
                "password": data.password
            })
            if (response.status === 201) {
                history.push('/login')
            } else {
                console.log('uh oh something went wrong')
            }
            reset()
        } catch (error) {
            console.log(error.stack)
        }
    }

    return (
        <Form onSubmit={handleSubmit(registerHandler)}>
            <section>
                <h2 className="create">Create Account</h2>
                <div>
                    <p>Already have an account?
                            <a href="/login">
                            <strong> Log In</strong>
                        </a>
                    </p>
                </div>
                <div className="input__container">
                    <div className="inputs">
                        <input className="form__input" placeholder=" " type="text" {...register("email")} />
                        <label htmlFor="email" >Email</label>
                        <p className="valid">{errors.email?.message}</p>
                    </div>

                    <div className="inputs">
                        <input className="form__input" type="password" placeholder=" " {...register("password")} />
                        <label htmlFor="password">Password</label>
                        <p className="valid">{errors.password?.message}</p>
                    </div>

                    <div className="inputs">
                        <input className="form__input" type="password" placeholder=" " {...register("confirmPassword")} />
                        <label htmlFor="confirmPassword">Retype password</label>
                        <p className="valid">{errors.confirmPassword && "Passwords do not match"}</p>
                    </div>

                    <input className="btn" type="submit" value="SIGN UP" />
                    <section className="terms">
                        <p className="notice">By continuing, you agree to accept our <span className="links">Privacy Policy</span> & <span className="links">Cookie Use</span></p>
                    </section>
                </div>
            </section>
        </Form>
    )
}

export default Register

const Form = styled.form`
    width: 328px;
    /* width: 100%; */

    .create {
        font-size: 2rem;
        font-weight: 500;
    }

    section {
        color: black;
        text-align: center;

        p {
            margin: 1.5rem 0;
            font-size: 0.875rem;
            font-weight: 400;
        }
    }

    a {
        text-decoration: none;
        color: blue;

        &:hover {
            text-decoration: underline;
        }
    }

    .input__container {
        .inputs {
            position: relative;
            height: 48px;
            margin-bottom: 2rem;
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

        .valid {
            position: relative;
            transform: translateY(2rem);
            color: #f11c1c
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

        .form__input:focus + label {
            top: -0.5rem;
            left: 0.8rem;
            color: #0B5351;
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
            border: 2px solid #0B5351;

        }
    }

    .notice {
        font-size: 80%;
        text-align: center;
    }

    .links {
        color: blue;
    }

    .btn {
        display: block;
        width: 100%;
        background-color: #00A9A5;
        color: white;
        font-weight: 700;
        border: none;
        padding: 1rem;
        border-radius: 8px;
        font-size: 0.75rem;
        transition: .3s;

        &:hover {
            /* background: darkblue; */
            background: #092327;
            cursor: pointer;
        }
    }

    @media screen and (mine-width: 900px) {
        .split-screen {
            flex-direction: row;
            height: 100vh;
        }
        .left, .right {
            display: flex;
            width: 50%;
            height: auto;
        }
    }
`

// matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),