import React, {useEffect} from "react";
import styled from "styled-components";
import db from "../firebase";
import { 
       addTask, 
       setTasks, 
       updateTaskName, 
       selectNewTask, 
       selectTasks, 
       updateTaskStatus 
} from '../features/task/taskSlice';
import {selectUserName, selectPhoto, selectEmail} from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function Tasks() {

    const dispatch = useDispatch();    
    const newTask = useSelector(selectNewTask);
    const tasklist = useSelector(selectTasks);
    const userName = useSelector(selectUserName);
    const userEmail = useSelector(selectEmail);
    const userPhoto = useSelector(selectPhoto);

    useEffect(() => { 
        console.log("user name: ",userName);
        console.log("user photo: ",userPhoto);
        console.log("user email: ",userEmail);  

        const getDbTasks = async () => {
            let templist = [];            
            const response = await db.collection(userEmail)
                                    .orderBy('dateadded', 'desc')                                   
                                    .get()
                                    .then((snap) => {
                                        snap.forEach(function(doc) {
                                            const tdata = {id: doc.id, ...doc.data()}
                                            templist.push(tdata);
                                        });
                                        return templist;
                                    })
            console.log("response", response);              
            dispatch(setTasks(response));
            console.log("response", tasklist); 
        };
        getDbTasks();
    }, [])

    const OnKeyPressEvent = (e) => {
        if(e.key === "Enter"){
            const addDbTask = async () => {
                console.log("key press newtask", newTask);
                const response = await db.collection(userEmail).add(newTask);
                console.log("key press response", response);                
                dispatch(addTask(newTask));   
            }
            addDbTask();
            e.target.value = '';                          
        }            
    }   

    const onChangeEvent = (e) => {      
        console.log(e.target.value);
        dispatch(updateTaskName(e.target.value));
    }

    const onCheckboxClick = id => e => {        
        console.log("checkbox event",userEmail);
        console.log(id);
        
        

        const updateDbStatus = async () => {
            const response = await db.collection(userEmail).doc(id).update({
                                        completed: e.target.checked
                                    })                                                           
        }
        updateDbStatus();   
        const udpateDbTask = {
            completed: e.target.checked,
            id: id
        } 
        dispatch(updateTaskStatus(udpateDbTask));  
    }

    return (
        <Nav>
            <Menu>
                {/* <img src="/images/complete.png"/> */}
            </Menu>
            <Container>            
                <TaskBar>                             
                    <Input
                        placeholder="Enter task"
                        onKeyPress={OnKeyPressEvent}
                        onChange={onChangeEvent}                        
                         />                    
                    <Icon>
                        <img src="/images/clear.png" alt="Clear Text"/>  
                    </Icon>
                </TaskBar>
                <TaskList> 
                    {                          
                       tasklist && tasklist.map((task) => (
                        <Wrap key={task.id}>
                            <InputCheckBox type="checkbox" id={task.id}                             
                            defaultChecked={task.completed}
                            onChange={onCheckboxClick(task.id)}
                            />
                            <TaskTitle>
                                {task.title}
                            </TaskTitle>
                        </Wrap>
                        ))                                                                  
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
    min-height: calc(100vh - 50px);
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
