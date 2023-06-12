import React, { useState } from 'react'
import logo from "../../images/fatma.png"
import { Link } from 'react-router-dom'
import { HiOutlineUserCircle } from "react-icons/hi"
import { CgShoppingCart } from "react-icons/cg"
import { useSelector , useDispatch} from 'react-redux'
import { logoutRedux } from "../../redux/userSlice"
import { toast } from 'react-hot-toast'
import "./HeaderStyle.css"


const Header = () => {
    const [showMenu,setShowMenu]= useState(false)
    const cartItemsNumber = useSelector((state)=>state.product.cartItem)
    const userData = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    const handleShowMenu = ()=>{
        setShowMenu(showMenu => !showMenu)
    }
    const handleLogout = () => {
        dispatch(logoutRedux())
        toast("Logout Successfully")
    }
    return (<>
        {/* <div  className='fixed'>Header</div> */}
        <header className='header'>

            <nav className=" bg-gray-500 drop-shadow-md ">
                <div className="max-w-screen-xl flex flex-wrap  items-center justify-between  mx-auto p-4 ">


                    <Link className="flex items-center text-5xl">
                        <img src={logo} className="h-10 w-10 mr-5 " alt="Fatma Logo" />
                        <span className=" self-center text-2xl font-semibold whitespace-nowrap  md:dark:text-red-100">Fatma.</span>
                    </Link>

                    <div className="items-center  hidden w-full md:flex md:w-auto md:order-1 text-2xl cursor-pointer" id="mobile-menu-2">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <Link to={"home"} className="block py-2 pl-3 pr-4  rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-red-100">
                                Home
                            </Link>
                            <Link to={"cart"} className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-red-100">
                                Cart
                            </Link>
                            <Link to={"about"} className="block py-2 pl-3 pr-4rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-red-100">
                                About
                            </Link>
                            <Link to={"contact"} className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-red-100">
                                Contact
                            </Link>


                        </ul>
                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 gap-10  ">
                        {/* <div>
                            <a href="#" className="  dark:text-red-100 hover:underline text-xl ">Login</a>

                        </div> */}
                        <div className=" hidden w-full md:flex md:w-auto md:order-1  gap-10 text-red-100 text-4xl">
                            <Link to={"cart"}>
                            <div className='relative cursor-pointer'>
                            <CgShoppingCart />
                            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs  text-white bg-red-500   rounded-full -top-2 -right-2">
                                {cartItemsNumber.length}
                            </div>

                            </div>

                            </Link>
                            <div className='cursor-pointer' onClick={handleShowMenu} >
                                {userData.image ? <img src={userData.image} className='overflow-hidden w-[40px] h-[40px] rounded-full'/> : <HiOutlineUserCircle  /> }
                                {
                                    showMenu && <div className='absolute drop-shadow-md right-35 top-13 text-sm bg-white px-2 py-2 md:dark:text-gray-500 '>
                                            

                                        {userData.image ? (
                                            <div> 
                                                <Link to={"cart"}>
                                                    <p className='whitespace-nowrap cursor-pointer'>My Cart</p>
                                                </Link>
                                            <Link to={"home"}
                                                className="cursor-pointer text-gray-600 px-2 m-1 bg-red-100"
                                                onClick={handleLogout}
                                            >
                                                Logout ({userData.firstName}){" "}
                                            </Link>
                                            </div>
                                        ) : (
                                            <Link
                                                to={"login"}
                                                className="whitespace-nowrap cursor-pointer px-2"
                                            >
                                                Login
                                            </Link>
                                        )}
                                        
                                </div>
                                }

                            </div>

                        

                        </div>
                    </div>
                </div>
            </nav>

        </header>


    </>
    )
}

export default Header