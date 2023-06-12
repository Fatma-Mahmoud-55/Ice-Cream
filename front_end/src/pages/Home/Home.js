import React from 'react'
import { HomeCard } from "../../components/HomeCard/HomeCard";
import { useSelector } from 'react-redux';


  const Home = () => {
  const productsData = useSelector((state)=>state.product.productList)
  //  console.log(productsData)

  return (
    <>
      <div className='w-full mr-2'>
        {/* <img className='w-1/2  h-[100-px]' src='https://static.wixstatic.com/media/1fdfef_6f156fe9941043d6af1d17aaecb14fb0~mv2.png/v1/crop/x_184,y_0,w_1795,h_3000/fill/w_599,h_994,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/CONE_edited.png'/> */}

    </div>
      <div className='flex flex-wrap justify-center'>
        {productsData[0] && productsData.map((pro) => {
          return (
            <HomeCard
              id={pro._id}
              itemName={pro.itemName}
              brand={pro.brand}
              price={pro.price}
              color={pro.color}
              images={pro.images}
              desc={pro.desc}
            />
          )
        })}
      </div>
    </>
  )
}


export default Home
