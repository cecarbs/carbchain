import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const NewsCard = ({ data }) => {
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  console.log(data)
  return (
    <CardContainer>
      {data.map((el, i) => (
        <Card key={i}>
          <ImageContainer>
            <img src={el.image_url} />
          </ImageContainer>
          <CardContent>
            <CardTitle>
              <h3>{el.title}</h3>
            </CardTitle>
            <CardBody>
              <p>{truncate(el.text, 100)}</p>
            </CardBody>
          </CardContent>
          <ButtonContainer>
            <button>
              <a href={el.news_url} target="_blank">
                <a>Read More</a>
              </a>
            </button>
          </ButtonContainer>
        </Card>
      ))}
    </CardContainer>
  )
}

export default NewsCard

const CardContainer = styled.section`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: minmax(275px, 1fr) minmax(275px, 1fr) minmax(275px, 1fr);
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    background-position: center center;
    overflow: hidden;
    box-shadow: 0px 0px 15px -5px;
    transition: 0.5s;
    border-radius: 8px;
    background-color: #F5F5F5;
`;

const ImageContainer = styled.div`
  object-fit: contain;
  overflow: hidden;
  height: 250px;

  img {
    transition: transform 0.5s ease;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const CardContent = styled.div`
  margin: 1rem;
  margin-top: 0.5rem;
`;
const CardTitle = styled.div`
  margin-bottom: 0.5rem;
  height: 110px;

  h3 {
    margin: 0;
    padding: 0;
  }
`;

const CardBody = styled.div`
  display: flex;
  height: 60px;
  overflow: hidden;

  p {
    margin: 0;
    padding: 0;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;

  button {
    padding: 0.5rem;
    background-color: #F5F5F5;
    border: none;
    transition: 0.2s;
    margin-bottom: 0.5rem;
  }

  a {
    text-transform: uppercase;
    color: white;
    font-weight: bold;
    text-decoration: none;
    background-color: #0b5351;
    padding: 0.5rem;
    border-radius: 4px;
  }
`;