import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./assets/components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring=localStorage.getItem("todos");
    if(todostring){
    let todos=JSON.parse(localStorage.getItem("todos"));
    settodos(todos);
    }
  }, [])
  


  const savetLS=()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const togglefinished= () => {
    setshowfinished(!showfinished)
  }
  

  const handleedit = (e,id) => {
    let t=todos.filter(i=>i.id==id);
    settodo(t[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    savetLS()
  };

  const handledelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    savetLS()
  };

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscomplete: false }]);
    settodo("");
    savetLS()
  };

  const handlechange = (e) => {
    settodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((items) => {
      return items.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].iscomplete = !newtodos[index].iscomplete;
    settodos(newtodos);
    savetLS()
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className="text-center font-bold text-xl">iTask - Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handlechange}
            value={todo}
            type="text"
            className="bg-white w-full rounded-full px-5 py-1"
          />
          <button
            onClick={handleadd} disabled={todo.length<3}
            className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md cursor-pointer"
          >
            SAVE
          </button>
        </div>
          <input className="my-4" onChange={togglefinished} type="checkbox" checked={showfinished} id="" /> Show Finished

        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos To Display</div>}
          {todos.map((item) => {
            return ((showfinished || !item.iscomplete) &&
              <div
                key={item.id}
                className="todo flex md:w-full my-3 justify-between " 
              >
                <div className="flex gap-5">
                  <input
                    onChange={handlecheckbox}
                    type="checkbox"
                    checked={item.iscomplete}
                    name={item.id}
                    id=""
                  />
                  <div className={item.iscomplete ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e)=>{handleedit(e,item.id)}}
                    className="bg-violet-800 cursor-pointer hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handledelete(e, item.id);
                    }}
                    className="bg-violet-800 cursor-pointer hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
