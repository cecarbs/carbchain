import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { MyContext } from '../../contextAPI/UserContext'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Navbar() {
    const location = useLocation()
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const { user } = useContext(MyContext)
    const [userDD, setUserDD] = useState(false)
    const logoutRef = useRef()

    useEffect(() => {

        if (user) {
            let handler = (e) => {
                if (!logoutRef.current.contains(e.target)) {
                    setUserDD(false)
                }
            }
            document.addEventListener("mousedown", handler)

            return () => {
                document.removeEventListener("mousedown", handler)
            }
        }
    })


    const menuItems = [
        {
            title: "Transactions",
            path: "/blockchain/transactions",
        },
        {
            title: "Send Coins",
            path: "/blockchain/make_transaction",
        },
    ]

    const userItems = [
        {
            title: "Logout",
            path: "/news"
        }
    ]

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    return (
        <NavContainer location={location.pathname}>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu} style={{ fontFamily: "'Press Start 2P', cursive" }}>CarbCoin</Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/news' className='nav-links' onClick={closeMobileMenu}>News</Link>
                    </li>
                    <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <Link to='/blockchain' className='nav-links' onClick={closeMobileMenu}>Blockchain <i className='fas fa-caret-down' /></Link>
                        {dropdown && <Dropdown menuItems={menuItems} />}
                    </li>
                    <li className='nav-item'>
                        <Link to='/cryptocurrencies' className='nav-links' onClick={closeMobileMenu}>Crytocurrencies</Link>
                    </li>
                    {user ?
                        <li className='nav-item'>
                            <Link to='/user/portfolio' className='nav-links' onClick={closeMobileMenu}>My Portfolio</Link>
                        </li>
                        :
                        <li className='nav-item'>
                            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>Log In</Link>
                        </li>
                    }
                </ul>
                {user ? <div ref={logoutRef}>
                    <AccountCircleIcon onClick={() => setUserDD(!userDD)} className="avatar" />
                    {userDD && <Dropdown menuItems={userItems} />}
                </div>
                    :
                    <Link to="/register" onClick={closeMobileMenu}>
                        <button className="register">Register</button>
                    </Link>}
            </nav>
        </NavContainer>
    );
}

// style={{ color: "white", fontSize: "2.5rem", paddingLeft: "1rem", transform: "translateX(-30px)", cursor: "pointer" }}

export default Navbar;
// onClick={() => setUserDD(!userDD)
const NavContainer = styled.div`

  .navbar {
    background-color: #092327;
    height: 80px;
    display: ${({ location }) => location === "/login/" || location === "/login" || location === "/register/" || location === "/register" ? "none" : "flex"};
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;

    }

    .navbar-logo {
        color: #fff;
        justify-self: start;
        margin-left: 20px;
        cursor: pointer;
        text-decoration: none;
        font-size: 2rem;
    }

    .fa-firstdraft {
        margin-left: 0.5rem;
        font-size: 1.6rem;
    }

    .nav-menu {
        display: grid;
        grid-template-columns: repeat(4, auto);
        grid-gap: 10px;
        list-style: none;
        text-align: center;
        width: 45vw;
        justify-content: end;
        margin-right: 2rem;
    }

    .nav-item {
        display: flex;
        align-items: center;
        height: 80px;
    }

    .nav-item:nth-child(4) {
        margin-left: 5rem;
    }

    .nav-links {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
    }

    .nav-links:hover {
        background-color: #00a9a5;
        border-radius: 8px;
        transition: all 0.2s ease-out;
    }

    .fa-bars {
        color: #fff;
    }

    .nav-links-mobile {
        display: none;
    }

    .menu-icon {
        display: none;
    }

    .register {
        padding: 8px 16px;
        border-radius: 8px;
        outline: none;
        border: none;
        font-size: 18px;
        color: #fff;
        color: black;
        cursor: pointer;
        background-color: #00a9a5;

        &:hover {
            /* padding: 6: */
            transition: all 0.3s ease-out;
            background-color: transparent;
            color: #fff;
            border: 2px solid #0b5351;
        }
    }

    .avatar {
        color: white;
        font-size: 2.5rem;
        padding-left: 1rem;
        transform: translateX(-30px);
        cursor: pointer;

        &:hover {
            color: #00a9a5;
            transition: all 0.3s ease;
        }
    }

    @media screen and (max-width: 960px) {
        .NavbarItems {
            position: relative;
        }

        .nav-menu {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 90vh;
            position: absolute;
            top: 80px;
            left: -100%;
            opacity: 1;
            transition: all 0.5s ease;
        }

        .nav-menu.active {
            background: #242222;
            left: 0;
            opacity: 1;
            transition: all 0.5s ease;
            z-index: 1;
        }

        .nav-links {
            text-align: center;
            padding: 2rem;
            width: 100%;
            display: table;
        }

        .nav-links:hover {
            background-color: #00a9a5;
            border-radius: 0;
        }

        .navbar-logo {
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(25%, 50%);
        }

        .menu-icon {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(-100%, 60%);
            font-size: 1.8rem;
            cursor: pointer;
        }

        .fa-times {
            color: #fff;
            font-size: 2rem;
        }

        .nav-links-mobile {
            display: block;
            text-align: center;
            padding: 1.5rem;
            margin: 2rem auto;
            border-radius: 4px;
            width: 80%;
            background: #1888ff;
            text-decoration: none;
            color: #fff;
            font-size: 1.5rem;
        }

        .nav-links-mobile:hover {
            background: #fff;
            color: #1888ff;
            transition: 250ms;
        }

        .register {
            display: none;
        }
    }
`