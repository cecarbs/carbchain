import React from 'react'
import CryptoData from '../crypto/CryptoData'
import Detail from '../../pages/Detail'
import Home from '../../pages/Home'
import News from '../../pages/News'
// import NavBar from '../nav/Navbar'
import { Route } from 'react-router-dom';
import MyPortfolio from '../../pages/MyPortfolio'
import Blockchain from '../../pages/Blockchain'
import SendCoin from '../../pages/SendCoin'
import TransactionPool from '../../pages/TransactionPool'
import Navigation from '../../components/nav/Navigation'

const RoutesContainer = () => {
    return (
        <div>
            {/* <NavBar /> */}
            <Navigation />
            <Route exact path="/" component={Home} />
            <Route exact path="/news" component={News} />
            <Route exact path="/blockchain" component={Blockchain} />
            {/* <Route exact path="/cryptocurrencies/:id" component={Detail} /> */}
            {/* <Route exact path="/cryptocurrencies" component={CryptoData} /> */}
            <Route exact path={["/cryptocurrencies/:id", "/cryptocurrencies"]} component={CryptoData} />
            <Route exact path="/user/portfolio" component={MyPortfolio} />
            <Route exact path="/blockchain/make_transaction" component={SendCoin} />
            <Route exact path="/blockchain/transactions" component={TransactionPool} />
            {/* <Route component={Page404} /> */}
        </div>
    )
}

export default RoutesContainer

// const Page404 = () => {
//     return (
//         <div>
//             <h1>Page not found! 404</h1>
//         </div>
//     )
// }