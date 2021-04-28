import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import Portfolio from '../components/Portfolio'
import { MyContext } from '../contextAPI/UserContext'

const MyPortfolio = () => {
    const { user } = useContext(MyContext)

    return (
        <div>
            {user ?
                <Portfolio />
                :
                <Redirect to="/login" />
            }
        </div>
    )
}

export default MyPortfolio
