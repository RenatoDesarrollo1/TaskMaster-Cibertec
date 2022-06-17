import React, {useEffect, useState} from 'react'

export function EditarTarea({categories, selectedTask, editTask, intervalCrono}) {
    const [stateDate, setStateDate] = useState(true);
    const [stateTime, setStateTime] = useState(true);


    const getActualDate = () => {
        let date = new Date();
        return stateDate === false ? (String(date.getFullYear()) + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + " " + String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0')): " ";   
    }
    const [title, setTitle] = useState(selectedTask.title);
    const [description, setDescription] = useState(selectedTask.description);
    const [category, setCategory] = useState({
        category: selectedTask.category,
        categorybg: selectedTask.categorybg,
        categorycolor: selectedTask.categorycolor
    });
    const [dateEnd, setDateEnd] = useState(()=>{return selectedTask.end !== "" ? selectedTask.end.split(" ")[0] : ""});
    const [timeEnd, setTimeEnd] = useState(()=>{return selectedTask.end !== "" ? selectedTask.end.split(" ")[1] : ""});

    const validateDate = (e) => {
        let dateTS = getActualDate();
        let dateS = dateTS.split(" ")[0];
        let timeS = dateTS.split(" ")[1];
        let dateE = e.currentTarget.value;
        if(dateE.split("-")[0] < dateS.split("-")[0]) {
            e.currentTarget.value = " ";
            setDateEnd("");
            setStateTime(true);
        } 
        else if (dateE.split("-")[1] < dateS.split("-")[1]) {
            e.currentTarget.value = " ";
            setDateEnd("");
            setStateTime(true);
        }
        else if (dateE.split("-")[2] < dateS.split("-")[2]) {
            e.currentTarget.value = " ";
            setDateEnd("");
            setStateTime(true);
        }
        
        else if (dateE.split("-")[0] >= dateS.split("-")[0] && dateE.split("-")[1] >= dateS.split("-")[1] && dateE.split("-")[2] >= dateS.split("-")[2]){
            setDateEnd(dateE);
            setStateTime(false);
            setTimeEnd(timeS.split(":")[0] + ":" + String(Number(timeS.split(":")[1]) + 1));
        }

    }

    const validateTime = (e) => {
        let dateTS = getActualDate();
        let dateS = dateTS.split(" ")[0];
        let timeS = dateTS.split(" ")[1];
        let dateE = dateEnd;
        let timeE = e.currentTarget.value;
        
        if (dateE.split("-")[0] === dateS.split("-")[0] && dateE.split("-")[1] === dateS.split("-")[1] && dateE.split("-")[2] === dateS.split("-")[2]) {
            if (timeE.split(":")[0] === timeS.split(":")[0]) {
                if(timeE.split(":")[1] > timeS.split(":")[1]) {
                    setTimeEnd(timeE);
                }
                else {
                    e.currentTarget.value = "";
                    setTimeEnd("");
                }
            }
            else if (timeE.split(":")[0] >= timeS.split(":")[0]){
                setTimeEnd(timeE);
            }
            else {
                e.currentTarget.value = "";
                setTimeEnd("");
            }
        }
        else {
            setTimeEnd(timeE);
        }
    }

    const editTaskAdd = (e) => {
        e.preventDefault();
        clearInterval(intervalCrono);
        let target = e.target;
        if(target.title.value === "") {
            editTask({
                id: Number(target.id.value),
                title: title,
                description: target.description.value,
                category: category.category,
                categorybg: category.categorybg,
                categorycolor: category.categorycolor,
                start: getActualDate(),
                end: dateEnd + " " + timeEnd + ":" + "00",
                state: "En progreso"
            })
        } 
        else if(target.description.value ==="") {
            editTask({
                id: Number(target.id.value),
                title: target.title.value,
                description: target.description.value,
                category: category.category,
                categorybg: category.categorybg,
                categorycolor: category.categorycolor,
                start: getActualDate(),
                end: dateEnd + " " + timeEnd + ":" + "00",
                state: "En progreso"
            })
        }
        else if (target.title.value === "" && target.description.value === "") {
            editTask({
                id: Number(target.id.value),
                title: target.title.value,
                description: target.description.value,
                category: category.category,
                categorybg: category.categorybg,
                categorycolor: category.categorycolor,
                start: getActualDate(),
                end: dateEnd + " " + timeEnd + ":" + "00",
                state: "En progreso"
            })
        } else {
            editTask({
                id: Number(target.id.value),
                title: target.title.value,
                description: target.description.value,
                category: category.category,
                categorybg: category.categorybg,
                categorycolor: category.categorycolor,
                start: getActualDate(),
                end: dateEnd + " " + timeEnd + ":" + "00",
                state: "En progreso"
            })
        }
        }
        

    return (
        <form onSubmit={editTaskAdd}>
                <input type="hidden" name="id" value={selectedTask.id}></input>
                <h1 className='task-form--title'>Editar tarea</h1>
                <div className='task-form-item'>
                    <label className='task-form-title'>Tarea: </label>
                    <input type="text" name='title'  placeholder={selectedTask.title}></input>
                </div>
                <div className='task-form-item'>
                    <label className='task-form-title'>Categoría: </label>
                    <div
                        className="category-button-form" 
                        style={
                                {
                                    color: `${category.categorycolor}`, 
                                    backgroundColor: `${category.categorybg}`
                                }
                                }>
                                        {category.category}
                    </div>
                </div>
                <div className='task-form-categories'>
                    {
                        categories.map((category, i) => {
                            return (<div 
                                    key={`c-${i}`} 
                                    className="category-button-form" 
                                    style={
                                        {
                                            color: `${category.categorycolor}`, 
                                            backgroundColor: `${category.categorybg}`
                                        }
                                    }
                                    onClick={() => setCategory(category)}>
                                            {category.category}
                                    </div>)
                        })
                    }
                </div>
                <div className='task-form-item'>
                    <p className='task-form-title'>Descripción: </p>
                    <textarea name='description' cols="30" rows="5" placeholder={selectedTask.description}></textarea>
                </div>
                <div className='task-form-item'>
                    <label className='task-form-title'>Activar fecha</label>
                    <input type="checkbox" name="checkDT" onChange={() => {setStateDate(!stateDate)}}></input>
                </div>
                <div className='task-form-item'>
                    <label className='task-form-title'>Fecha: </label>
                    <input type="date" name='dateE' value={dateEnd} onChange={validateDate} disabled={stateDate}></input>
                    <input type="time" name='timeE' value={timeEnd} onChange={validateTime} disabled={stateTime}></input>
                </div>
                <button type='submit'>Editar</button>
            </form>
    )
}
