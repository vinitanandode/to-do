import React from "react";
import styled from "styled-components";

function TodoHeader() {
  return (
    <Container>
      <Logo>{/* <img src="/images/menu2.png" alt="Menu"/> */}</Logo>
      <Title>My To-do list</Title>
    </Container>
  );
}

export default TodoHeader;

const Container = styled.div`
  width: 100vw;
  height: 50px;
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
  padding: 0px 20px;
  padding-bottom: 5px;
`;

