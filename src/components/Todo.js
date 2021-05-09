import React from 'react'
import styled from 'styled-components';
import Tasks from './Tasks';
import TaskHeader from './TodoHeader';

function Todo() {
    return (
        <>
        <TaskHeader/>                   
        <Tasks/>                     
        </>
    )
}

export default Todo
