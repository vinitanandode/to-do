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
          <span>Sign Up</span>
        </Banner>
        <WelcomeMessage>
          Keep up with your tasks and boost your productivity.
        </WelcomeMessage>
        <RegisterForm>
          <FormElement>
            <span>Name *</span>
            <input type="text" id="name"></input>
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
          <LoginWrap onClick={signUp}>
            <a>
              {/* <img src={imgGoogle} /> */}
              <span>Sign Up</span>
            </a>
          </LoginWrap>
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
  /* align-items: center; */
  flex-direction: row;
  /* justify-content: center; */

  @media (max-width: 756px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Content = styled.div`
  /* top:0; */
  margin-top: 60px;
  padding-right: 20px;
  /* align-items: center; */
  /* justify-content: middle; */
  /* border: 1px solid black; */

  @media (max-width: 756px) {
    display: flex;
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

const RegisterForm = styled.div`
  margin: 40px 40px;
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
    width: 50%;
    padding: 10px;
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

const LoginWrap = styled.div`
  width: 70%;
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

const WelcomeMessage = styled.div`
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 25px;

  @media (max-width: 756px) {
    text-align: center;
  }
`;

const Banner = styled.div`
  font-size: 50px;
  font-weight: 1500;
  margin-bottom: 10px;
`;

export default Register;
