import { useLocation } from 'react-router-dom'
import styled from "styled-components";

const Footer = () => {
  const location = useLocation()

  return (
    <FooterContainer router={location.pathname}>
      <div className="information">
        <p>
          <span>©</span> 2021 CarbChain
        </p>
      </div>

    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: ${({ router }) => (router === "/" || router === "/login" || router === "/login/" || router === "/register" || router === "/register/" ? "none" : "flex")};
  flex-direction: row;
  background-color: #092327;
  align-items: center;
  padding: 0.5rem calc((100vw - 1200px) / 2);
  justify-content: center;
  margin-top: auto;
  /* position: absolute; */

  .information {
    padding: 0 4rem;

    p {
      color: #f1faee;
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    padding: 0 4rem;

    a {
      color: #e63946;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-bottom: 0.75;
    }
  }

  @media screen and (max-width: 678px) {
    display: ${({ router }) => (router === "/" ? "none" : "flex")};
    flex-direction: column;
    z-index: 1000;
    text-align: left;
    align-items: center;
    justify-content: space-between;

    .information {
      padding: 0;

      p {
        font-weight: 500;
        margin-bottom: 12px;
      }
    }

    .links {
      justify-content: center;
      display: flex;
      flex-direction: row;
      width: 100%;
      text-align: center;
      padding: 0;
      a {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 0.75rem;
      }
    }
  }
`;
export default Footer;
