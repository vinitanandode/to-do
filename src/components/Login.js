import React, {useEffect} from 'react'
import styled from 'styled-components';
import db, { auth, provider} from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {selectUserName, selectEmail, selectPhoto, setUserLogin} from '../features/user/userSlice'
import { useHistory } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch()
    const userName = useSelector(selectUserName);
    // const userEmail = useSelector(selectEmail);
    // const userPhoto = useSelector(selectPhoto);
    const history = useHistory()

    useEffect(()=>{
        auth.onAuthStateChanged(async (user) =>{
          if(user){
            console.log("user",user);  
            dispatch(setUserLogin({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL
            }))
            console.log("state user name",userName);
            history.push("/home")
          }
        })
      }, [])
    
    const logIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            history.push("/home");
        })        
    }

    return (
        <Container>
            <LoginWrap onClick={logIn}>
                Login
            </LoginWrap>
        </Container>
    )
}

export default Login

const Container = styled.div`
    background-color: white;
    padding: 10px 10px;
    width: calc(100vw- 30px);
    display: flex;
    flex-direction: column;
    margin-top: 5px;    
    align-items: center;
`

const LoginWrap = styled.div`
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



