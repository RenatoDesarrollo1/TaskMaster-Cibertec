import React, { useEffect, useState } from 'react'

export function TareaInfo({tasks, setTask, deleteTask, selectTask, crono, setCrono, intervalCrono, setIntervalCrono, modalContent, stateInfo, setStateInfo}) {

  const [start] = useState(() => {
    let date = new Date();
    return Number(date.getFullYear() *  31557600) + Number((date.getMonth() + 1) * 2629800) + Number(date.getDate()* 86400) + Number(date.getHours() * 3600) + Number(date.getMinutes() * 60) + Number(date.getSeconds())});

  const [cronoFirst, setCronoFirst] = useState(0);
  const [cronoS, setCronoS] = useState(0);

  useEffect(() => {
     if(selectTask !== " " && selectTask.end !== "" && selectTask.state ==="En progreso") {
      setCrono("Cargando");
      let dateE = selectTask.end.split(" ")[0];
      let timeE = selectTask.end.split(" ")[1];


      let datetimeE = Number(dateE.split("-")[0] *  31557600) + Number(dateE.split("-")[1] * 2629800) + Number(dateE.split("-")[2] * 86400) + Number(timeE.split(":")[0] * 3600) + Number(timeE.split(":")[1] * 60) + Number(timeE.split(":")[2]);

      let date = new Date();

      let datetimeS = Number(date.getFullYear() *  31557600) + Number((date.getMonth() + 1) * 2629800) + Number(date.getDate()* 86400) + Number(date.getHours() * 3600) + Number(date.getMinutes() * 60) + Number(date.getSeconds());
      
      setCronoFirst(datetimeE - start);
      
      intervalCrono = setInterval(() => {
        setIntervalCrono(intervalCrono);

        let cronoSec = 0;

        let date = new Date();

        datetimeS = Number(date.getFullYear() *  31557600) + Number((date.getMonth() + 1) * 2629800) + Number(date.getDate()* 86400) + Number(date.getHours() * 3600) + Number(date.getMinutes() * 60) + Number(date.getSeconds());

        cronoSec = datetimeE - datetimeS;
        setCronoS(cronoSec);

        let hour = Math.trunc(cronoSec * 0.000277778);
        let min = Math.trunc(cronoSec * 0.01666668 - (60 * hour));
        let seg = cronoSec - (60 * min);

        

        if (cronoSec >= 3600) {
            seg = cronoSec - ((3600 * hour) + (60 * min));
        }
        

        setCrono(String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(seg).padStart(2, '0'));
        
        if (cronoSec <= 0) {
          setCrono("Terminado");
          setTask(tasks.map((task) => {
            return task.id === selectTask.id ? {...task, state: "Terminado"} : {...task};
          }))
          clearInterval(intervalCrono);
        }
      }, 1000) 

    }
  }, [selectTask, ])

  const setStyle = () => {
    return {
        color: selectTask.categorycolor,
        backgroundColor: selectTask.categorybg,
    }
  }


  
  const setCategoryStyle = () => {
    let phase1 = cronoFirst;
    let phase2 = Math.trunc(2 * cronoFirst/3);
    let phase3 = Math.trunc(cronoFirst/3);

    if(cronoS <= phase1 && cronoS >= phase2) {
      return {
        color: "green"
      }
    }
    else if(cronoS <= phase2 && cronoS >= phase3) {
      return {
        color: "#E5BE01"
      }
    }
    else {
      return {
        color: "red"
      }
    }
  }
 
  const setStateSideInfo = () => {
    if(window.innerWidth < 885) {
      if(stateInfo === true) {
        return {
          left: "calc(100% - 320px)"
        }
      }
      else if(stateInfo === false) {
        return {
          left: "100%"
        }
      }
     }
    }

  const flechaStyle = () => {
    if(window.innerWidth < 885) {
      if(stateInfo === true) {
        return {
          display: "block"
        }
      }
      else if(stateInfo === false) {
        return {
          display: "none"
        }
      }
    }
  }

  if(selectTask !== " " && (selectTask.end === "" || selectTask.end === " :00")) {
    return (
    <div className='task-info' style={setStateSideInfo()}>
     <button className='button-info' style={flechaStyle()} onClick={() => setStateInfo(false)}><i className="fa-solid fa-angle-right"></i></button>
     <div className='task-info-header'>
       <h2>{selectTask.title}</h2>
       <span style={setStyle()}>{selectTask.category}</span>
     </div>
     <div className='task-info-body'>
       <div>
         <p>Descripción: </p>
         <label>{selectTask.description}</label>
       </div>
      </div>
      <div className='task-info-footer'>
        <button onClick={() => modalContent("editTask")}>Editar</button>
        <button onClick={() => deleteTask(selectTask.id)}>Eliminar</button>
      </div>
    </div>
    )
  }
  if(selectTask !== " " && (selectTask.end !== "" || selectTask.end !== " :00")) {
    return (
    <div className='task-info' style={setStateSideInfo()}>
      <button className='button-info' style={flechaStyle()} onClick={() => setStateInfo(false)}><i className="fa-solid fa-angle-right" onClick={() => setStateInfo(false)}></i></button>
      <div className='task-info-header'>
        <h2>{selectTask.title}</h2>
        <span style={setStyle()}>{selectTask.category}</span>
      </div>
      <div className='task-info-body'>
        <div>
          <p>Descripción: </p>
          <label>{selectTask.description}</label>
        </div>
        <div>
          <p>Inicio: </p>
          <label>{selectTask.start}</label>
        </div>
        <div>
          <p>Final: </p>
          <label>{selectTask.end}</label>
        </div>
      </div>
      <div className='task-info-footer'>
          <h1 className='timer' style={setCategoryStyle()}> <i className="fa-solid fa-clock"></i> {crono}</h1>
          <button onClick={() => modalContent("editTask")}>Editar</button>
          <button onClick={() => deleteTask(selectTask.id)}>Eliminar</button>
      </div>
   </div>
    )
  }
  else {
    return (
      <div className='task-info'>
        <div className='task-info-none'>
          Seleccione una tarea
        </div>
      </div>
    ) 
    }
}
