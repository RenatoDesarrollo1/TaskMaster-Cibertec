import React from 'react'

export function Tarea({task, selectTask}) {
    const setStyle = () => {
        return {
            color: task.categorycolor,
            backgroundColor: task.categorybg,
        }
    }
    if(task.end === "" || task.end ===" :00") {
        return(
            <div className='task' id = {task.id} onClick = {() => selectTask(task.id)}>
                <span className='category' style={setStyle()}>{task.category}</span>
                <h2>{task.title}</h2>
            </div>
        )
    }
    else {
        return (
            <div className='task' id = {task.id} onClick = {() => selectTask(task.id)}>
                <span className='category' style={setStyle()}>{task.category}</span>
                <h2>{task.title}</h2>
                <p>{task.end}</p>
            </div>
        )
    }
    
}
