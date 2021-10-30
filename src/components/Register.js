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
        <WelcomeMessage>
          Keep up with your tasks and boost your productivity.
        </WelcomeMessage>
        <RegisterForm>
          <FormElement>
            <span>Name *</span>
            <input
              type="text"
              id="name"
              placeholder="What should we call you?"
            ></input>
          </FormElement>
          <FormElement>
            <span>Email *</span>
            <input
              type="text"
              onBlur={ValidateEmail()}
              id="email"
              placeholder="Your email address?"
            ></input>
          </FormElement>
          <FormElement>
            <span>Password *</span>
            <input
              type="password"
              onBlur={ValidatePassword()}
              id="password"
              placeholder="Protect your account.."
            ></input>
          </FormElement>
          <FormElement>
            <span>Confirm Password *</span>
            <input
              type="password"
              onBlur={ValidateConfirmPassword()}
              id="confirmpassword"
              placeholder="Confirm password.."
            ></input>
          </FormElement>
          <FormElement>
            <span>Phone</span>
            <input
              type="text"
              id="phone"
              placeholder="Stay connected with us.."
            ></input>
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
  /* flex-direction: row; */

  @media (max-width: 756px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Welcome = styled.div`
  padding: 55px;
  img {
    width: 500px;
    height: 500px;
  }
`;

const Content = styled.div`
  margin-top: 10px;
  padding-right: 20px;
  width: 100%;

  @media (max-width: 756px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Banner = styled.div`
  font-size: 30px;
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
  font-size: 15px;

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
  margin: 10px;
  width: 100%;
  display: flex;
  letter-spacing: 1px;

  span {
    width: 35%;
    padding: 10px;
    font-size: 13px;
  }

  input {
    font-size: 13px;
    font-family: inherit;
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 5px 8px 10px #c2c2c2, -8px -8px 15px #ffffff;
    width: 50%;
    border-radius: 29px;
    border: none;
    padding-left: 15px;
    padding-right: 15px;

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
  padding: 5px 5px;
  margin: 10px;
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
      padding: 3px 5px 3px 5px;
      font-size: 13px;
    }
  }

  &:hover {
    border-radius: 51px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 10px 10px 28px #9f9f9f, -10px -10px 28px #ffffff;
  }
`;

export default Register;
