import React, { useState } from 'react'

export function AñadirCategoria({categories, addCategory, deleteCategory}) {

  const [colorBg, setColorBg] = useState("red");
  const [colorFt, setColorFt] = useState("white");
  const [adv, setadv] = useState(" ")

  const setColor = (e) => {
    let colorBackg = e.currentTarget.value.split(",")[0];
    let colorFont = e.currentTarget.value.split(",")[1]
    console.log(e.currentTarget.value.split(","));
    setColorBg(colorBackg);
    setColorFt(colorFont)
  }

  const setCategoryAdd = (e) => {
    e.preventDefault();
    let target = e.target;
    if(categories.length < 11) {
      addCategory({
        category : target.category.value,
        categorybg : colorBg,
        categorycolor: colorFt
      })
    }
    else if (categories.length === 11){
      setadv("No se permiten más de 10 categorías")
    }
  }
  return (
    <form onSubmit={setCategoryAdd}> 
      <h1 className='category-form--title'>Añadir Categoria</h1>
      <div className='addcategory-container'>
        <div className='addcategory-form'>
          <input type="text" name='category' required></input>
          <select className='select-color' onChange={setColor} style={{backgroundColor: colorBg, color: colorFt}}>
            <option style={{backgroundColor: "red", color: "white"}} value={["red","white"]}>Rojo</option>
            <option style={{backgroundColor: "blue", color: "white"}} value={["blue","white"]}>Azul</option>
            <option style={{backgroundColor: "cyan", color: "black"}} value={["cyan", "black"]}>Cian</option>
            <option style={{backgroundColor: "green", color: "white"}} value={["green", "white"]}>Verde</option>
            <option style={{backgroundColor: "yellow", color: "black"}} value={["yellow", "black"]}>Amarillo</option>
            <option style={{backgroundColor: "orange", color: "black"}} value={["orange", "black"]}>Naranja</option>
            <option style={{backgroundColor: "purple", color: "white"}} value={["purple", "white"]}>Morado</option>
            <option style={{backgroundColor: "brown", color: "white"}} value={["brown", "white"]}>Marron</option>
            <option style={{backgroundColor: "black", color: "white"}} value={["black", "white"]}>Negro</option>
            
          </select>
          <button type='submit' className='button-category'>Añadir</button>
        </div>
        <div className='addcategory-items'>
          {
            categories.map((cat, i) => {
              return i > 0 ? (
                <div className="addcategory-item" 
                key={`c-${i}`}>
                  <div  
                  className="addcategory-item-title"
                  style={
                    {
                        color: `${cat.categorycolor}`, 
                        backgroundColor: `${cat.categorybg}`
                    }
                  }
                  >{cat.category}
                  </div>
                  <div className='deletecategory' onClick={() => deleteCategory(cat.category)}><i className="fa-solid fa-xmark"></i></div>
                </div>
                
                ): " ";
            })
          }
        </div>
        <div className='addcategory-colors'>
          {
            categories.map((cat, i) => {
              return (
              <div key={`c-${i}`} className="addcategory-color" style={{backgroundColor: `${categories.categorybg}`}}></div>
              )
            })
          }
        </div>
        <div className='addcategory-adv'>{adv}</div>
      </div>
    </form>
  )
}
