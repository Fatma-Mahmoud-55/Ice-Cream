import React, { useState } from 'react'
import loginImage from "../../images/login-animation.gif"
import { BiShow, BiHide } from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom'
import { ImageToBase } from "../../files/imageToBase"
import { toast } from 'react-hot-toast';

export const Signup = () => {
    
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""

    })

    console.log(userData)

    const handleOnChange = (event) => {

        switch (event.target.name) {
            case "fname":
                setUserData({ ...userData, firstName: event.target.value });
                break;

            case "lname":
                setUserData({ ...userData, lastName: event.target.value });
                break;

            case "email":
                setUserData({ ...userData, email: event.target.value });
                break;

            case "password":
                setUserData({ ...userData, password: event.target.value });
                break;

            case "confirmPassword":
                setUserData({ ...userData, confirmPassword: event.target.value });
                break;
        }
    }

    const UploadProfileImage = async (img) => {
        const image = await ImageToBase(img.target.files[0])
        console.log(image)
        setUserData({ ...userData, image: image });
    }
    console.log(process.env.REACT_APP_SERVER_DOMIN)

    const handleSubmit =async (e) => {
        e.preventDefault()
        const { firstName, lastName, email, password, confirmPassword } = userData
        if (firstName && lastName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
                    method : "POST",
                    headers : {
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify(userData)
                })
                const resData = await fetchData.json()
                console.log(resData)
                
                toast(resData.message)
                if (resData.alert){
                    navigate("/login")
                }
            }
            else {
                toast("Not equal")
            }
        }
        else {
            toast("enter require fields")
        }
    }

    const handleShowPassword = () => {
        setShowPassword(setShowPassword => !setShowPassword)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(showConfirmPassword => !showConfirmPassword)
    }
    return (
        <><br />
            <br />
            <section className='mt-10'>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">

                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-white-100 mt-10">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            {/* profile image */}
                            <div className='w-[90px] overflow-hidden flex-col h-[90px] m-auto rounded-full drop-shadow-md relative '>
                                <img src={userData.image ? userData.image : loginImage} className='w-full h-full  ' />
                                <label htmlFor='profileImage'>
                                    <div className='absolute bg-red-200 h-[22px] bottom-0 w-full text-center cursor-pointer bg-opacity-50 '>
                                        <p className='text-sm  text-gray-900 '>Upload</p>
                                    </div>
                                    <input type={"file"} id="profileImage" className='hidden' accept='image/*' onChange={(img) => { UploadProfileImage(img) }}></input>
                                </label>
                            </div>
                            <h1 className="text-xl font-bold  text-gray-700 md:text-2xl text-center ">
                                Sign Up
                            </h1>
                            {/* Form */}
                            <form className="space-y-4 md:space-y-6" onSubmit={(ev) => { handleSubmit(ev) }} action="#">
                                {/* first name */}
                                <div>
                                    <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                                    <input
                                        type={"text"}
                                        name="fname"
                                        id="fname"
                                        className=" border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-100 dark:border-gray-600 dark:placeholder-gray-500 "
                                        placeholder="First Name"
                                        value={userData.firstName}
                                        onChange={(event) => { handleOnChange(event) }}

                                        required="" />
                                </div>
                                {/* last name */}
                                <div>
                                    <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 "> Last Name</label>
                                    <input
                                        type={"text"}
                                        name="lname"
                                        id="lname"
                                        className=" border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-100 dark:border-gray-600 dark:placeholder-gray-500 "
                                        placeholder="Last Name"
                                        value={userData.lastName}
                                        onChange={handleOnChange}
                                        required="" />
                                </div>
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
                                        required="" />
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
                                            required="" />

                                        <span className='m-3 flex text-xl cursor-pointer' onClick={handleShowPassword}>
                                            {showPassword ? <BiShow /> : <BiHide />}
                                        </span>
                                    </div>
                                </div>
                                {/* confirm password */}
                                <div >
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                    <div className='flex bg-gray-100  border  border-gray-500 focus-within:border-2 focus-within:border-black     rounded-lg  '>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="••••••••"
                                            className="bg-gray-100 text-gray-900 sm:text-sm  border-none outline-none  block w-full p-1.5 m-1  dark:placeholder-gray-500"
                                            value={userData.confirmPassword}
                                            onChange={handleOnChange}
                                            required="true" />
                                        <span className='m-3 flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>
                                            {showConfirmPassword ? <BiShow /> : <BiHide />}
                                        </span>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" type={"checkbox"} className="w-4 h-4 border border-gray-300 rounded bg-gray-100 focus:ring-3 
                                        focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required="true" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-600">I accept the <a className="font-medium hover:underline text-blue-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type={"submit"}
                                    className="w-full  bg-blue-300 hover:bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Create an account
                                </button>
                                <p className="text-sm font-light text-gray-600">
                                    Already have an account? <Link to={"/login"} className='font-medium text-primary-600 hover:underline text-blue-500'>Login here</Link>

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
