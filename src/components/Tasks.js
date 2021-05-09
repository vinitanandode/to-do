import React, {useEffect,useState} from 'react'
import styled from 'styled-components'

function Tasks() {

    const [list, setlist] = useState([])
    const [inputValue, setinputValue] = useState('')

    const OnKeyPressEvent = (e) => {
        if(e.key === "Enter"){
            list.push(inputValue);
            setinputValue('');
        }    
        console.log("this is",list);    
    }   

    return (
        <Nav>
            <Menu>
                {/* <img src="/images/complete.png"/> */}
            </Menu>
            <Container>            
                <TaskBar>                
                    <Input value={inputValue} 
                        placeholder="Enter task"
                        onKeyPress={OnKeyPressEvent}
                        onChange={(e) => {
                            setinputValue(e.target.value);
                        }}/>                    
                    <Icon>
                        <img src="/images/clear.png" onClick={() => {setinputValue('')}}/>  
                    </Icon>
                </TaskBar>
                <TaskList> 
                    {
                        list.length > 0 && 
                        list.map((inputValue) => (
                            <Wrap>
                                <InputCheckBox type="checkbox"/>
                                <TaskTitle>
                                    {inputValue}
                                </TaskTitle>
                            </Wrap>))
                    }                               
                </TaskList>
            </Container>
        </Nav>
    )
}

export default Tasks;

const Nav = styled.div`    
    display: flex;

`

const Container = styled.div`    
    padding: 10px 10px;
    width: calc(100vw- 30px);
    display: flex;
    flex-direction: column;
    margin-top: 5px;    
    align-items: center;
`

const Menu = styled.div`
    background-color: black;
    width: 80px;
    height: 100vh;
    flex-direction: column;

    img {
        width: 25px;
        padding: 0px 0px 10px 13px;        
    }
`

const TaskBar = styled.div`
    border: 1px solid;
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 5px;        
    border-radius: 5px;

    &:hover {
        box-shadow: 2px 2px 2px thistle;
    }
`

const Input = styled.input`
    min-width: 50px;
    min-height: 25px;
    width: calc(100vw - 150px);
    background-color: transparent;    
    border: 0;
    flex: 1 0;

    &:focus {
        outline: none;
    }
`

const InputCheckBox = styled.input`
    min-width: 15px;
    min-height: 15px;    
    background-color: transparent;            

    &:hover{
        box-shadow: 3px 3px 3px thistle; 
    }
`

const Icon = styled.div`
    flex: 0 0;
    justify-content: center;
    cursor: pointer;

    img {
        width: 25px;
        height: 25px;
        
    }
`

const TaskTitle = styled.div`
    padding-left: 5px;  
    display: block;  
`

const TaskList = styled.div`
    
    padding: 5px 5px;
    margin: 10px;
    width: calc(100vw - 120px);        
    border-radius: 5px;
    overflow: auto;
    position: relative;
`

const Wrap = styled.div`
    display: flex;     
    padding: 5px;  
    position: obsolute;     
   
`
