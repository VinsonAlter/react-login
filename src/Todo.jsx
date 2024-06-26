import {useState, useEffect} from 'react'
import {Navigate, useActionData, Form, useLocation} from 'react-router-dom'
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

    const [token, setToken] = useState(() => {
        fetchToken = window.localStorage.getItem('token')
        return fetchToken !== null ? JSON.parse(fetchToken) : null;
      }
    )

    const [user, setUser] = useState(() => {
        fetchUser = window.localStorage.getItem('user')
        return fetchUser !== null ? JSON.parse(fetchUser) : null;
    })

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
            setToken(null)
            setUser(null)
            // setLogOut(true)
        })
    }

    // if(location.state.prevPath === '/login') {
    if(token && user) {
        return (
            <>
                <h1>{token}</h1>
                <h1>{user}</h1>
                <button onClick={() => handleLogout(token, user)}>Log Out</button>
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
