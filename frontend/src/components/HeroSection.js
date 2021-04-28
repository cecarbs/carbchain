import React from 'react'
import video from '../videos/carbcoin.mp4';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg
          src={video}
          type="video/mp4"
          autoPlay
          muted
          loop
        />
      </HeroBg>
      <HeroContent>
        <h1>CarbCoin</h1>
        <ButtonWrapper>
          <Link to="/register">
            Register
                    </Link>
          <Link to="/news">
            Enter
                    </Link>
        </ButtonWrapper>
      </HeroContent>


    </HeroContainer>
  )
}

export default HeroSection


const HeroContainer = styled.div`
  /* background: black; */
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -80px;
  max-width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%),linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
    z-index: 2;
  }

`;
const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  /* background: #0c0c0c; */
  background: #232a34;
`;

const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  
  h1 {
    color: #fff;
    font-size: 48px;
    text-align: center;
    font-family: 'Press Start 2P', cursive;

    @media screen and (max-width: 768px) {
      font-size: 24px;
    }
    @media screen and (max-width: 480px) {
      font-size: 18px;
    }
  }

  p {
    margin-top: 24px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    max-width: 600px;

    @media screen and (max-width: 768px) {
      font-size: 24px;
    }
    @media screen and (max-width: 480px) {
      font-size: 18px;
    }
  }

  a {
    text-decoration: none;
    color: #fff;
    background-color: #104246;
    padding: 1rem 3rem;
    border-radius: 0.8rem;
    letter-spacing: 1px;
    font-size: 1rem;
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);

    &:hover {
        color: #03070B;
        font-weight: 500;
        background-color: #469998;
    }
  }
`;



const ButtonWrapper = styled.div`
  padding-top: 5rem;
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  a {
    width: 5rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  &:hover {
    cursor: pointer;
  }

  span {
    color: #e63946;
  }
`;

