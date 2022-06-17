import React, { useState } from 'react';
import { TareaContainer } from '../components/TareaContainer'
import { TareaInfo } from '../components/TareaInfo'

export function Tareas({tasks, setTask, deleteTask, selectedTask, setselectedTask, categories, modalContent, taskCategory, setTaskCategory, intervalCrono, setIntervalCrono,  crono, setCrono}) {
  
  const [stateInfo, setStateInfo] = useState(false);

  const selectTask = (id) => {
    clearInterval(intervalCrono);
    if (window.innerWidth < 885) {
      setStateInfo(true);
    }
    tasks.forEach(task => {
      if(task.id === Number(id)) {
        setselectedTask(task);
      }
    });
  }



  return (
    <div className='task-container'>
        <TareaContainer tasks={tasks} selectTask={selectTask} categories={categories} modalContent={modalContent} taskCategory={taskCategory} setTaskCategory={setTaskCategory}/>
        <TareaInfo tasks={tasks} setTask={setTask} deleteTask={deleteTask} selectTask={selectedTask} crono={crono} setCrono={setCrono} intervalCrono={intervalCrono} setIntervalCrono = {setIntervalCrono} modalContent={modalContent} stateInfo={stateInfo} setStateInfo={setStateInfo}/>
    </div>
  )
}
