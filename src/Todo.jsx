import {useState, useEffect} from 'react'
import {Navigate, useActionData, Form, useLocation} from 'react-router-dom'
import {Alert} from 'flowbite-react'
import AddTodo from './AddTodo'
import TaskList from './TaskList'
import axios from 'axios'

// the only way is using useEffect at this part

// export default function Todo({authenticated}) {
//     if(!authenticated) {
//         return <Navigate to='/login' replace/>
//     } else {
//         return (<div>Todo</div>);
//     }
// }

// change this to request function
// function logout(token, user) {
//     const baseLogout = 'http://127.0.0.1:8000/api/logout'
//     // console.log('Bearer ' + token)
//     // console.log(user)
//     const data = {
//         'id': user
//     }
//     // console.log(data)
//     axios.post(baseLogout, data, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     }).then(function (response) {
//         // this works, just redirect won't works? The answer just use useAction pass this function as an action
//         // console.log('Log out')
//         // setLogin(null)
//     })
// }

export default function Todo() {
    // const [todos, setTodos] = useState([])
    // const [token, setToken] = useState(null)
    // const [user, setUser] = useState(null)
    // const [logout, setLogOut] = useState(true)
    const baseLogout = 'http://127.0.0.1:8000/api/logout'

    const baseURL = 'http://127.0.0.1:8000/api/todos';

    const location = useLocation()

    let fetchToken

    let fetchUser

    // useEffect(() => {
    //     setToken(location.state.token)
    //     setUser(location.state.user)
    // }, [location])

    // console.log(location)
    // you use history push ok?
    // useEffect(() => {
    //     if (/* your condition */) {
    //       history.push('/new-route');
    //     }
    //   }, []);

    const [todos, setTodos] = useState([])

    let todosLength = todos.length + 1

    const [token, setToken] = useState(() => {
        fetchToken = window.localStorage.getItem('token')
        return fetchToken !== null ? JSON.parse(fetchToken) : null;
      }
    )

    const [user, setUser] = useState(() => {
        fetchUser = window.localStorage.getItem('user')
        return fetchUser !== null ? JSON.parse(fetchUser) : null;
    })

    useEffect(() => {
        // check if a token exist then run the below function
        // console.log(user)
        if(token) {
            axios.get(baseURL + '/' + user, {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
                }).then((resp) => {
                // console.log(resp.data)
                    if(resp.data.success === 0) {
                        alert(resp.data.message)
                    } else {
                        setTodos(resp.data.data)
                    }
                // setCountTodo(todos.length)
                }).catch(function (error) {
                    if (error.response.status === 401) {
                        // setAuthenticated(null)
                    }
            })
        }
    }, [setTodos])   

    const [showAlert, setShowAlert] = useState(true)

    const handleLogout = (token, user) => {
        let ids = {
            'id': user
        }
        axios.post(baseLogout, ids, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            // remember to empty the localStorage as well
            setToken(null)
            setUser(null)
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('user');
            // then, i set a logout function here
            window.localStorage.setItem('logout', true)
            // useEffect(() => {
            //     window.localStorage.removeItem('token')
            //     window.localStorage.removeItem('user');
            // }, [token, user])
            // setLogOut(true)
        })
    }

    async function submitList(text) {
        let data = {
            // current insert for laravel api
            user_id: token,
            title: text,
            completed: false
        }

        await axios.post(baseURL, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }, data,  {
            
        })
    }

    async function handleChange(nextTodo) {
        // console.log(nextTodo.id)
        // update the jsonplaceholder via axios put
        // console.log(baseURL + '/' + nextTodo.id)
        await axios.put(baseURL + '/' + nextTodo.id, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
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

    async function toggleTodo(nextTodo) {
        await axios.put(baseURL + '/' + nextTodo.id, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }, {
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
      }

    async function deleteList(id) {
        // setTodos(todos.filter(todo => todo.id !== id))
        await axios.delete(baseURL + '/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
          setTodos(todos.filter(todo => todo.id !== id))
        },  {
          // withCredentials: true,
        }).then(function (response) {
    
        }).catch((err) => { console.log('Axios Error:', err); })
    }

    // if(location.state.prevPath === '/login') {
    if(token && user) {
        // just use flowbite react Component to make my life easier
        return (
            <>
                <div className="flex pt-5 justify-center place-items-center">
                    <div className="w-4/6">
                        {showAlert ? (
                            <Alert color="success" onDismiss={() => setShowAlert(false)}>
                                <span className="font-medium">Berhasil Login!</span>
                            </Alert>
                            // I take the todos here man..
                            // check the todos
                            // <div class="flex flex-col gap-2 p-4 text-sm border-green-500 bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800 rounded-lg" role="alert"><div class="flex items-center" data-testid="flowbite-alert-wrapper"><div><span class="font-medium">Berhasil Login!</span></div><button aria-label="Dismiss" class="-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2 bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300" type="button"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div></div>
                            
                        ) : ''}
                        {console.log(todos)}
                        <h1>{token}</h1>
                        <h1>{user}</h1>
                        <>
                            <AddTodo
                                onAddTodo={submitList}
                            />
                            <ul>
                                {
                                    todos.map(todo => {
                                        return (
                                            <TaskList
                                                key={todo.id}
                                                list={todo}
                                                toggleTodo={toggleTodo}
                                                handleChange={handleChange}
                                                deleteList={deleteList}
                                            />
                                        )
                                    })    
                                }
                            </ul>
                        </>
                        <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handleLogout(token, user)}>Log Out</button>
                    </div>
                </div>
            </>
        )
    } else {
        return <Navigate to='/login' replace/>
    }
        
    // } else {
    //     return <Navigate to='/login' replace/>
    // }
    

    // const token = location.state.token
    // const user = location.state.user

    // // console.log(logging)

    // if(logging) {
    //     return (
    //         <div>{logging.isLogOut}</div>
    //     )
    // } else {
    //     return (
    //         <>
    //             {/* Should add a popup function hmm */}
                
    //             <div>Todo {token} {user}</div>
    //             <Form method="post" action="/">
    //                 {/* I tried to pass the value via form submission, just try to see what happen next 
    //                     I see the problem now.... the value needs to be changed to readonly, man this is HACK LOL
    //                 */}
    //                 <input type="text" name="token" id="token" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={token}/>
    //                 <input type="text" name="user" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={user}/>
    //                 <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Out</button>
    //             </Form>
    //             {/* <button onClick={() => logout(token, user)}>Log Out</button> */}
    //         </>
    //     )
    // }
    
    // console.log(logging)
    // damn it, not working


    // here, let's try this tactics instead
    // if(state) {
    //     if(logging && logging.isLogOut) {
    //         return (
    //             <>
    //                 <p>{logging.isLogOut}</p>
    //             </>
    //         )
    //     } else {
    //         const token = location.state.token
    //         const user = location.state.user
    //         return (
    //             <Form method="post" action="/">
    //                 {/* I tried to pass the value via form submission, just try to see what happen next 
    //                     I see the problem now.... the value needs to be changed to readonly, man this is HACK LOL
    //                 */}
    //                 <input type="text" name="token" id="token" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={token}/>
    //                 <input type="text" name="user" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={user}/>
    //                 <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Out</button>
    //             </Form>
    //         )
    //     }
    // } else {
    //     if(logging && logging.isLogOut) {
    //         return (
    //             <>
    //                 <p>{logging.isLogOut}</p>
    //             </>
    //         )
    //     }
    // }
}

// export const logout = async ({request}) => {
//     const baseLogout = 'http://127.0.0.1:8000/api/logout'

//     const data = await request.formData()

//     const user = {
//         'id': data.get('user')
//     }

//     const token = data.get('token')

//     // give 405 errors, what the heck, me being idiot don't set action to index, but to  its parent instead
//     // console.log(user)
//     // console.log(token)

//     let loggingOut = await axios.post(baseLogout, user, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     }).then(function (response) {
//         // this works, just redirect won't works? The answer just use useAction pass this function as an action
//         // console.log('Log out')
//         // setLogin(null)
//         // console.log(response.data.token)
//         return response.data.token
//         // console.log(response.data.token)
//     })

//     if(loggingOut) {
//         return {isLogOut: loggingOut}
//     }
// }
