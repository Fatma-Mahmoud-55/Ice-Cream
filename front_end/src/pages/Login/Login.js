import React, { useState } from 'react'
import loginImage from "../../images/login-animation.gif"
import { BiShow, BiHide } from "react-icons/bi"
import { Link ,useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { loginRedux } from "../../redux/userSlice"

export const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    

  })
  console.log(userData)

  const userDataFromRedux = useSelector((state) => state)
  const userName = userDataFromRedux.user.firstName
  // console.log(userDataFromRedux)
  const dispatch = useDispatch()

  const handleOnChange = (event) => {

    switch (event.target.name) {
      case "email":
        setUserData({ ...userData, email: event.target.value });
        break;

      case "password":
        setUserData({ ...userData, password: event.target.value });
        break;
    }
  }

  const handleSubmit =async (e) => {
    e.preventDefault()
    const { email, password } = userData
    if ( email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(userData)
      })
      const resData = await fetchData.json()
      
      toast(resData.data.firstName + " "+ resData.message)
      
      if (resData.alert) {
        dispatch(loginRedux(resData))
        navigate("/home")
      }else{
        toast("email or password not true")
      }
      
    }
    else {
      toast("enter require fields")
    }
  }

  const handleShowPassword = () => {
    setShowPassword(setShowPassword => !setShowPassword)
  }

  return (
      <>
      <section className=''>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">

          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-white-100 mt-10">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <div className='w-20 overflow-hidden flex-col m-auto rounded-full drop-shadow-md'>
                <img src={loginImage} className='w-full' />
              </div>
              <h1 className="text-xl font-bold  text-gray-700 md:text-2xl text-center ">
                Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(ev) => { handleSubmit(ev) }} action="#">
              
                {/* email */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your Email</label>
                  <input
                    type={"email"}
                    name="email"
                    id="email"
                    className=" border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-100 dark:border-gray-600 dark:placeholder-gray-500 "
                    placeholder="name@company.com"
                    value={userData.email}
                    onChange={handleOnChange}
                    required="true" />
                </div>
                {/* password */}
                <div >
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <div className='flex bg-gray-100  border  border-gray-500 focus-within:border-2 focus-within:border-black     rounded-lg  '>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="bg-gray-100 text-gray-900 sm:text-sm  border-none outline-none  block w-full p-1.5 m-1  dark:placeholder-gray-500"
                      placeholder="••••••••"
                      value={userData.password}
                      onChange={handleOnChange}
                      required="true" />

                    <span className='m-3 flex text-xl cursor-pointer' onClick={handleShowPassword}>
                      {showPassword ? <BiShow /> : <BiHide />}
                    </span>
                  </div>
                </div>

                {/*submit */}
                <button type={"submit"}
                  className="w-full  bg-blue-300 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  Login
                </button>
                <p className="text-sm font-light text-gray-600">
                  Already have an account? <Link to={"/signup"} className='font-medium text-primary-600 hover:underline text-blue-500'>Sign Up</Link>

                </p>
              </form>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
      </section>
      </>
  )
}
