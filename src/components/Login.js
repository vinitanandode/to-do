// TODO: Already have an account line, validation on login, verify email address flow
import React, { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserLogin,
  selectEmail,
  selectPassword,
  setUserEmail,
  setUserPassword,
  // setErrorMessage,
  // selectErrorMessage,
  // selectIsError,
} from "../features/user/userSlice";
import { useHistory } from "react-router-dom";
import imgBg from "../images/bg.jpg";
import imgCheck from "../images/check2.png";
import imgGoogle from "../images/google.svg";
import imgGitHub from "../images/GitHub.png";
import imgMyLogo from "../images/my-todo-logo.png";

function Login() {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  // const isError = useSelector(selectIsError);
  // const errorMessage = useSelector(selectErrorMessage);
  const history = useHistory();

  useEffect(() => {
    // setError(false, "");
    // auth.onAuthStateChanged(async (user) => {
    //   if (user) {
    //     if (user.emailVerified) {
    //       dispatch(
    //         setUserLogin({
    //           name: user.displayName,
    //           email: user.email,
    //           photo: user.photoURL,
    //         })
    //       );
    //       history.push("/home");
    //     } else {
    //       history.push("/verify");
    //     }
    //   } else {
    //     history.push("/");
    //   }
    // });
  }, []);

  const setError = (isError, error) => {
    console.log("erro", error);
    // const errorMessage = error.message;
    // dispatch(setErrorMessage({ isError: isError, errorMessage: errorMessage }));
  };

  const googleSignUp = () => {
    setError(false, "");
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      console.log("git user", user);
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      history.push("/home");
    });
  };

  const signIn = () => {
    setError(false, "");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          if (user.emailVerified) {
            dispatch(
              setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
              })
            );
            history.push("/home");
          } else {
            history.push("/verify");
          }
        } else {
          history.push("/");
        }
      })
      .catch((error) => {
        setError(true, error);
      });
  };

  const signUp = () => {
    setError(false, "");
    console.log("signuip");
    history.push("/register");
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

  const ValidateEmail = () => (e) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (e.target.value.match(validRegex)) {
      console.log("valid email");
    } else {
      console.log("invalid email");
    }
  };

  return (
    <Container>
      <Welcome>
        <img src={imgBg} alt="My to-do list banner" />
      </Welcome>
      <Content>
        <Banner>
          <img src={imgMyLogo} />
          <span>My to-do list</span>
        </Banner>
        <WelcomeMessage>
          Keep up with your tasks and boost your productivity.
        </WelcomeMessage>
        <Features>
          <a>
            <img src={imgCheck} alt="Check" />
            <span>Keep all your tasks at one place</span>
          </a>
          <a>
            <img src={imgCheck} alt="Check" />
            <span>Manage your tasks from any device</span>
          </a>
          <a>
            <img src={imgCheck} alt="Check" />
            <span>Get overview of pending and completed tasks</span>
          </a>
        </Features>
        <Actions>
          <LoginContent>
            {/* <ErrorMeesage visible={isError}>{errorMessage}</ErrorMeesage> */}
            <FormElement>
              <span>Email *</span>
              <input
                type="text"
                id="name"
                placeholder="Enter your Email"
                onChange={onEmailChange}
              ></input>
            </FormElement>
            <FormElement>
              <span>Password *</span>
              <input
                type="password"
                onBlur={ValidateEmail()}
                id="email"
                placeholder="Enter your Password"
                onChange={onPasswordChange}
              ></input>
            </FormElement>
            <SignInWrap onClick={signIn} id="btnSignIn">
              <a>
                <span>Sign In</span>
              </a>
            </SignInWrap>
          </LoginContent>
          <Separator />
          <SignUpContent>
            <Wrap onClick={signUp}>
              <a>
                {/* <img src={imgGoogle} /> */}
                <span>Sign Up</span>
              </a>
            </Wrap>
            <Wrap onClick={googleSignUp}>
              <a>
                <img src={imgGoogle} alt="Google" />
                <span>Sign in with Google</span>
              </a>
            </Wrap>
            <Wrap onClick={googleSignUp}>
              <a>
                <img src={imgGitHub} alt="Git hub" />
                <span>Sign in with Git Hub</span>
              </a>
            </Wrap>
          </SignUpContent>
        </Actions>
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  background-color: white;
  padding: 10px 10px;
  width: calc(100vw- 30px);
  display: flex;
  margin-top: 5px;

  @media (max-width: 756px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Welcome = styled.div``;

const Content = styled.div`
  margin-top: 10px;
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
  display: flex;
  align-items: center;
  /* justify-content: center; */

  img {
    padding-right: 10px;
    width: 50px;
    height: 50px;
  }
`;

const WelcomeMessage = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 15px;

  @media (max-width: 756px) {
    text-align: center;
  }
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 40px;

  @media (max-width: 756px) {
  }

  a {
    display: flex;
    align-items: center;
    img {
      padding: 5px 10px;
      width: 15px;
      height: 15px;
    }

    span {
      font-size: 13px;
    }
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
`;

const LoginContent = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const ErrorMeesage = styled.div`
//   font-size: 12px;
//   color: red;
//   display: ${(props) => (props.visible ? "block" : "none")};
// `;

const FormElement = styled.div`
  margin: 10px;
  margin-left: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  letter-spacing: 1px;

  span {
    width: 25%;
    padding: 8px;
    font-size: 13px;
  }

  input {
    font-size: 13px;
    padding: 8px;
    padding-left: 12px;
    font-family: inherit;
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 1px 1px 10px #c2c2c2, -1px -1px 10px #ffffff;
    width: 55%;
    border-radius: 29px;
    border: none;

    &:focus {
      outline: none;
      border-radius: 51px;
      background: linear-gradient(145deg, #cacaca, #f0f0f0);
      box-shadow: 10px 10px 28px #9f9f9f, -10px -10px 28px #ffffff;
    }
  }
`;

const SignInWrap = styled.div`
  width: 50%;
  padding: 5px 5px;
  /* margin-left: 0px; */
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

const Separator = styled.div`
  margin-top: 20px;
  border-left: 1px solid #c2c2c2;
  height: 170px;
`;

const SignUpContent = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  width: 70%;
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

    img {
      width: 19px;
      height: 19px;
      padding: 3px 3px;
    }

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
