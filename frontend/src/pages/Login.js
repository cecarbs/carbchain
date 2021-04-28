import React from 'react'
import LoginForm from '../components/users/LoginForm';
import styled from 'styled-components'

const Login = () => {
    return (
        <LoginContainer>
            <LoginForm />
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    margin: 0 !important;
    padding: 0;
    background-color: white;
    text-align: left;

    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    h1 {
        margin: 0;
    }
`