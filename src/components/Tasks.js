import React, { useEffect } from "react";
import styled from "styled-components";
import db, { auth } from "../firebase";
import {
  addTask,
  setTasks,
  updateTaskName,
  selectNewTask,
  selectTasks,
  updateTaskStatus,
  updateTaskTitle,
  updateTaskPriority,
  deleteStateTask,
  // getCompleted,
  // getPending,
} from "../features/task/taskSlice";
import {
  selectUserName,
  selectPhoto,
  selectEmail,
  setSignOut,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-tabs/style/react-tabs.css";
import RichTextEditor from "react-rte";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from "react-router-dom";
import imgDelete from "../images/delete.png";
import imgAllTasks from "../images/alltasks.png";
import imgPending from "../images/pending.png";
import imgDone from "../images/done.png";
import imgLogout from "../images/logout.png";
import imgClear from "../images/clear.png";
// import imgEdit from "../images/edit.png";
import imgImp from "../images/imp.png";

function Tasks() {
  const dispatch = useDispatch();
  const newTask = useSelector(selectNewTask);
  const tasklist = useSelector(selectTasks);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectEmail);
  const userPhoto = useSelector(selectPhoto);
  RichTextEditor.createEmptyValue();
  const history = useHistory();

  useEffect(() => {
    getDbTasks();
  }, []);

  const getDbTasks = async () => {
    const templist = [];
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
    dispatch(setTasks(response));
  };

  const getPendingDbTasks = async () => {
    const templist = [];
    const response = await db
      .collection(userEmail)
      .doc("tasks")
      .collection("taskList")
      .where("completed", "==", false)
      .orderBy("dateadded", "desc")
      .get()
      .then((snap) => {
        snap.forEach(function (doc) {
          const tdata = { id: doc.id, ...doc.data() };
          templist.push(tdata);
        });
        return templist;
      });
    dispatch(setTasks(response));
  };

  const getCompletedDbTasks = async () => {
    const templist = [];
    const response = await db
      .collection(userEmail)
      .doc("tasks")
      .collection("taskList")
      .where("completed", "==", true)
      .orderBy("dateadded", "desc")
      .get()
      .then((snap) => {
        snap.forEach(function (doc) {
          const tdata = { id: doc.id, ...doc.data() };
          templist.push(tdata);
        });
        return templist;
      });
    dispatch(setTasks(response));
  };

  const OnKeyPressEvent = (e) => {
    if (e.key === "Enter") {
      console.log("new task", newTask);
      const addDbTask = async () => {
        const response = await db
          .collection(userEmail)
          .doc("tasks")
          .collection("taskList")
          .add(newTask);
        newTask.id = response.id;
        dispatch(addTask(newTask));
      };
      addDbTask();
      e.target.value = "";
    }
  };

  const onChangeEvent = (e) => {
    dispatch(updateTaskName(e.target.value));
  };

  const onCheckboxClick = (id) => (e) => {
    const updateDbStatus = async () => {
      await db
        .collection(userEmail)
        .doc("tasks")
        .collection("taskList")
        .doc(id)
        .update({
          completed: e.target.checked,
        });
    };
    updateDbStatus();
    const udpateDbTask = {
      completed: e.target.checked,
      id: id,
    };
    dispatch(updateTaskStatus(udpateDbTask));
  };

  const onTitleChange = (id) => (e) => {
    if (e.key === "Enter") {
      const updateDbTask = async () => {
        await db
          .collection(userEmail)
          .doc("tasks")
          .collection("taskList")
          .doc(id)
          .update({
            title: e.target.value,
          });
      };
      updateDbTask();
      const udpateDbTask = {
        title: e.target.value,
        id: id,
      };
      dispatch(updateTaskTitle(udpateDbTask));
    }
  };

  const deleteTask = (id) => {
    console.log("deleed task:", id);
    const deleteDbTask = async () => {
      db.collection(userEmail)
        .doc("tasks")
        .collection("taskList")
        .doc(id)
        .delete();
    };
    deleteDbTask();
    console.log("delete id from db");
    const taskDeleted = {
      id: id,
    };
    console.log("delete id", taskDeleted);
    dispatch(deleteStateTask(taskDeleted));
  };

  const importantTask = (id, imp) => {
    console.log("imp id", id);
    const updateDbTask = async () => {
      await db
        .collection(userEmail)
        .doc("tasks")
        .collection("taskList")
        .doc(id)
        .update({
          important: !imp,
        });
    };
    updateDbTask();
    const udpateDbTask = {
      important: !imp,
      id: id,
    };
    dispatch(updateTaskPriority(udpateDbTask));
  };

  const logOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
    history.push("/");
  };

  const getCompletedTasks = () => {
    getCompletedDbTasks();
    // dispatch(getCompleted());
  };

  const getPendingTasks = () => {
    getPendingDbTasks();
    // dispatch(getPending());
  };

  return (
    <Nav>
      <FilterContainer>
        <UserContainer>
          <UserImage>
            <img src={userPhoto} />
          </UserImage>
          <UserInfo>
            Welcome <br></br> {userName} !
          </UserInfo>
        </UserContainer>
        <Filter>
          <FilterWrap onClick={getDbTasks} type="radio">
            <a>
              <img src={imgAllTasks} alt="All Tasks" />
              All Tasks
            </a>
            {/* <div>{tasklist.length}</div> */}
          </FilterWrap>
          <FilterWrap onClick={getPendingTasks}>
            <a>
              <img src={imgPending} alt="Pending Tasks" />
              Pending Tasks
            </a>
            {/* <div>{tasklist.filter((a) => a.completed === false).length}</div> */}
          </FilterWrap>
          <FilterWrap onClick={getCompletedTasks}>
            <a>
              <img src={imgDone} alt="Completed Tasks" />
              Completed
            </a>
            {/* <div>{tasklist.filter((a) => a.completed === true).length}</div> */}
          </FilterWrap>
          <FilterWrap onClick={logOut}>
            <a>
              <img src={imgLogout} alt="Log out" />
              Log out
            </a>
          </FilterWrap>
        </Filter>
      </FilterContainer>
      <Container>
        <TaskBar>
          <Input
            placeholder="Enter task"
            onKeyPress={OnKeyPressEvent}
            onChange={onChangeEvent}
          />
          <Icon>
            <img src={imgClear} alt="Clear Text" />
          </Icon>
        </TaskBar>
        <TaskList>
          {tasklist &&
            tasklist.map((task) => (
              <Wrap key={task.id} important={task.important}>
                <InputCheckBox
                  type="checkbox"
                  id={task.id}
                  defaultChecked={task.completed}
                  onChange={onCheckboxClick(task.id)}
                />
                <TaskTitle
                  type="text"
                  defaultValue={task.title}
                  onKeyPress={onTitleChange(task.id)}
                  important={task.important}
                ></TaskTitle>
                <ActionContainer>
                  <Action>
                    <a>
                      <img
                        src={imgImp}
                        onClick={() => importantTask(task.id, task.important)}
                        alt="Importamt Task"
                      />
                    </a>
                  </Action>
                  <Action>
                    <a>
                      <img
                        src={imgDelete}
                        onClick={() => deleteTask(task.id)}
                        alt="Delete Task"
                      />
                    </a>
                  </Action>
                </ActionContainer>
              </Wrap>
            ))}
        </TaskList>
      </Container>
    </Nav>
  );
}

