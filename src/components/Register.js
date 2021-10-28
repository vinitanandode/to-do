import React from "react";
import styled from "styled-components";
import imgSignup from "../images/signup2.jpg";

const signUp = () => {
  console.log("signuip");
  ValidateAll();
};

const ValidatePassword = () => (e) => {
  console.log("text", e.target.value);
};

const ValidateConfirmPassword = () => (e) => {
  console.log("text", e.target.value);
};

const ValidateEmail = () => (e) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (e.target.value.match(validRegex)) {
    console.log("valid email");
  } else {
    console.log("invalid email");
  }
};

const ValidateAll = () => {
  console.log("validate all");
};

function Register() {
  return (
    <Container>
      <Welcome>
        <img src={imgSignup} />
      </Welcome>
      <Content>
        <Banner>
          <a href="./Login">
            <span>My to-do list</span>
          </a>
        </Banner>
        <WelcomeMessage>Sign Up</WelcomeMessage>
        <RegisterForm>
          <FormElement>
            <span>Name *</span>
            <input type="text" id="name" placeholder="Enter your Name"></input>
          </FormElement>
          <FormElement>
            <span>Email *</span>
            <input type="text" onBlur={ValidateEmail()} id="email"></input>
          </FormElement>
          <FormElement>
            <span>Password *</span>
            <input
              type="text"
              onBlur={ValidatePassword()}
              id="password"
            ></input>
          </FormElement>
          <FormElement>
            <span>Confirm Password *</span>
            <input
              type="text"
              onBlur={ValidateConfirmPassword()}
              id="confirmpassword"
            ></input>
          </FormElement>
          <FormElement>
            <span>Phone</span>
            <input type="text" id="phone"></input>
          </FormElement>
          <SignupWrap onClick={signUp}>
            <a>
              {/* <img src={imgGoogle} /> */}
              <span>Sign Up</span>
            </a>
          </SignupWrap>
        </RegisterForm>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  padding: 10px 10px;
  width: calc(100vw- 30px);
  display: flex;
  margin-top: 5px;
  flex-direction: row;

  @media (max-width: 756px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Welcome = styled.div`
  padding: 20px;
  img {
    width: 500px;
    height: 500px;
  }
`;

const Content = styled.div`
  margin-top: 60px;
  padding-right: 20px;
  width: 100%;

  @media (max-width: 756px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Banner = styled.div`
  font-size: 50px;
  font-weight: 1500;
  margin-bottom: 10px;

  a {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;

const WelcomeMessage = styled.div`
  margin-bottom: 20px;
  /* margin-left: 7px; */
  font-weight: 500;
  font-size: 30px;

  @media (max-width: 756px) {
    text-align: center;
  }
`;

const RegisterForm = styled.div`
  /* margin: 40px 40px; */
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormElement = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  letter-spacing: 1px;

  span {
    width: 35%;
    padding: 12px;
  }

  input {
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 5px 8px 10px #c2c2c2, -8px -8px 15px #ffffff;
    width: 50%;
    border-radius: 29px;
    border: none;
    padding-left: 15px;

    &:focus {
      outline: none;
      border-radius: 51px;
      background: linear-gradient(145deg, #cacaca, #f0f0f0);
      box-shadow: 10px 10px 28px #9f9f9f, -10px -10px 28px #ffffff;
    }
  }
`;

const SignupWrap = styled.div`
  width: 50%;
  padding: 5px 10px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 250ms ease 0s;
  border-radius: 29px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 8px 8px 15px #c2c2c2, -8px -8px 15px #ffffff;

  @media (max-width: 756px) {
  }

  a {
    display: flex;
    align-items: center;

    span {
      padding: 5px 5px;
    }
  }

  &:hover {
    border-radius: 51px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 10px 10px 28px #9f9f9f, -10px -10px 28px #ffffff;
  }
`;

export default Register;
