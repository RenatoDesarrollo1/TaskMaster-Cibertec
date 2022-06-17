import React from 'react'
import { AñadirTarea } from './AñadirTarea';
import { AñadirCategoria } from './AñadirCategoria';
import { EditarTarea } from './EditarTarea';

export function Form({categories, addCategory, deleteCategory, content, tasks,  addTask, editTask, selectedTask, intervalCrono}) {
    if (content === "task") {
        return (
            <AñadirTarea categories={categories} tasks={tasks} addTask={addTask} intervalCrono={intervalCrono}/>
        )
    }
    else if (content === "category") {
        return(
            <AñadirCategoria categories={categories} addCategory={addCategory} deleteCategory={deleteCategory}/>
        )
    }
    else if (content === "editTask") {
        return(
            <EditarTarea categories={categories} selectedTask={selectedTask} editTask={editTask} intervalCrono={intervalCrono}/>
        )
    }
    else {
        <div>No hay formulario para mostrar</div>
    }
  
}
