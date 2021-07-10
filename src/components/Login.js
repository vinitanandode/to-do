import React, {useEffect} from 'react'
import styled from 'styled-components';
import { auth, provider} from '../firebase';
import { useDispatch } from 'react-redux';
import { setUserLogin} from '../features/user/userSlice'
import { useHistory } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        auth.onAuthStateChanged(async (user) =>{
          if(user){
            dispatch(setUserLogin({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL
            }))
            history.push("/home")
          }
        })
      }, [])
    
    const logIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user
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
            <Welcome>
                <img src="/images/bg.jpg"/>
            </Welcome>
            <Content>
                <Banner>
                    <span>My to-do list</span>
                </Banner>
                <WelcomeMessage>                
                    Keep up with your tasks and boost your productivity.
                </WelcomeMessage>
                <Features>
                    <a>
                        <img src="/images/check2.png"/>
                        <span>Keep all your tasks at one place</span>
                    </a>
                    <a>
                        <img src="/images/check2.png"/>
                        <span>Manage your tasks from any device</span>
                    </a>
                    <a>
                        <img src="/images/check2.png"/>
                        <span>Get overview of pending and completed tasks</span>
                    </a>
                </Features>
                <LoginWrap onClick={logIn}>
                    <a>
                        <img src="/images/google.svg"/>
                        <span>Sign in with Google</span>
                    </a>                
                </LoginWrap>
            </Content>
        </Container>
    )
}

export default Login

const Container = styled.div`
    background-color: white;
    padding: 10px 10px;
    width: calc(100vw- 30px);
    display: flex;    
    margin-top: 5px;    
    /* align-items: center; */
    flex-direction: row;
    /* justify-content: center; */

    @media(max-width: 756px){
        flex-direction: column;
        align-items: center;
    }
`

const Content = styled.div`
    /* top:0; */
    margin-top: 60px;
    /* border: 1px solid black; */
    
    @media(max-width: 756px){
        display:flex;
        flex-direction: column;
        align-items: center;
    }
`

const Welcome = styled.div`

    img{
        /* border: 1px solid black; */
        /* width: 500px;
        height: 500px; */
    }
`

const LoginWrap = styled.div`
    /* border: 1px solid;     */
    width: 50%;
    /* border-radius: 5px; */
    padding: 5px 10px;
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
box-shadow:  8px 8px 15px #c2c2c2,
             -8px -8px 15px #ffffff;

    @media(max-width: 756px){
        
    }

    a{  
        display: flex;
        align-items: center;

        img{        
        padding: 5px 5px;        
        }

    span{
        padding: 5px 5px;
    }

    }
    
    &:hover{
        /* background-color: white;
        color: #000;
        border-color: transparent; */
        border-radius: 51px;
background: linear-gradient(145deg, #cacaca, #f0f0f0);
box-shadow:  10px 10px 28px #9f9f9f,
             -10px -10px 28px #ffffff;
    }
`

const WelcomeMessage = styled.div`
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 25px;
    /* display: flex; */

    @media(max-width: 756px){        
        text-align: center;
    }
`

const Features = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 30px;

    @media(max-width: 756px){
        /* align-items: center; */
        /* justify-content: center; */

    }

    a{
        display: flex;
        align-items: center;
        img{
            padding: 5px 10px;
            width: 20px;
            height: 20px;
        }

        span{
            /* padding: 5px 10px; */
        }
    }
`

const Banner = styled.div`
    font-size: 50px;
    font-weight: 1500;
    margin-bottom: 10px;
`

