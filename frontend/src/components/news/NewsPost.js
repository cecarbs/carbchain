import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { MyContext } from '../../contextAPI/UserContext';

const NewsPost = ({ post }) => {
    const { user } = useContext(MyContext)
    const [onHover, setOnHover] = useState(false)

    const hoverHandler = () => {
        setOnHover(true)
    }
    return (
        <>
            <NewsPostContainer onHover={onHover}>
                <a href={post.news_url} className="collage-post">
                    <img onHover={onHover} src={post.image_url} alt="" />
                </a>
                <div className="image-text">
                    <div>
                        <a href={post.news_url} target="_blank">

                            <h2 onMouseOver={hoverHandler} onMouseLeave={() => setOnHover(false)} className="image-title">{post.title}</h2>
                        </a>
                        <span>{post.date.split(" ").slice(0, 4).join(" ")}</span>
                    </div>

                </div>

            </NewsPostContainer>
        </>
    )
}

export default NewsPost

const NewsPostContainer = styled.div`
    position: relative;
    display: inline-block;
    text-align: center;
    color: white;
    margin-left: 30px;
    border-radius: 8px;

    background-color: black;
    
    overflow: hidden;
    transition: transform 1s ease;
    

    &:hover {
        background-color: none
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        display: block;

        /* opacity: ${({ onHover }) => onHover ? 1 : 0.5};
        transform: ${({ onHover }) => onHover ? 'scale(1.1)' : 'scale(1)'}; */

        opacity: 0.5;
        transition: transform 1s ease;

        /* &:hover {
            opacity: 1;
            transform: scale(1.1)
        } */
    }

    
    h2 {
        text-decoration: none;
        color: white;
        position: absolute;
        bottom: 8px;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: 5%; /* adjust to move value up and down*/
        /* left: 16px; */
        text-align: center;
        width: 60%; /* adjust to wrap */

        &:hover {
            opacity: 1;
            /* img {

            }
            background-color: none; */
        }
    }
    
    .collage-post {
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        background-size: cover;
        background-position: center center;
        height: 100%;
        width: 100%;
        text-decoration: none;
        margin: 0 auto;
    }

    span {
        position: absolute;
        color: lightgray;
        z-index: 10;
        transform: translateY(-30px);
        margin-left: 40px;
    }
    /* .overlay::before {
        z-index: 1;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, transparent 0%, transparent 18%, rgba(0,0,0,0.8) 99%, rgba(0,0,0,0.8) 100%)
    } */
`