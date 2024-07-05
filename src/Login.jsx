import { useState, useEffect } from 'react'
// it seems using Redirect to can pass a props as well
import {Form, useActionData, useLocation, Navigate, redirect, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Alert } from 'flowbite-react'
import './index.css'

export default function Login() {
  // let's try making login form via tailwind
  // yea, i think i should pass the props here via useActionData()
  const data = useActionData()
  // const location = useLocation()
  // const navigate = useNavigate()

  // let fetchLogout

  // const [logout, setLogout] = useState(() => {
  //   fetchLogout = window.localStorage.getItem('logout')
  //   return fetchLogout !== null ? fetchLogout : false
  // })

  // const [showAlert, setShowAlert] = useState(true)

  let logout = window.localStorage.getItem('logout') 
  let con_log 
  if(logout) {
    con_log = logout
  } else {
    con_log = false
  }

  if(data && data.login) {
    useEffect(() => {
      window.localStorage.setItem('token', JSON.stringify(data.login.token));
      window.localStorage.setItem('user', JSON.stringify(data.login.user));
    }, [data.login])
    // still no idea how to pass the token though, hmmm...
    // return <Navigate to='/' token={data.token} replace/>
    // return (<p>{data.login.token} {data.login.user}</p>)
    // console.log(data.login.token)
    // set window.localStorage here...
    // navigate('/', {state: {token: data.login.token, user: data.login.user, prevPath: location.pathname}, replace: true})
    return <Navigate to='/' replace/>
    // navigate('/', {state: data.token})
  } else {
    {/* The Message when user is logged out 
        onDismiss cause more errors than i intended, blasphemy!
      */}
      return (
        <>
          {con_log ? (
            <Alert color="failure">
                <span className="font-medium">Berhasil Logout!</span>
            </Alert>
            // <div class="flex flex-col gap-2 p-4 text-sm border-red-500 bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800 rounded-lg" role="alert"><div class="flex items-center" data-testid="flowbite-alert-wrapper"><div><span class="font-medium">Berhasil Logout!</span></div></div></div>
            
//             <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//   <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
//   </svg>
//   <span class="sr-only">Info</span>
//   <div class="ms-3 text-sm font-medium">
//     A simple info alert with an <a href="#" class="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
//   </div>
//   <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
//     <span class="sr-only">Close</span>
//     <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//     </svg>
//   </button>
// </div>
          ) : ''}
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-screen">  
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Please Sign In
                </h1>
                <Form className="space-y-4 md:space-y-6" method="post" action="/login">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="yourname@gmail.com"/>
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <button type="submit" className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    Submit
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </>
        
      )
    }
    
}

export const loginAction = async ({request}) => {
  // console.log(request)

  // const navigate = useNavigate()

  const loginUrl = 'http://127.0.0.1:8000/api/login'

  const data = await request.formData()

  const submission = {
    email: data.get('email'),
    password: data.get('password')
  }

  // console.log(submission)
  
  let fetchToken = await axios.post(loginUrl, submission,  {
    headers: {
      'Accept': 'application/json'
    }
  }).then(function (response) {
    // return response.data.data.token
    // return 
    // {
    //   'token' : response.data.login.token,
    //   'user' : response.data.login.user
    // }
    // fix to this format
    return {
      // login : {
        token: response.data.login.token,
        user: response.data.login.user
      // }
    };
  })

  // console.log(fetchToken)
  if(fetchToken) {
    // return <Navigate to='/' token={fetchToken} replace/>
    // return redirect('/')
    // return (
    //   <Redirect to={{
    //     pathname: '/',
    //     state: { token: fetchToken }
    //   }}/>
    // )
    return {login: fetchToken}
    // console.log(fetchToken)
  }
}
  

// console.log(loginAction)