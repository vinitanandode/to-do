// TODO: already have an account line, validations, verify email address flow, send welcome email flow
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import styled from "styled-components";
import imgSignup from "../images/signup2.jpg";
import { auth } from "../firebase";
import {
  setUserName,
  setUserEmail,
  // setUserPhoto,
  setUserPassword,
  setUserConfirmPassword,
  selectUserName,
  selectEmail,
  selectPassword,
  selectConfirmPassword,
  setErrorMessage,
  selectErrorMessage,
  selectIsError,
} from "../features/user/userSlice";

function Register() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const name = useSelector(selectUserName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const isError = useSelector(selectIsError);
  const errorMessage = useSelector(selectErrorMessage);
  const confirmPassword = useSelector(selectConfirmPassword);

  const setError = (isError, error) => {
    console.log("erro", error);
    const errorMessage = error.message;
    dispatch(setErrorMessage({ isError: isError, errorMessage: errorMessage }));
  };

  const signUp = () => {
    console.log("signuip", email + ": " + password + ": " + name);
    ValidateAll();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        user.sendEmailVerification().then(() => {
          console.log("email sent");
        });
        console.log("new user", user);
      })
      .catch((error) => {
        setError(true, error);
      });
  };

  const ValidateUsername = () => (e) => {
    if (name === "") {
      setError(true, { message: "Please enter name." });
    } else {
      setError(false, "");
    }
  };

  const ValidateEmail = () => (e) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (e.target.value.match(validRegex)) {
      setError(false, "");
    } else {
      setError(true, { message: "Please enter valid email." });
    }
  };

  const ValidatePassword = () => (e) => {
    if (password === "") {
      setError(true, { message: "Please enter password." });
    } else {
      setError(false, "");
    }
  };

  const ValidateConfirmPassword = () => (e) => {
    if (confirmPassword === "") {
      setError(true, { message: "Please enter confirm password." });
    }
    if (password !== confirmPassword) {
      setError(true, {
        message: "Password & Confirmed Password doesn't match.",
      });
    } else {
      setError(false, "");
    }
  };

  const ValidateAll = () => {
    console.log("validate all");
  };

  const onNameChange = (e) => {
    console.log("values", e.target.value);
    dispatch(
      setUserName({
        name: e.target.value,
      })
    );
  };

  const onEmailChange = (e) => {
    console.log("values", e.target.value);
    dispatch(
      setUserEmail({
        email: e.target.value,
      })
    );
  };

  const onPasswordChange = (e) => {
    console.log("values", e.target.value);
    dispatch(
      setUserPassword({
        password: e.target.value,
      })
    );
  };

  const onConfirmPasswordChange = (e) => {
    console.log("values", e.target.value);
    dispatch(
      setUserConfirmPassword({
        confirmPassword: e.target.value,
      })
    );
  };

  // const onPhotoChange = (e) => {
  //   console.log("values", e.target.name);
  //   setUserName({
  //     name: e.target.value,
  //   });
  // };

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
          <ErrorMeesage visible={isError}>{errorMessage}</ErrorMeesage>
          <FormElement isError={isError}>
            <span>Name *</span>
            <input
              type="text"
              name="name"
              placeholder="What should we call you?"
              onBlur={ValidateUsername()}
              onChange={onNameChange}
            ></input>
          </FormElement>
          <FormElement isError={isError}>
            <span>Email *</span>
            <input
              type="text"
              onBlur={ValidateEmail()}
              name="email"
              placeholder="Your email address?"
              onChange={onEmailChange}
            ></input>
          </FormElement>
          <FormElement>
            <span>Password *</span>
            <input
              type="password"
              onBlur={ValidatePassword()}
              name="password"
              placeholder="Protect your account.."
              onChange={onPasswordChange}
            ></input>
          </FormElement>
          <FormElement>
            <span>Confirm Password *</span>
            <input
              type="password"
              onBlur={ValidateConfirmPassword()}
              name="confirmPassword"
              placeholder="Confirm password.."
              onChange={onConfirmPasswordChange}
            ></input>
          </FormElement>
          <SignupWrap onClick={(e) => !isError && signUp} isError={isError}>
            <a>
              {/* <img src={imgGoogle} /> */}
              <span>Sign Up</span>
            </a>
          </SignupWrap>
          <LoginMessage>
            Already have an account?{" "}
            <a href="/">
              <u>Log in.</u>
            </a>
          </LoginMessage>
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

const ErrorMeesage = styled.div`
  font-size: 12px;
  color: red;
  display: ${(props) => (props.visible ? "block" : "none")};
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
    /* border: 1px solid red; */
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
  pointer-events: ${(props) => (props.isError ? "none" : "auto")};
  cursor: ${(props) => (props.isError ? "not-allowed" : "pointer")};
  transition: all 250ms ease 0s;
  border-radius: 29px;
  background: ${(props) =>
    props.isError ? "#c2c2c2" : "linear-gradient(145deg, #e6e6e6, #ffffff)"};
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
    background: "linear-gradient(145deg, #cacaca, #f0f0f0)";
    box-shadow: 10px 10px 28px #9f9f9f, -10px -10px 28px #ffffff;
  }
`;

const LoginMessage = styled.div`
  font-size: 12px;
`;

export default Register;
