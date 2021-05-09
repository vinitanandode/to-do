import React from 'react'
import styled from 'styled-components'

function TodoHeader() {
    return (
        <Container>
            <Logo>
                <img src="/images/menu2.png"/>
            </Logo>
            <Title>
                My To-do list
            </Title>            
            <Login>
                Login
            </Login>
            <SignUp>
                Sign Up
            </SignUp>
            <User>
                <img src="/images/vini.png"/>
            </User>            
        </Container>        
    )
}

export default TodoHeader

const Container = styled.div`
    width: 100vw;
    height: 50px;
    background-color: black;
    color: white;
    align-items: center;
    justify-content: center;
    display: flex;  
    position: relative;  
`

const Logo = styled.div`    
align-items: center;

img {
    width: 30px;
    padding: 0px 10px;
}
`

const Title = styled.div`
    font-size: 20px; 
    flex: 1;
    display: flex;
    align-items: center;  
    padding-bottom: 5px;      
`

const User = styled.div`    
    align-content: center;    

img {    
    width: 50px;
    padding: 0px 10px;    
}
`

const Login = styled.div`
    border: 1px solid;    
    border-radius: 5px;
    padding: 5px 10px;
    margin: 10px;    
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease 0s;

    &:hover{
        background-color: white;
        color: #000;
        border-color: transparent;

    }
`

const SignUp = styled.div`
    border: 1px solid;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease 0s;

    &:hover{
        background-color: white;
        color: #000;
        border-color: transparent;

    }
`