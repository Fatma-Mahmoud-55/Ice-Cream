import React from 'react'
import { useSelector } from 'react-redux'
import { HomeCard } from '../../components/HomeCard/HomeCard'
import { CartProduct } from '../../components/CartProduct/CartProduct'
import emptyCart from "../../images/emptyCart.gif"
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js"
import { toast } from 'react-hot-toast';

export const Cart = () => {
  const cartProducts = useSelector((state) => state.product.cartItem)
  console.log(cartProducts)
  const totalPrice = cartProducts.reduce((acc, curr) => acc + parseInt(curr.total), 0)
  const totalQuantity = cartProducts.reduce((acc, curr) => acc + parseInt(curr.qty), 0)
  //////////////////
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()


  const handleCheckout = async () => {
    if (user.email) {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KRY)
      const paymentData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/checkout`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },

        body: JSON.stringify(cartProducts)
      })

      if (paymentData.statusCode === 500) return;
      const resData = await paymentData.json()
      console.log(resData)

      toast("Redirect to Payment Gateway .....!")
      stripe.redirectToCheckout({ sessionId: resData })
    } else {
      toast("You Have To Login First ...")
      setTimeout(() => {
        navigate("/login")
      }, 1000)

    }



  }
  return (
    <>
      <div className='p-10'>

        <h1 className='w-[200px] m-auto text-2xl font-bold '>Your Cart Items </h1>
        <h1>You have {cartProducts.length} items at Cart</h1>
        {cartProducts[0] ?
          <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
              <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl"> {cartProducts.length} Items</h2>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                  <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                  <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                </div>
                {cartProducts.map(pro => {
                  return (
                    <CartProduct
                      id={pro._id}
                      itemName={pro.itemName}
                      brand={pro.brand}
                      price={pro.price}
                      color={pro.color}
                      images={pro.images}
                      desc={pro.desc}
                      qty={pro.qty}
                      total={pro.total}
                    />
                  )
                })}
                <Link to={"/home"} className="flex font-semibold text-indigo-600 text-sm mt-10">

                  <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                  Continue Shopping


                </Link>
                {/* <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">

              </a> */}
              </div>






              <div id="summary" className="w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>

                <div className="flex justify-between mt-10 mb-5 ">
                  <span className="font-semibold text-sm  uppercase">Items {cartProducts.length}</span>

                </div>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">Total Quantity </span>
                  <span className="font-semibold text-sm">{totalQuantity} item</span>
                </div>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">Price </span>
                  <span className="font-semibold text-sm">$ {totalPrice} </span>
                </div>
                {/* <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                  <select className="block p-2 text-gray-600 w-full text-sm">
                    <option>Standard shipping - $10.00</option>
                  </select>
                </div> */}
                {/* <div className="py-10">
                  <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                  <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                </div> */}
                {/* <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm
               text-white uppercase">Apply</button> */}
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>$ {totalPrice}</span>
                  </div>
                  <button className="bg-indigo-500 font-semibold
                 hover:bg-indigo-600 py-3 text-sm text-white uppercase 
                 w-full" onClick={handleCheckout}>Checkout</button>
                </div>
              </div>

            </div>
          </div>
          :
          <div className='flex w-full justify-center items-center'>
            <img src={emptyCart} className='w-full max-w-sm ' />
          </div>
        }

















        {/* cart items */}
        <div className='flex flex-wrap justify-center'>

          {/* {cartProducts.map(pro=>{
            return(
              <CartProduct
                id={pro._id}
                itemName={pro.itemName}
                brand={pro.brand}
                price={pro.price}
                color={pro.color}
                images={pro.images}
                desc={pro.desc} 
                qty = {pro.qty}
                total={pro.total} 
              />
            )
          })}
       */}
        </div>

      </div>

      {/* total  */}
      <dic className="">

      </dic>


    </>
  )
}
