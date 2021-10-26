import React,{useState,useEffect} from 'react'
import './style.css'


const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
  
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };
 
export const Todo = () => {
    const [input, setInput] = useState("");
    const [items,setItems] = useState([])
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const addItems=()=>{
        if(!input){
            alert("fill blanks")
        } else if (input && toggleButton) {
            setItems(
              items.map((curElem) => {
                if (curElem.id === isEditItem) {
                  return { ...curElem, name: input };
                }
                return curElem;
              })
            );
      
            setInput("");
            setIsEditItem(null);
            setToggleButton(false);
            }else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:input
            }
            setItems([...items,myNewInputData])
        }
    }
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
          return curElem.id !== index;
        });
        setItems(updatedItems);
      };
        // remove all the elements
  const removeAll = () => {
    setItems([]);
  };
    // adding localStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
      }, [items]);
    
      const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
          return curElem.id === index;
        });
        setInput(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
      };
    
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" value={input} onChange={(event)=>setInput(event.target.value)}  placeholder="✍ add items" className="form-control"/>
                                    {toggleButton ? (
                        <i className="far fa-edit add-btn" onClick={addItems}></i>
                        ) : (
                        <i className="fa fa-plus add-btn" onClick={addItems}></i>
                        )}
                    </div>
                    <div className="showItems">
                        {items.map((curElem,index)=>{
                            return  (
                                
                        <div className="eachItem">
                        <h3>{curElem.name}</h3>
                        <div className="todo-btn">
                        <i class="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                        <i class="far fa-trash-alt add-btn" onClick={()=>{deleteItem(curElem.id)}}></i>
                        </div>
                    </div>
                            );
                        })}
                    </div>
                    <div className="showItems">
                        <button onClick={removeAll} className="btn effect04" data-sm-link-text="remove All">
                            <span>CHECK List</span>
                        </button>
                    </div>
                </div>
            </div>
            
        </>
    )
}
