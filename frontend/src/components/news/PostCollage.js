import React from 'react'
// import NewsPost from './NewsPost';
import styled from 'styled-components';

const PostCollage = ({ posts }) => {

    return (
        <CollageContainer className="collage" >
            {posts?.map((post, index) => (
                // <NewsPost className="post" {...{ post, index, tags, key: index }} />
                <div className="news__post" key={index}>
                    <a href={post.news_url} className="collage-post">
                        <img src={post.image_url} alt="" />
                    </a>
                    <div className="image-text">
                        <div className="bottom">
                            <a href={post.news_url} target="_blank">
                                <h2 className="image-title">{post.title}</h2>
                            </a>
                            <span>{post.date.split(" ").slice(0, 4).join(" ")}</span>
                        </div>

                    </div>
                </div>
            ))}
        </CollageContainer>

    )
}

export default PostCollage

const CollageContainer = styled.section`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: minmax(275px, 1fr) minmax(275px, 1fr) minmax(275px, 1fr);

    .news__post:nth-child(2){
        object-fit: contain;
        grid-area: 1 / 2 / 3 / 3;

        img {
            width: 100% !important;
            object-fit: cover;
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
        
        /* &::before {
            z-index: 1;
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 8px;
            background: linear-gradient(180deg, transparent 0%, transparent 18%, rgba(0,0,0,0.6) 99%, rgba(0,0,0,0.8) 100%)
            } */
        
        img {
            width: 100%;
            border-radius: 8px;
            height: 100%;

            display: block;

            opacity: 0.5;
            transition: transform 1s ease;

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
            text-align: center;
            width: 60%; /* adjust to wrap */
            z-index: 10;
            font-size: 20px;
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

        span {
            position: absolute;
            color: lightgray;
            z-index: 10;
            transform: translateY(-30px);
            margin-left: 40px;
        }
    }
`
