import React from "react";
import styled from "styled-components";
import imgTick from "../images/check2.png";

function Verify() {
  // useEffect(() => {
  //   const { search } = useLocation();
  //   let query = React.useMemo(() => new URLSearchParams(search), [search]);
  //   query.get("i");
  // }, []);

  return (
    <Hero>
      <Banner>
        <a href="/">
          <span>My to-do list</span>
        </a>
      </Banner>
      <img src={imgTick}></img>
      <Header>
        <span>Congratulations</span>
        <span>Your account has been created.</span>
      </Header>
      <MessageOne>
        <span>We&apos;re happy you signed up for My to-do List.</span>

        <span>We have sent an email to {}</span>
      </MessageOne>
      <MessageTwo>
        <span>
          Just click on the link in the email to complete your signup.
        </span>
        <span>
          If you don&apos;t see the email, you need to check your spam folder.
        </span>
      </MessageTwo>
      <MessageThree>
        <span>Still can&apos;t find the email?</span>
        <Resend>Resend Email</Resend>
        <span>
          Need help? <a>Contact Us</a>
        </span>
      </MessageThree>
    </Hero>
  );
}

export default Verify;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw- 30px);
  min-height: calc(100vh - 250px);
  /* height: calc(); */
  margin: 10px;
  overflow: hidden;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Banner = styled.div`
  font-size: 30px;
  font-weight: 1500;
  margin-top: 50px;
  margin-bottom: 10px;

  a {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 22px;
  font-weight: 1500;
  padding: 10px;
`;

const MessageOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;

const MessageTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  font-size: 13px;
`;

const MessageThree = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
  font-size: 13px;
`;

const Resend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 10px;
  width: 80%;
  border-radius: 51px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 250ms ease 0s;
  border-radius: 29px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 8px 8px 15px #c2c2c2, -8px -8px 15px #ffffff;
`;
