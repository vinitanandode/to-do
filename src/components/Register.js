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
  setErrors,
  selectErrors,
  // selectIsError,
} from "../features/user/userSlice";

function Register() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const name = useSelector(selectUserName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  // const isError = useSelector(selectIsError);
  const errors = useSelector(selectErrors);
  const confirmPassword = useSelector(selectConfirmPassword);
  // const [errors, setErrors] = useState({});

  const setError = (field, errorMessage) => {
    console.log("erro", errorMessage);
    dispatch(setErrors({ field, errorMessage }));
    // return isError;
  };

  const signUp = (e) => {
    console.log("signuip", email + ": " + password + ": " + name);
    e.preventDefault();

    if (ValidateForm()) {
      setError("name", "");
      setError("email", "");
      setError("password", "");
      setError("confirmPassword", "");

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
          // setError(true, error);
        });
    }
  };

  const ValidateUsername = () => {
    debugger;
    let isFormValid = true;
    if (name === "") {
      isFormValid = false;
      setError("name", "Please enter name.");
    } else {
      isFormValid = true;
      setError("name", "");
    }
    return isFormValid;
  };

  const ValidateEmail = () => {
    // debugger;
    let isFormValid = true;
    if (!email) {
      isFormValid = false;
      // errors["email"] = "Please enter email.";
      setError("email", "Please enter email.");
    } else {
      isFormValid = true;
      setError("email", "");
    }

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      isFormValid = true;
      setError("email", "");
    } else {
      isFormValid = false;
      setError("email", "Enter valid email.");
    }
    // debugger;
    return isFormValid;
  };

  const ValidatePassword = () => {
    let isFormValid = true;
    if (!password) {
      isFormValid = false;
      // errors["password"] = "Please enter password.";
      setError("password", "Please enter password.");
    } else {
      isFormValid = true;
      setError("password", "");
    }
    return isFormValid;
  };

  const ValidateConfirmPassword = () => {
    let isFormValid = true;
    if (!confirmPassword) {
      isFormValid = false;
      // errors["confirmPassword"] = "Please enter confirm password.";
      setError("confirmPassword", "Please enter confirm password.");
    } else {
      isFormValid = true;
      setError("confirmPassword", "");
    }
    return isFormValid;
  };

  const ValidatePasswordMatch = () => {
    let isFormValid = true;
    if (password && confirmPassword && password !== confirmPassword) {
      isFormValid = false;
      // errors["password"] = "Password & Confirm Password doesn't match.";
      setError("password", "Password doesn't match.");
      setError("confirmPassword", "Confirmed Password doesn't match.");
    } else {
      isFormValid = true;
      setError("password", "");
      setError("confirmPassword", "");
    }
    return isFormValid;
  };

  const ValidateForm = () => {
    let isFormValid = true;
    // debugger;
    // if (name === "") {
    //   isFormValid = false;
    //   // errors["name"] = "Please enter name.";
    //   setError("name", "Please enter name.");
    // }

    // if (!email) {
    //   isFormValid = false;
    //   errors["email"] = "Please enter email.";
    //   setError("email", "Please enter email.");
    // }

    // const validRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // if (email.match(validRegex)) {
    //   // setError(false, "");
    // }

    isFormValid = ValidateUsername();
    isFormValid = ValidateEmail();
    isFormValid = ValidatePassword();
    isFormValid = ValidateConfirmPassword();
    isFormValid = ValidatePasswordMatch();

    // if (!password) {
    //   isFormValid = false;
    //   // errors["password"] = "Please enter password.";
    //   setError("password", "Please enter password.");
    // }

    // if (!confirmPassword) {
    //   isFormValid = false;
    //   // errors["confirmPassword"] = "Please enter confirm password.";
    //   setError("confirmPassword", "Please enter confirm password.");
    // }

    // if (password && confirmPassword && password !== confirmPassword) {
    //   isFormValid = false;
    //   // errors["password"] = "Password & Confirm Password doesn't match.";
    //   setError("password", "Password doesn't match.");
    //   setError("confirmPassword", "Confirmed Password doesn't match.");
    // }

    // setErrors(errors);
    return isFormValid;
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
          <FormElement>
            <span>Name *</span>
            <a>
              <input
                type="text"
                name="name"
                placeholder="What should we call you?"
                onBlur={() => ValidateUsername()}
                onChange={onNameChange}
              ></input>
              <ErrorMeesage>{errors.name}</ErrorMeesage>
            </a>
          </FormElement>
          <FormElement>
            <span>Email *</span>
            <a>
              <input
                type="text"
                onBlur={() => ValidateEmail()}
                name="email"
                placeholder="Your email address?"
                onChange={onEmailChange}
              ></input>
              <ErrorMeesage>{errors.email}</ErrorMeesage>
            </a>
          </FormElement>
          <FormElement>
            <span>Password *</span>
            <a>
              <input
                type="password"
                onBlur={() => ValidatePassword()}
                name="password"
                placeholder="Protect your account.."
                onChange={onPasswordChange}
              ></input>
              <ErrorMeesage>{errors.password}</ErrorMeesage>
            </a>
          </FormElement>
          <FormElement>
            <span>Confirm Password *</span>
            <a>
              <input
                type="password"
                onBlur={() => ValidateConfirmPassword()}
                name="confirmPassword"
                placeholder="Confirm password.."
                onChange={onConfirmPasswordChange}
              ></input>
              <ErrorMeesage>{errors.confirmPassword}</ErrorMeesage>
            </a>
          </FormElement>
          <SignupWrap onClick={signUp}>
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
  padding-top: 2px;
  font-size: 10px;
  width: 60%;
  text-align: right;
  display: flex;
  justify-content: right;
  color: red;
`;

const FormElement = styled.div`
  margin: 3px;
  width: 100%;
  display: flex;
  letter-spacing: 1px;

  span {
    width: 35%;
    padding: 10px;
    font-size: 13px;
  }

  a {
    width: 100%;

    input {
      font-size: 13px;
      font-family: inherit;
      background: linear-gradient(145deg, #e6e6e6, #ffffff);
      box-shadow: 5px 8px 10px #c2c2c2, -8px -8px 15px #ffffff;
      width: 60%;
      height: 35px;
      border-radius: 29px;
      /* border: 1px solid red; */
      border: none;
      padding-left: 15px;
      padding-right: 15px;

      &:focus {
        outline: none;
      }
    }
  }

  /* &:hover {
    ${ErrorMeesage} {
      display: flex;
      font-size: 10px;
      text-align: center;
      color: red;
    }
  } */
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