export default Tasks;

const Nav = styled.div`
  display: flex;
  background-color: grey;
  min-height: calc(100vh - 50px);
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  padding: 10px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  align-items: center;
`;

const TaskBar = styled.div`
  border: 3px solid rgba(249, 249, 249, 0.1);
  background-color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 5px;
  width: 90%;
  border-radius: 10px;

  &:hover {
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  }
`;

const Input = styled.input`
  min-height: 25px;
  background-color: transparent;
  border: 0;
  flex: 1 0;
  font-size: 15px;

  &:focus {
    outline: none;
  }
`;

const InputCheckBox = styled.input`
  min-width: 15px;
  min-height: 15px;
  background-color: transparent;

  &:hover {
    box-shadow: 3px 3px 3px thistle;
  }
`;

const Icon = styled.div`
  flex: 0 0;
  justify-content: center;
  cursor: pointer;

  img {
    width: 25px;
    height: 25px;
  }
`;

const TaskTitle = styled.input`
  padding-left: 5px;
  border: 0;
  text-decoration: none;
  background-color: ${(props) => (props.important ? "red" : "white")};

  &:focus {
    outline: none;
  }
`;

const TaskList = styled.div`
  border: 1px thin;
  background-color: white;
  padding: 5px 5px;
  margin: 10px;
  width: 90%;
  height: 70vh;
  overflow: scroll;
  border-radius: 10px;
  position: relative;
`;

const Wrap = styled.div`
  background-color: ${(props) => (props.important ? "red" : "white")};
  border: 1px solid rgba(249, 249, 249, 0.1);
  border-radius: 10px;
  display: flex;
  padding: 5px;
  position: obsolute;
  margin: 10px;
  align-items: center;
  border-radius: 16px;
  /* background: linear-gradient(145deg, #ffffff, #e6e6e6); */
  box-shadow: 5px 5px 10px #a6a6a6, -5px -5px 10px #ffffff;
`;

const ActionContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Action = styled.div`
  a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  a img {
    padding: 2px;
    margin: 2px;
    width: 20px;
    height: 20px;
  }
`;

const FilterContainer = styled.div`
  width: 450px;
  height: 90%;
  background-color: white;
  margin: 30px 15px 30px 30px;
  border-radius: 12px;
  flex-direction: column;
  display: flex;
`;

const Filter = styled.ul`
  padding: 0;
`;

const FilterWrap = styled.li`
  font-size: 12px;
  padding: 5px 10px;
  letter-spacing: 2px;
  align-items: center;
  display: flex;
  border-radius: 5px;
  cursor: pointer;
  margin: 0;

  a {
    font-size: 15px;
    padding: 0;
    display: flex;
    flex: 1;
    text-align: center;
    align-items: center;

    img {
      margin: 5px;
      width: 20px;
      height: 20px;
    }

    &:active {
      background: red;
      /* box-shadow: 20px 20px 60px #adadad, -20px -20px 60px #ffffff; */
    }

    &:hover {
      /* background-color: grey; */
      background: #ffffff;
      box-shadow: 20px 20px 60px #adadad, -20px -20px 60px #ffffff;
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px 30px;
`;

const UserImage = styled.div`
  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;
