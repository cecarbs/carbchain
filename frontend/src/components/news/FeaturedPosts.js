import React, { useState } from 'react'
import styled from 'styled-components';

const FeaturedPosts = ({ posts }) => {
    const [onHover, setOnHover] = useState(false)
    // const [onHoverTwo, setOnHoverTwo] = useState(false)
    // const [onHover, setOnHover] = useState(false)

    return (
        <FeaturedPostsContainer onHover={onHover}>
            {posts?.slice(0, 3).map((post, index) => (
                <div className="news__post" key={index}>
                    <a href={post.news_url} className="collage-post" target="_blank">
                        <img onHover={onHover} id={index} src={post.image_url} alt="" />
                    </a>
                    <div className="image-text">
                        <div className="bottom">
                            <a href={post.news_url} target="_blank">
                                <h2 onMouseOver={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} className="image-title">{post.title}</h2>
                            </a>
                            <span>{post.date.split(" ").slice(0, 4).join(" ")}</span>
                        </div>

                    </div>
                </div>
            ))}
        </FeaturedPostsContainer>
    )
}

export default FeaturedPosts

const FeaturedPostsContainer = styled.section`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: minmax(275px, 1fr) minmax(275px, 1fr);

    .news__post:nth-child(1){
        grid-area: 1 / 1 / 2 / 3;

        h2 {
            
        }

        span {
            margin-left: 240px !important;
        }

        img {
            width: 100% !important;
            object-fit: cover;
            opacity: ${({ onHover, id }) => id === 1 ? 1 : 0.5};
            transform: ${({ onHover, id }) => id === 0 ? 'scale(1.1)' : 'scale(1)'};
        }
    }
    
    .news__post:nth-child(2){
        img {
            object-fit: cover;
            /* opacity: ${({ onHover }) => onHover ? 1 : 0.5};
            transform: ${({ onHover }) => onHover ? 'scale(1.1)' : 'scale(1)'}; */
        }
    }
    .news__post:nth-child(3){
        img {
            object-fit: cover;
            /* height: 300px; */
            /* opacity: ${({ onHover }) => onHover ? 1 : 0.5};
            transform: ${({ onHover }) => onHover ? 'scale(1.1)' : 'scale(1)'}; */
        }
    }

    .collage {
        display: flex;
        flex-direction: column;
    }

    .news__post {
        position: relative;
        display: inline-block;
        text-align: center;
        color: white;

        background-color: black;
        border-radius: 8px;

        overflow: hidden;
        transition: transform 1s ease;

        &:hover {
            background-color: none;
        }

        img {
            width: 100%;
            /* border-radius: 8px; */
            border-radius: 8px 8px 0 0;
            height: 300px;

            display: block;
            transition: transform 1s ease;

            opacity: 0.5;
            
            /* &:hover {
                opacity: 1;
                transform: scale(1.1)
            } */
        }

        h2 {
            color: #eeeeee;
            position: absolute;
            bottom: 8px;
            margin: 0 auto;
            left: 0;
            right: 0;
            top: 5%; /* adjust to move value up and down*/
            /* left: 16px; */
            text-align: left;
            width: 90%; /* adjust to wrap */
            /* margin */
        }
        
        a {
            text-decoration: none;
        }

        span {
            position: absolute;
            color: lightgray;
            z-index: 10;
            transform: translateY(-30px);
            margin-left: 40px;
            
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
            border-radius: 8px;

        }
    }

    
`