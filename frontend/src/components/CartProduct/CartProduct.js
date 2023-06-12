import React from 'react'
import { TiMinus } from "react-icons/ti"
import { GoPlus } from "react-icons/go"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch } from 'react-redux';
import { deleteCartItem, increaseQty, decreaseQty } from "../../redux/productSlide"
import GoogleDriveImage from '../GoogleDriveImage/GoogleDriveImage';



export const CartProduct = ({ id, itemName, images, price, brand, color, desc, qty, total }) => {
const dispatch = useDispatch()
    return (<>
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="w-20">
                    <GoogleDriveImage url={images[0]} className="h-24" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{itemName}</span>
                    <span className="text-red-500 text-xs">{brand}</span>
                    <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs w-[10px]" onClick={() => dispatch(deleteCartItem(id))}>Remove</a>
                </div>
            </div>
            <div className="flex justify-center w-1/5">
                {/* <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg> */}

                <button
                    onClick={() => dispatch(decreaseQty(id))}>
                        <TiMinus />
                </button>
                <p className='m-3'>{ qty }</p>
                <button
                    onClick={() => dispatch(increaseQty(id))}>
                    <GoPlus />
                </button>

            
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">$ {price}</span>
            <span className="text-center w-1/5 font-semibold text-sm">$ {total}</span>
        </div>
        {/* <div className="relative m-3 flex flex-wrap mx-auto justify-center">
            <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                <div className="overflow-x-hidden rounded-2xl relative">
                    <img className="h-40 rounded-2xl w-full object-cover" src={images[1]}/>
                    <div className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer"
                    onClick={()=>dispatch(deleteCartItem(id))}>
                        <svg  className="h-4 w-4  opacity-70" >
                            <RiDeleteBin6Line classNameName='text-red-500 '/>
                            
                        </svg>
                    </div>
                </div>
                <div className="mt-4 pl-2 mb-2  justify-between">
                    <div classNameName=''>
                        <p className="text-lg font-semibold text-gray-900 mb-0">{itemName}</p>
                        <p className="text-md text-gray-800 mt-0">Price : $ {price}</p>
                        <p className="text-md text-gray-800 mt-0">Brand : {brand}</p>
                        <p className="text-md text-gray-800 mt-0">Color : {color}</p>
                    </div>
                    <div className="flex gap-3 items-center cursor-pointer justify-evenly w-full h-[70px]  ">
                        
                        
                            <button 
                            onClick={() => dispatch(increaseQty(id))}
                            classNameName=" bg-gray-200 hover:bg-red-100 rounded-full 
                        py-2 px-2 shadow-md hover:shadow-2xl duration-500"><GoPlus /></button>
                        
                        <p>{qty}</p>
                            <button 
                            onClick={() => dispatch(decreaseQty(id))}
                            classNameName=' bg-gray-200 hover:bg-red-100 rounded-full 
                        py-2 px-2 shadow-md hover:shadow-2xl duration-500 end-0'><TiMinus /></button>
                        
                        <p classNameName=''>Total Price : $ {total}</p>
                    </div>
                    
                </div>
            </div>

        </div> */}

    </>
    )
}
