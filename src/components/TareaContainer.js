import React, { useEffect, useState } from 'react';
import { Tarea } from './Tarea'
import { Categories } from '../components/Categories'

export function TareaContainer({tasks, selectTask, categories, modalContent, taskCategory, setTaskCategory, setStateInfo}) {
  
  
  const [categorySel, setCategorySel] = useState("Todos");
  useEffect( () => {
    if(categorySel === "Todos") {
      setTaskCategory(tasks);
    }
    else {
      let stask = []; 
      tasks.forEach(task => {
        if(task.category === categorySel) {
          stask.push(task);
        }
      });
      setTaskCategory(stask);
    }
  }, [categorySel]
  );

  return (
    <div className='tasks'>
      <Categories categories={categories} setCategorySel={setCategorySel} modalContent={modalContent}/>
      {
        taskCategory.map((task, i) =>(
          <Tarea key={`t-${i}`} task = {task} selectTask = {selectTask}/>
        ))
      }
      <button className='task add-task' onClick={() => modalContent("task")}><i className="fa-solid fa-plus"></i></button>
    </div>
  )
}
