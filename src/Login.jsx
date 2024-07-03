import { useState, useEffect } from 'react'
// it seems using Redirect to can pass a props as well
import {Form, useActionData, useLocation, Navigate, redirect, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Alert } from 'flowbite-react'
// import {Alert} from 'flowbite'

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
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign In</button>
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