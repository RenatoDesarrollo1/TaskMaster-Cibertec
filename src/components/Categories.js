import React from 'react'

export function Categories({categories, setCategorySel, modalContent}) {
    return (
        <div className='categories'>
            <div className='category-button' onClick={() => setCategorySel("Todos")}>Todos</div>
            {
                categories.map((categories, i) => {
                    return (<div 
                            key={`c-${i}`} 
                            className="category-button" 
                            style={
                                {
                                    color: `${categories.categorycolor}`, 
                                    backgroundColor: `${categories.categorybg}`
                                }
                            }
                            onClick={() => setCategorySel(categories.category)}

                            >
                                    {categories.category}
                            </div>)
                })
            }
            <button className='category-button add-category' onClick={() => modalContent("category")}><i className="fa-solid fa-plus"></i></button>
        </div>
    )
}
