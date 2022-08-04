import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";

enum CategoryShop {
  sembako = "sembako",
  pangan = "pangan",
  
}

type IFormInput = {
  id: number;
  task: String;
  category: CategoryShop;
}

function App() {
  const { register, formState:{errors}, handleSubmit, reset } = useForm<IFormInput>();
  const [isUpdate, setIsUpdate] = useState<{ id: number | null, status: boolean  }>({ id: null, status: false });
  const [todos, setNewTodos] = useState<IFormInput[]>([])

  const onSubmit: SubmitHandler<IFormInput> = (values) => {

    let data = [...todos];
    if (isUpdate.status) {
      data.forEach((todos) => {
        if (todos.id === isUpdate.id) {
          todos.task = values.task;
          todos.category = values.category;       
        }
      });

    } else {
      data.push({ id: Math.random(), task: values.task, category: values.category });
      
    }

    setIsUpdate({id:null, status:false});
    setNewTodos(data);
    reset();
       
  }
  
  function handleEdit(id:number) {
    let data = [...todos];
    let foundData = data.find((todos) => todos.id === id);
    reset(foundData)
    setIsUpdate({ id: id, status: true });
  }
  
  function handleDelete(id:number) { 
    let data = [...todos];
    let filterData = data.filter(todos => todos.id != id);
    setNewTodos(filterData);
  }

  console.log(todos)
  return (
    <div className="App">
      <h2 className="px-3 py-3 text-center" >To Do List</h2>
      <form className="px-3 py-2 text-align-center" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label className="mb-2 mt-2" >Kategori Belanja: </label>
          <select className="form-select" {...register("category", { required: true })} >
          {errors.category?.type === 'required' && <p className="text-bg-danger mt-2 text-center rounded-3">"Kategori Belanja harus di isi!"</p> }
            <option  selected value="">--Pilih Belanjaan--</option>
            <option value="sembako">Sembako</option>
            <option value="pangan">Pangan</option>
          </select>
        </div>

        <div className="form-group">
          <label className="mb-2 mt-2">Belanja: </label>
          <input className="form-control"
            {...register("task", { required: true, maxLength: 24 })} />
            {errors.task?.type === 'required' && <p className="text-bg-danger mt-2 text-center rounded-3">"Daftar Belanja harus di isi!"</p> }
        </div>
        <input className="mt-2 btn btn-success w-100"
          type="submit" />
        
       
      </form>
      <div className="todos mt-3">
        
        {todos.map((todo: IFormInput, index: number) => <ul  className="list-group mt-2" key={index}>
          <li className="list-group-item mx-3 ">
            <div className="">

                {todo.task} - {todo.category}              
                <button className="btn btn-sm btn-warning mx-1 float-end " onClick={() => handleDelete(todo.id)}>Delete</button>
                <button className="btn btn-sm btn-danger mx-1 float-end" onClick={() => handleEdit(todo.id)}>Edit</button>
       
            </div>
             </li> </ul>)} 
   
      </div>

    </div>
  );

}



export default App;
