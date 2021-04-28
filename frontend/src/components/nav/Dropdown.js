

import React, { useState, useContext } from 'react';
// import { MenuItems } from './MenuItems';
// import './Dropdown.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MyContext } from '../../contextAPI/UserContext';

function Dropdown({ menuItems }) {
    const [click, setClick] = useState(false);
    const { setUser } = useContext(MyContext)
    const handleClick = () => setClick(!click);

    let length = menuItems.length

    const logoutHandler = () => {
        if (length === 1) {
            setUser(false)
        }
    }
    return (
        <DropdownContainer length={length}>
            <ul
                onClick={handleClick}
                className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            >
                {menuItems.map((item, index) => {
                    return (
                        <li key={index} onClick={logoutHandler}>
                            <Link
                                className={item.cName}
                                to={item.path}
                                onClick={() => setClick(false)}
                            >
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </DropdownContainer>
    );
}

export default Dropdown;

const DropdownContainer = styled.div`
    .dropdown-menu {
        width: 200px;
        position: absolute;
        top: 80px;
        /* transform: translateX(-180px); */
        transform: ${({ length }) => length === 2 ? 'translateX(-180px)' : 'translate(-180px, -19px)'};
        list-style: none;
        text-align: start;
        z-index: 10;

    a {
        text-decoration: none;
        padding-left: 1rem;
        color: white;
    }
}

    .dropdown-menu li {
        background-color: #00a9a5;
        cursor: pointer;
        /* padding-bottom: 1rem; */
        padding: .5rem;

        &:nth-child(1) {
            /* padding-top: 1rem; */
        }
    }

    .dropdown-menu li:hover {
        /* background: #5cabff; */
        background: #0b3531;
    }

    .dropdown-menu.clicked {
        display: none;
    }

    .dropdown-link {
        display: block;
        height: 100%;
        width: 100%;
        text-decoration: none;
        color: #fff;
        padding: 16px;
    }

    @media screen and (max-width: 960px) {
        .fa-caret-down {
            display: none;
        }
    }
`