import React from 'react'
import RegisterForm from '../components/users/RegisterForm';
import styled from 'styled-components';
import background from '../images/background.png';

const Register = () => {
    return (
        <RegisterContainer>
            <div className="left" background={background}>
                <section className="description">
                    <h1>COMING SOON</h1>
                    <p className="message" >Discrete Log Contracts</p>
                </section>
            </div>
            <div className="right">
                <RegisterForm />
            </div>
        </RegisterContainer>
    )
}

export default Register

const RegisterContainer = styled.div`
    display: flex;
    text-align: left;
    padding: 0;
    margin: 0 !important;
    font-weight: 500;
    height: 100vh;
    background-color: white;

    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: white;
    }

    .message {
        font-size: 1.5rem;
        color: #bdbdbd;
    }

    .left {
        /* height: 200px; */
        width: 100%;
    }

    .right {
        width: 100%;
    }

    .left, .right {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .left {
        // INSERT URL AFTER RGBA
        background: linear-gradient(rgba(0,0,0,0) rgba(0,0,0,0.5));
        background-image: url(${background});
        background-size: cover;
        /* background: black; */
    }

    .description {
        color: yellow;
        text-align: center;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        p {
            font-weight: 400;
        }
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
    
`