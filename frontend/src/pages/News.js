import React, { useState, useEffect } from 'react';
import NewsCard from '../components/news/NewsCard'
import axios from 'axios';
import styled from 'styled-components';
import PostCollage from '../components/news/PostCollage'
import FeaturedPosts from '../components/news/FeaturedPosts.js'
import NewsPost from '../components/news/NewsPost';

const News = () => {
  const [news, setNews] = useState([])
  const [featured, setFeatured] = useState([])
  const [message, setMesasge] = useState("")
  const [data, setData] = useState()
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function getData() {
      let { data } = await axios.get('https://cryptonews-api.com/api/v1/category?section=general&items=5&token=vpwjwlmbytww0hjfywdtmlh29vkeugws7cesanuj')
      let res = await axios.get('https://cryptonews-api.com/api/v1?tickers=BTC,XRP,DOGE&items=4&token=vpwjwlmbytww0hjfywdtmlh29vkeugws7cesanuj')

      setNews(data.data)
      setFeatured(res.data.data)

    }
    getData()
  }, []);

  const searchHandler = async (e) => {
    e.preventDefault()
    console.log(search)
    let response = await axios.get(`https://cryptonews-api.com/api/v1?tickers=${search}&items=12&token=vpwjwlmbytww0hjfywdtmlh29vkeugws7cesanuj`)
    if (response.data.data.length !== 0) {
      setData(response.data.data)
    } else {
      setMesasge("I'm sorry nothing matches your criteria.")
    }

  }

  const lastPost = featured[featured.length - 1]
  return (
    <div>
      {news && lastPost && (
        <NewsCardContainer>
          <div className="row">
            <h1 className="heading">Recent News</h1>
            <section className="featured__posts">
              <FeaturedPosts posts={featured} />
              <NewsPost post={lastPost} />
            </section>
            <h1 className="second">Trending Topics</h1>
            <PostCollage posts={news} />
          </div>
          <div className="form">
            <form onSubmit={searchHandler}>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="example: BTC"></input>
              <button>Search</button>
            </form>
          </div>
          <div className="row">
            {data && <h1 className="results">Results</h1>}
            {data ?
              <NewsCard data={data} />
              :
              <p>{message}</p>
            }
          </div>
        </NewsCardContainer>)}
    </div>
  )
}

export default News

const NewsCardContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;

  .heading {
    width: 100%;
    color: white;
    font-size: 2rem;
    font-weight: 700;

  }

  .row {
    margin: 4em 20px;

    .featured__posts {
      display: flex;
      flex-direction: row;
    }

    .results {
      font-size: 2rem;
      color: white;
    }
  }

  h1 {
    text-align: left;
    font-size: 28px;
    font-weight: 500;
  }

  .second {
    padding-top: 1rem;
    color: white;
    font-size: 2rem;
    font-weight: 700;
  }

  .form {
    padding-top: 1rem;

    form {

      input {
        border-radius: 4px 0 0 4px;
        border: 1px solid gray;
        outline: none;
        padding: 8px;


        &::placeholder {
          font-style: italic;
        }
      }

      button {
        padding: 8px;
        width: 4rem;
        border-radius: 0 4px 4px 0;
        border: 1px solid gray;
        border-left: none;
        background-color: #00a9a5;
        color: white;

        &:hover {
          cursor: pointer;
          background: #092327;
        }
      }
    }
  }
`
