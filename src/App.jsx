import { useState, useEffect } from 'react'
import {createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route, Navigate, createRoutesFromElements, useNavigate} from 'react-router-dom'
import axios from 'axios'
import TaskList from './TaskList'
import AddTodo from './AddTodo'
import Todo from './Todo'
import Login, {loginAction} from './Login'

// note jsonplaceholder changes will be refreshed every time you refresh the page
// fetch dummy data from jsonplaceholder
// const baseURL = "https://jsonplaceholder.typicode.com/todos";

// fetch the laravel data
const baseURL = 'http://127.0.0.1:8000/api/todos';

function App() {
  // let token
  const [todos, setTodos] = useState([])
  const [authenticated, setAuthenticated] = useState(null)
  // console.log(token)
  // const [token, setToken] = useState(null)
  // const handleToken = setToken(token)
  // const navigate = useNavigate()
  // const history = useHistory()

  let todosLength = todos.length + 1

  // console.log(countTodo)
  // console.log(todos)

  // useEffect(() => {
  //   axios.get(baseURL, {
  //     // headers: {
  //     //   'Access-Control-Allow-Origin' : '*'
  //     // }
  //   }).then((resp) => {
  //     // console.log(resp.data)
  //     if(resp.data.success === 0) {
  //       alert(resp.data.message)
  //     } else {
  //       setTodos(resp.data.data)
  //     }
  //     // setCountTodo(todos.length)
  //   }).catch(function (error) {
  //     if (error.response.status === 401) {
  //       // return <Navigate replace to="/login"/>;
  //       setAuthenticated(null)
  //     }
  //   })

  //   // console.log(countTodos)
  //   // setCountTodo(todos.length)
  // }, [setTodos])

  // maskusdnya axio
  // console.log(countTodos)

  if(!todos) return [];

  // yes, insert to array, terbalik setState then axios post maybe works
  async function submitList(text) {
    // setCountTodo(countTodos => countTodos + 1)
    let data = {
      // previous insert for jsonplaceholder
      // userId: 10,
      // id: todosLength,
      // title: text,
      // completed: false,

      // current insert for laravel api
      user_id: 1,
      title: text,
      completed: false
    }
    
    await axios.post(baseURL, data,  {
      // withCredentials: true,
    }).then(function (response) {
      // let todoData = JSON.parse(response.data.todo);
      setTodos([
      ...todos, 
      {
        // previous for jsonplaceholder
        // user_id: todoData[0].user_id,
        // id: todoData[0].id,
        // title: todoData[0].title,
        // completed: todoData[0].completed
        // testing to insert data for  

        // receiving data from laravel api
        user_id: response.data.data.user_id,
        id: response.data.data.id,
        title: response.data.data.title,
        completed: response.data.data.completed
      }])

    }).catch((err) => { console.log('Axios Error:', err); })
    // axios.post(baseURL, data).then(
    //   setTodos([
    //     ...todos, 
    //     {
    //       userId: 10,
    //       id: todosLength,
    //       title: text,
    //       completed: false,
    //     }])
    // ).catch((err) => { console.log('Axios Error:', err); })
    // setTodos([
    //   ...todos, 
    //   {
    //     id: id_count,
    //     name: text,
    //     completed: false
    //   }
    // ])
  }
  

  // change this to toggleTodo instead
  async function toggleTodo(nextTodo) {
    await axios.put(baseURL + '/' + nextTodo.id, {
      completed: nextTodo.completed
    },  {
      // withCredentials: true,
    }).then(function (response) {
      // console.log(response)
      setTodos(todos.map(todo => {
        if(todo.id === nextTodo.id) {
          return nextTodo;
        } else {
          return todo;
        }
      }))
    }).catch((err) => { console.log('Axios Error:', err); })
    // setTodos(todos.map(todo => {
    //   if(todo.id === nextTodo.id) {
    //     // return {
    //     //   ...todo, 
    //     //   completed: !list.completed
    //     // } 
    //     return nextTodo;
    //   } else {
    //     return todo;
    //   }
    // }))
  }



  // async function handleChange(nextTodo) {
  //   // console.log(nextTodo.id)
  //   // update the jsonplaceholder via axios put
  //   // console.log(baseURL + '/' + nextTodo.id)
  //   await axios.put(baseURL + '/' + nextTodo.id, {
  //     completed: nextTodo.completed
  //   }).then(function (response) {
  //     // console.log(response)
  //     // setTodos(todos.map(todo => {
  //     //   if(todo.id === nextTodo.id) {
  //     //     return nextTodo;
  //     //   } else {
  //     //     return todo;
  //     //   }
  //     // }))
  //   }).catch((err) => { console.log('Axios Error:', err); })
  //   // setTodos(todos.map(todo => {
  //   //   if(todo.id === nextTodo.id) {
  //   //     // return {
  //   //     //   ...todo, 
  //   //     //   completed: !list.completed
  //   //     // } 
  //   //     return nextTodo;
  //   //   } else {
  //   //     return todo;
  //   //   }
  //   // }))
  // }

  // function handleChange is use for change title text
  async function handleChange(nextTodo) {
    // console.log(nextTodo.id)
    // update the jsonplaceholder via axios put
    // console.log(baseURL + '/' + nextTodo.id)
    await axios.put(baseURL + '/' + nextTodo.id, {
      title: nextTodo.title
    },  {
      // withCredentials: true,
    }).then(function (response) {
      // console.log(response)
      setTodos(todos.map(todo => {
        if(todo.id === nextTodo.id) {
          return nextTodo;
        } else {
          return todo;
        }
      }))
    }).catch((err) => { console.log('Axios Error:', err); })
    setTodos(todos.map(todo => {
      if(todo.id === nextTodo.id) {
        // return {
        //   ...todo, 
        //   completed: !list.completed
        // } 
        return nextTodo;
      } else {
        return todo;
      }
    }))
  }

  async function deleteList(id) {
    // setTodos(todos.filter(todo => todo.id !== id))
    await axios.delete(baseURL + '/' + id).then(function (response) {
      setTodos(todos.filter(todo => todo.id !== id))
    },  {
      // withCredentials: true,
    }).then(function (response) {

    }).catch((err) => { console.log('Axios Error:', err); })
  }

  // console.log(todos)
  // Split main part again, i guess

  // via createBrowserRouter, recommended I guess
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/">
  //       <Route index authenticated={authenticated} element={<Todo/>}/>
  //       <Route path="login" element={<Login/>} action={loginAction}/>
  //     </Route>
  //   )
  // )

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Todo/>}/>
        <Route path="login" element={<Login/>} action={loginAction}/>
      </Route>
    )
  )

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="*" element={<Login/>}/>
    //   </Routes>
    // </BrowserRouter>
    <RouterProvider router={router}/>
    // <>
    //   <AddTodo
    //     onAddTodo={submitList}
    //   />
    //   <ul>
    //     {
    //       todos.map(todo => {
    //         return (
    //           <TaskList
    //             key={todo.id}
    //             list={todo}
    //             toggleTodo={toggleTodo}
    //             handleChange={handleChange}
    //             deleteList={deleteList}
    //           />
    //         )
    //       })
    //     }
    //   </ul>
    // </>
    
  )
}

export default App
