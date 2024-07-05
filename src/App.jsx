import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import './index.css'


function App() {


  const [todo, setTodo] = useState("")
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem('todoList')
    if (todoString) {
      try {
        let todoList = JSON.parse(todoString)
        if (Array.isArray(todoList)) {
          setTodoList(todoList)
        } else {
          console.error('Stored todoList is not an array')
        }
      } catch (error) {
        console.error('Error parsing todoList from localStorage:', error)
      }
    }
  }, [])

  const saveToLS = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }
  

  const handleCheckBox = (e)=>{
    let key = e.target.name
    let newList = todoList.map((item)=> item.key === key ? {...item, isDone: !item.isDone} : item)
    saveToLS(newList)
    setTodoList(newList)
  }
  const handleAdd = ()=>{
    if(todo === ""){
      alert("Please enter a task")
      return
    }
    setTodoList([...todoList, {key: uuidv4(), todo, isDone:false}])
    saveToLS([...todoList, {key: uuidv4(), todo, isDone:false}])
    setTodo("")
  

  }
  const handleEdit = (e, todo, key)=>{
    setTodo(todo)
    let newList = todoList.filter((item)=> item.key !== key)
    saveToLS(newList)
    setTodoList(newList)


  }
  const handleDelete = (e)=>{
    let key = e.target.name
    let newList = todoList.filter((item)=> item.key !== key)
    saveToLS(newList)
    setTodoList(newList)

  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }



  

  return (
    <>
      <Navbar />
      <div className=" main mx-auto bg-violet-200 h-[80vh] my-8 w-[60%] rounded-lg shadow-lg p-9 ">
        <div className="mx-auto w-[100%] flex items-center justify-center">

          <input onChange={handleChange} value={todo} type="'text'" className='w-[80%] text-lg p-4 px-4 rounded-s-full outline-none ' placeholder='Add a new task' name="" id="" />
          <button onClick={handleAdd} className='bg-violet-900 text-white p-4 rounded-e-full w-[130px] font-bold text-lg hover:bg-violet-950 transition-all'>Add</button>
        </div>
        <div className='todos-div my-8 overflow-y-auto h-[85%]'>


          {todoList.map((item)=>{

            return <div key={item.key} className='todo justify-between flex my-4 items-center gap-4'>
              <div className=' check-todo flex gap-4'>
                <input name={item.key} onChange={handleCheckBox}  type="checkbox" id="" className='' />
                <h1 className={item.isDone?"todo-txt text-xl line-through text-red-400":"todo-txt text-xl font-[500] "}>{item.todo}</h1>
              </div>
              <div className='flex gap-4'>
                <button name={item.key} onClick={handleDelete} className='btns   bg-violet-900 text-white p-2 px-4 rounded-full  font-bold text-s hover:bg-violet-950 transition-all'>Delete</button>
                <button onClick={(e)=>{handleEdit(e, item.todo, item.key)}} className='btns  bg-violet-900 text-white p-2 px-4 rounded-full  font-bold text-s hover:bg-violet-950 transition-all'>Edit</button>
              </div>
            </div>
            })}

            
          </div>  
        </div>



    </>
  )
}

export default App
