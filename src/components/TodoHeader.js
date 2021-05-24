import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectUserName,
  selectPhoto,
  setSignOut,
} from "../features/user/userSlice";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function TodoHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectPhoto);

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <Container>
      <Logo>
        <img src="/images/menu2.png" alt="Menu" />
      </Logo>
      <Title>My To-do list</Title>
    </Container>
  );
}

export default TodoHeader;

const Container = styled.div`
  width: 100vw;
  min-height: 100%;
  background-color: black;
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
`;

const Logo = styled.div`
  align-items: center;

  img {
    width: 30px;
    padding: 0px 10px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const User = styled.div`
  align-content: center;

  img {
    width: 40px;
    height: 40px;
    padding: 0px 10px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
