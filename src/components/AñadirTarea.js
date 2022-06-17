import React, { useState } from 'react'

export function AñadirTarea({categories, tasks, addTask, intervalCrono}) {
    const generateID = () => {
        let id;
        id = tasks.length; 
        if(tasks.length > 0) {   
            tasks.forEach((t, i) => {
                if (t.id !== i) {
                    id = i;
                } else {
                    id = tasks.length;
                }
            });
        }
        return id;
    }
    
    const [stateDate, setStateDate] = useState(true);
    const [stateTime, setStateTime] = useState(true);
    const [category, setCategory] = useState(categories[0]);
    const [dateEnd, setDateEnd] = useState("");
    const [timeEnd, setTimeEnd] = useState("");


    const getActualDate = () => {
        let date = new Date();
        return stateDate === false ? (String(date.getFullYear()) + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + " " + String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0')): " ";   
    }


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

    const setTaskAdd = (e) => {
        e.preventDefault();
        clearInterval(intervalCrono);
        let target = e.target;
        addTask({
            id: Number(target.id.value),
            title: target.title.value,
            description: target.description.value,
            category: category.category,
            categorybg: category.categorybg,
            categorycolor: category.categorycolor,
            start: getActualDate(),
            end: dateEnd + " " + timeEnd + ":00",
            state: "En progreso"
        })
        

        target.id.value = "";
        target.title.value = "";
        target.description.value = "";
        setCategory(categories[0]);
        target.checkDT.checked = false;
        target.dateE.value = "";
        target.timeE.value = "";
        setStateDate(true);
        setStateTime(true);
    }

    return (
        <form onSubmit={setTaskAdd}>
            <input type="hidden" name="id" value={generateID()}></input>
            <h1 className='task-form--title'>Añadir tarea</h1>
            <div className='task-form-item'>
                <label className='task-form-title'>Tarea: </label>
                <input type="text" name='title' required></input>
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
                <textarea name='description' cols="30" rows="5" placeholder='Sin descripción'></textarea>
            </div>
            <div className='task-form-item'>
                <label className='task-form-title'>Activar fecha</label>
                <input type="checkbox" name="checkDT" onChange={() => {setStateDate(!stateDate); setStateTime(!stateTime)}}></input>
            </div>
            <div className='task-form-item'>
                <label className='task-form-title'>Fecha: </label>
                <input type="date" name='dateE' onChange={validateDate} disabled={stateDate}></input>
                <input type="time" name='timeE' value={timeEnd} onChange={validateTime} disabled={stateTime}></input>
            </div>
            <button type='submit'>Añadir</button>
        </form>
    )
}
