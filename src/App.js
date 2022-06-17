import './App.css';
import { useEffect, useState } from 'react';
import { Cabecera } from "./components/Cabecera"
import { Tareas } from './pages/Tareas';
import { Form } from './components/Form';

export function App() {
  const [tasks, setTask] = useState([]);

  const [categories, setCategories] = useState([{
    "category": "Sin categoría",
    "categorybg": "white",
    "categorycolor": "black"
  }]);
  
  const [crono, setCrono] = useState([])
  const [cronoS, setCronoS] = useState([])

  useEffect(() => {
    let dataTask = localStorage.getItem("tasks");
    let dataCat = localStorage.getItem("categories");
    if(dataTask) {
      setTask(JSON.parse(dataTask));
      setTaskCategory(JSON.parse(dataTask));
    }
    if(dataCat) {
      setCategories(JSON.parse(dataCat));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [ tasks, categories ])
  
  
  const [intervalCrono, setIntervalCrono] = useState(" ");
  
  const [selectedTask, setselectedTask] = useState(" ");

  const [taskCategory, setTaskCategory] = useState(tasks);

  const [stateModal, setStateModal] = useState(false);
  const [contentModal, setContentModal] = useState(" ");
  
  

  const modalContent = (content) => { 
    setContentModal(content);
    setStateModal(!stateModal);
  }

  const modalStyle = () => {
    if(contentModal !== " " && stateModal === true) {
      
      if (stateModal) {
        return {
          display: 'flex'
        }
      }
      else {
        return {
          display: 'none'
        }
      }
    }
  }
  const addTask = (task) => {
    clearInterval(intervalCrono);
    setTask([...tasks, task]);
    setTaskCategory([...tasks, task]);
    setStateModal(false);
  }

  const deleteTask = (id) => {
    console.log(id);
    setTask([...tasks].filter(task => task.id !== id));
    setTaskCategory([...tasks].filter(task => task.id !== id));
    clearInterval(intervalCrono);
    setselectedTask(" ");
  }

  const editTask = (t) => {
    clearInterval(intervalCrono);
    let id = t.id;
    let title = t.title;
    let description = t.description;
    let category = t.category;
    let categorybg = t.categorybg;
    let categorycolor = t.categorycolor;
    let start = t.start;
    let end = t.end;
    let state = t.state;

    setTask(tasks.map((task) => {
      return task.id === id ? {...task, title:title, description:description, category:category, categorybg:categorybg, categorycolor:categorycolor, start:start, end:end, state:state} : {...task};
    }));
    setTaskCategory(tasks.map((task) => {
      return task.id === id ? {...task, title:title, description:description, category:category, categorybg:categorybg, categorycolor:categorycolor, start:start, end:end, state:state} : {...task};
    }));
    setselectedTask(t);
    
    setStateModal(false);
  }
  

  const addCategory = (category) => {
    setCategories([...categories, category])
  }

  const deleteCategory = (cat) => {
    setCategories([...categories].filter(category => category.category !== cat));

    setTask(tasks.map((task) => {
      return task.category === cat ? {...task, category: "Sin categoría", categorybg: "white", categorycolor: "black"} : {...task};
    }));

    setTaskCategory(tasks.map((task) => {
      return task.category === cat ? {...task, category: "Sin categoría", categorybg: "white", categorycolor: "black"} : {...task};
    }));
  }

  console.log(tasks);

  const [stateInfo, setStateInfo] = useState(false);

  return (
    <div className="container">
      <header>
        <Cabecera></Cabecera>
      </header>
          <Tareas tasks = {tasks} setTask={setTask} deleteTask={deleteTask} selectedTask={selectedTask} setselectedTask={setselectedTask} categories = {categories} modalContent={modalContent} taskCategory={taskCategory} setTaskCategory={setTaskCategory} intervalCrono={intervalCrono} setIntervalCrono={setIntervalCrono} crono={crono} setCrono={setCrono}/>
      <div className='form-container' style={modalStyle()}>
          <div className='task-form'>
              <i className="fa-solid fa-xmark form-mark" onClick={() => modalContent(" ")}></i>
              <Form categories={categories} addCategory={addCategory} deleteCategory={deleteCategory} content={contentModal} tasks={tasks} addTask={addTask} editTask={editTask} selectedTask={selectedTask} intervalCrono={intervalCrono} />
          </div>
      </div>
    </div>
  );
}

