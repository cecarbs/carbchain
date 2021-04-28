// import {useState, useEffect} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import { MyContextProvider } from './contextAPI/UserContext';

import Register from './pages/Register'
// import RoutesContainer from './components/containers/RoutesContainer';

import SendCoin from './pages/SendCoin'
import TransactionPool from './pages/TransactionPool'
import Blockchain from './pages/Blockchain'
import MyPortfolio from './pages/MyPortfolio'
// import { Route } from 'react-router-dom'
// import NavBar from './components/nav/Navbar'
import News from './pages/News'
import Home from './pages/Home'
import CryptoData from './components/crypto/CryptoData'
import Navigation from './components/nav/Navigation'
import Footer from './components/Footer';

import styled from 'styled-components'

function App() {

  return (
    <div className="App">
      <MyContextProvider>
        {/* <NavBar /> */}
        <Navigation />
        <RoutesWrapper>
          <Switch>
            <Route exact path="/login/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <Route exact path="/news" component={News} />
            <Route exact path="/blockchain" component={Blockchain} />
            <Route exact path={["/cryptocurrencies/:id", "/cryptocurrencies"]} component={CryptoData} />
            <Route exact path="/user/portfolio" component={MyPortfolio} />
            <Route exact path="/blockchain/make_transaction" component={SendCoin} />
            <Route exact path="/blockchain/transactions" component={TransactionPool} />
            {/* <RoutesContainer /> */}
            <Route component={Page404} />
          </Switch>
        </RoutesWrapper>
        <Footer />
      </MyContextProvider>
    </div>
  );
}

export default App;

const Page404 = () => {
  return (
    <div>
      <h1>Page not found! 404</h1>
    </div>
  )
}


const RoutesWrapper = ({ children }) => {

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  /* background-color: gray; */
`