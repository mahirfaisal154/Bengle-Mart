import { ShopContext } from '../context/ShopContext'
import React,{useContext} from 'react'
import { useParams } from 'react-router-dom'
import BreadCrum from '../component/BreadCrum/BreadCrum'
import ProductDisplay from '../component/ProductDisplay/ProductDisplay'
import DescriptionBox from '../component/DescriptionBox/DescriptionBox'
import RelatedProduct from '../component/RelatedProduct/RelatedProduct'

const Product = () => {
   const {allproducts}=useContext(ShopContext)
   const {productId} = useParams();
   const product=allproducts.find((e)=>e.id===Number(productId));

   if (!product) {
     return <div>Loading...</div>;
   }

  return (
    <div>
       <BreadCrum product={product}/>
       <ProductDisplay product={product}/>
       <DescriptionBox/>
       <RelatedProduct/>

    </div>
  )
}

export default Product
