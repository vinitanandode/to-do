import React, { useEffect, useState } from "react";
import styled from "styled-components";
import db from "../firebase";
import {
  addTask,
  setTasks,
  updateTaskName,
  selectNewTask,
  selectTasks,
  updateTaskStatus,
  deleteStateTask,
  selectCompletedTasks,
  selectPendingTasks,
} from "../features/task/taskSlice";
import {
  selectUserName,
  selectPhoto,
  selectEmail,
  setSignOut,
} from "../features/user/userSlice";
import { setNotes, selectNotes } from "../features/notes/notesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import RichTextEditor from "react-rte";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

function Tasks() {
  const dispatch = useDispatch();
  const newTask = useSelector(selectNewTask);
  const tasklist = useSelector(selectTasks);
  const completedtasklist = useSelector(selectCompletedTasks);
  const pendingtasklist = useSelector(selectPendingTasks);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectEmail);
  const userPhoto = useSelector(selectPhoto);
  const noteslist = useSelector(selectNotes);
  const history = useHistory();

  // const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [tasktoshow, settasktoshow] = useState(tasklist);

  useEffect(() => {
    console.log("user name: ", userName);
    console.log("user photo: ", userPhoto);
    console.log("user email: ", userEmail);

    const getDbTasks = async () => {
      let templist = [];
      const response = await db
        .collection(userEmail)
        .doc("tasks")
        .collection("taskList")
        .orderBy("dateadded", "desc")
        .get()
        .then((snap) => {
          snap.forEach(function (doc) {
            const tdata = { id: doc.id, ...doc.data() };
            templist.push(tdata);
          });
          return templist;
        });
      console.log("response load", response);
      dispatch(setTasks(response));
      console.log("response state", tasklist);
    };
    //getDbTasks();

    const getDbNotes = async () => {
      let tempnotelist = [];
      const response = await db
        .collection(userEmail)
        .doc("notes")
        .collection("notes")
        .get()
        .then((snap) => {
          snap.forEach(function (doc) {
            const tdata = { id: doc.id, ...doc.data() };
            tempnotelist.push(tdata);
          });
          return tempnotelist;
        });
      console.log("response load note", response);
      dispatch(setNotes(response));
      console.log("response state note", noteslist);
    };
    //getDbNotes();
  }, []);

  const OnKeyPressEvent = (e) => {
    if (e.key === "Enter") {
      const addDbTask = async () => {
        console.log("key press newtask", newTask);
        const response = await db
          .collection(userEmail)
          .doc("tasks")
          .collection("taskList")
          .add(newTask);
        console.log("key press response", response.id);
        newTask.id = response.id;
        dispatch(addTask(newTask));
      };
      addDbTask();
      e.target.value = "";
    }
  };

  const onChangeEvent = (e) => {
    console.log(e.target.value);
    dispatch(updateTaskName(e.target.value));
  };

  const onCheckboxClick = (id) => (e) => {
    console.log("checkbox value", e.target.checked);
    console.log(id);

    const updateDbStatus = async () => {
      const response = await db
        .collection(userEmail)
        .doc("tasks")
        .collection("taskList")
        .doc(id)
        .update({
          completed: e.target.checked,
        });
    };
    updateDbStatus();
    let udpateDbTask = {
      completed: e.target.checked,
      id: id,
    };
    console.log("updated task", udpateDbTask);
    dispatch(updateTaskStatus(udpateDbTask));
    console.log("checkbox event after checked", udpateDbTask);
  };

  const deleteTask = (id) => {
    console.log("clicked");
    console.log(id);
    const deleteDbTask = async () => {
      const response = await db
        .collection(userEmail)
        .doc("tasks")
        .collection("taskList")
        .doc(id)
        .delete();
    };
    deleteDbTask();
    const taskDeleted = {
      id: id,
    };
    console.log("task to be deleted from state", taskDeleted);
    dispatch(deleteStateTask(taskDeleted));
  };

  const showAllTasks = () => {
    console.log("click all", completedtasklist);
  };

  const showCompletedTasks = () => {
    console.log("click completed", completedtasklist);
  };

  const showPendingTasks = () => {
    console.log("click completed", pendingtasklist);
  };

  const updateNote = (e) => {
    console.log("test update", e);

    // const updateDbNotes = async () => {
    //     const response = await db.collection("vinita.nandode@gmail.com")
    //                             .doc("notes")
    //                             .collection("notes")
    //                             .doc(id)
    //                             .update({
    //                                 text: ""
    //                             })
    // }
    // updateDbNotes();
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <Container>
      <LeftSide>
        <ContactCard>
          <ContactBackground />
          <a>
            <Photo />
            <UserInfo>Welcome Vini Nandode !</UserInfo>
          </a>
        </ContactCard>
        <Menu>
          <MenuWrap>
            <a>
              <span>All Tasks</span>
              <img></img>
            </a>
          </MenuWrap>
          <MenuWrap>
            <a>
              <span>Completed</span>
              <img></img>
            </a>
          </MenuWrap>
        </Menu>
      </LeftSide>
      <Main>
        Main
        <TaskBar></TaskBar>
        <TaskList></TaskList>
      </Main>
    </Container>
    //         <Nav>
    //         <FilterContainer>
    //         <UserProfile>
    //             <UserImage src={userPhoto}/>
    //             <UserName>
    //                 {userName}
    //             </UserName>
    //         </UserProfile>
    //         <FilterWrap>
    //             <img src="/images/home2.png"/>
    //             <a>Home</a>
    //         </FilterWrap>
    //         <FilterWrap>
    //             <img src="/images/alltasks2.png"/>
    //             <a onClick={showAllTasks}>All Tasks</a>
    //             <div>{tasklist.length}</div>
    //         </FilterWrap>
    //         <FilterWrap>
    //             <img src="/images/done2.png"/>
    //             <a onClick={showCompletedTasks}>Completed</a>
    //             <div>{tasklist.filter(a => a.completed === true).length}</div>
    //         </FilterWrap>
    //         <FilterWrap>
    //             <img src="/images/pending2.png"/>
    //             <a onClick={showPendingTasks}>Pending</a>
    //             <div>{tasklist.filter(a => a.completed === false).length}</div>
    //         </FilterWrap>
    //         <FilterWrap>
    //             <img src="/images/logout4.png"/>
    //             <a onClick={signOut}>Sign Out</a>
    //         </FilterWrap>
    //     </FilterContainer>
    //     <Container>
    //         <TaskBar>
    //             <Input
    //                 placeholder="Enter task"
    //                 onKeyPress={OnKeyPressEvent}
    //                 onChange={onChangeEvent}
    //                  />
    //             <Icon>
    //                 <AddTask>Add</AddTask>
    //             </Icon>
    //         </TaskBar>
    //         <TaskList>
    //             {
    //                tasklist && tasklist.map((task) => (
    //                 <Wrap key={task.id}>
    //                     <InputCheckBox type="checkbox" id={task.id}
    //                     defaultChecked={task.completed}
    //                     onChange={onCheckboxClick(task.id)}
    //                     />
    //                     <TaskTitle>
    //                         {task.title}
    //                     </TaskTitle>
    //                     <ActionContainer>
    //                         <img src="/images/delete.png" onClick={() => deleteTask(task.id)}/>
    //                     </ActionContainer>
    //                 </Wrap>
    //                 ))
    //             }
    //         </TaskList>
    //     </Container>
    // </Nav>
  );
}

export default Tasks;

const Container = styled.div`
  display: grid;
  grid-template-areas: "leftside main";
  margin: 25px 0;
  column-gap: 25px;
  /* border: 1px solid; */
`;

const LeftSide = styled.div`
  grid-area: "leftside";
  margin: 5px 0 8px 20px;
  /* border: 1px solid; */
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
`;

const ContactCard = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  border-radius: 12px;
`;

const ContactBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  background-image: url("/images/photo.svg");
  width: 72px;
  height: 72px;
  background-repeat: no-repeat;
  box-sizing: border-box;
  border: 2px solid white;
  background-color: white;
  background-position: center;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  font-weight: 600;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 12px;

  a {
    display: flex;
    flex-direction: column;

    span {
      display: flex;
      align-items: left;
    }
  }
`;

const Main = styled.div``;

const TaskBar = styled.div``;

const TaskList = styled.div``;
