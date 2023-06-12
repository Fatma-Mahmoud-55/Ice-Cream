import React from 'react'
import { addCartItem } from '../../redux/productSlide';
import { useDispatch } from 'react-redux';
import GoogleDriveImage from '../GoogleDriveImage/GoogleDriveImage';


export const HomeCard = ({ itemName, images, price, brand, color, desc,id }) => {
    const dispatch = useDispatch()
    const addToCart = (e) =>{
        e.stopPropagation();
        dispatch(addCartItem({
            _id : id,
            itemName : itemName,
            price : price,
            brand : brand,
            color : color,
            desc : desc ,
            images : images
        }))
    }

    
    return (<>
        <div className='product-section'>

            <div className="bg-white shadow-lg hover:shadow-xl rounded-lg w-[300px] ml-20 mb-20 flex flex-wrap  ">

                {/* <img src={images[0]} alt="drive image" /> */}
                <GoogleDriveImage url={images[0]} className="w-full h-[150px]" />
                <div className="flex justify-between  px-2 pt-2">
                    <div className="p-2 flex-grow">
                        <h1 className="font-medium text-xl font-poppins">{itemName}</h1>
                        <div className=' '>
                            <p className="text-gray-500  break-all">{desc}</p>

                        </div>
                    </div>
                    <div className="p-2 text-right">
                        <div className="text-teal-500 font-semibold text-lg font-poppins">$ {price}</div>
                    </div>
                </div>
                <div className="flex justify-center items-center px-2 pb-2 w-full m-auto">
                    <div className=" p-2">
                        <button  
                            onClick={addToCart}
                        className="block w-full bg-white hover:bg-gray-100 text-teal-500 border-2 border-teal-500 px-3 py-2 rounded uppercase font-poppins font-medium">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>

        </div>


    </>


    )
}
