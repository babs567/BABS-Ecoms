import {Link } from 'react-router-dom'
import ProductCard from './ProductCard'

export default function PreOrderProduct({data}) {
const filterPreOrderProducts = data.filter((product)=> product.condition === 'New')
console.log('Preorder', filterPreOrderProducts)
  return (

    <div className='mb-2'>
        <div>
       <h1 className='fs-3  fw-bold text-uppercase text-center py-4'>PreOrder</h1>
       <h1 className='fs-5 text-black-50 text-center'>
        <Link className='text-black-50 fw-bold ' to={"/collections"}>
        VIEW ALL
        </Link>
       </h1>
        </div>
    </div>
  )
}