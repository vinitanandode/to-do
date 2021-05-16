import React, {useEffect, useState} from "react";
import styled from "styled-components";
import db from "../firebase";
import { 
       addTask, 
       setTasks, 
       updateTaskName, 
       selectNewTask, 
       selectTasks, 
       updateTaskStatus,
       deleteStateTask
} from '../features/task/taskSlice';
import {selectUserName, selectPhoto, selectEmail} from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

function Tasks() {

    const dispatch = useDispatch();    
    const newTask = useSelector(selectNewTask);
    const tasklist = useSelector(selectTasks);
    const userName = useSelector(selectUserName);
    const userEmail = useSelector(selectEmail);
    const userPhoto = useSelector(selectPhoto);

    //const [tasklist, settasklist] = useState([]);

    useEffect(() => { 
        console.log("user name: ",userName);
        console.log("user photo: ",userPhoto);
        console.log("user email: ",userEmail);  

        const getDbTasks = async () => {
            let templist = [];            
            const response = await db.collection("vinita.nandode@gmail.com")
                                    .orderBy('dateadded', 'desc')                                   
                                    .get()
                                    .then((snap) => {
                                        snap.forEach(function(doc) {
                                            const tdata = {id: doc.id, ...doc.data()}
                                            templist.push(tdata);
                                        });
                                        return templist;
                                    })
            console.log("response load", response);              
            dispatch(setTasks(response));            
            console.log("response state", tasklist); 
        };
        getDbTasks();
    }, [])

    const OnKeyPressEvent = (e) => {
        if(e.key === "Enter"){
            const addDbTask = async () => {
                console.log("key press newtask", newTask);
                const response = await db.collection("vinita.nandode@gmail.com").add(newTask);
                console.log("key press response", response.id);  
                newTask.id = response.id;              
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
            const response = await db.collection("vinita.nandode@gmail.com").doc(id).update({
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

    const deleteTask = (id) => {
        console.log("clicked");
        console.log(id);
        const deleteDbTask = async () => {
            const response = await db.collection("vinita.nandode@gmail.com").doc(id).delete();                                                           
        }
        deleteDbTask(); 
        const taskDeleted = {            
            id: id
        } 
        console.log("task to be deleted from state", taskDeleted);
        dispatch(deleteStateTask(taskDeleted)); 
    }

    return (
        <Nav>                      
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
                            <ActionContainer>
                                <img src="/images/delete.png" onClick={() => deleteTask(task.id)}/>
                            </ActionContainer>
                        </Wrap>
                        ))                                                                  
                    }                               
                </TaskList>
            </Container>
            <NotesContainer>

            </NotesContainer>
        </Nav>
    )
}

export default Tasks;

const Nav = styled.div`    
    
    background-color: grey;
    min-height: calc(100vh - 50px);
    padding: 0 calc(3.5vw + 5px);
    overflow: hidden;
    position:relative;
`

const Container = styled.div`    
    padding: 10px 10px;
    /* width: calc(100vw- 30px); */
    width: 50%;
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
    border: 3px solid rgba(249, 249, 249, 0.1);
    background-color: rgba(249, 249, 249, 0.8);;
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 5px;  
    width: 100%;      
    border-radius: 10px;
    
    &:hover {
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
      }
`

const Input = styled.input`
    /* min-width: 50px; */
    min-height: 25px;
    /* width: calc(100vw - 150px); */
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
        
`

const TaskList = styled.div`
    border: 1px thin;
    background-color: rgba(249, 249, 249, 0.8);;
    padding: 5px 5px;
    margin: 10px;
    width: 100%;
    height: 100%;
    border-radius: 10px;    
    position: relative;
`

const Wrap = styled.div`
    border: 1px solid rgba(249, 249, 249, 0.1);
    border-radius: 10px; 
    background-color: rgb(186,189,194);
    display: flex;     
    padding: 5px;  
    position: obsolute;     
    margin: 10px;
    align-items: center;   
    
`
const ActionContainer = styled.div`         
    display: flex;
    flex:1;
    justify-content: flex-end;
    cursor: pointer;    
    
    img{
        width: 20px;
        height: 20px;
    }
`
const NotesContainer = styled.div`
    width: 50%;
`
