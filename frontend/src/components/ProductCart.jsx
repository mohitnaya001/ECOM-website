import React from 'react'
import { Link } from 'react-router-dom'
const ProductCart = ({product}) => {
  return (
    <div className="group w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="h-64 w-full overflow-hidden bg-gray-100">
        <img src={product.imageUrl} alt={product.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"/>
        </div>
        <div className='p-5'>
            <h3 className="mb-2 truncate text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="mb-4 text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
            <Link to={`/products/${product._id}`}
            className="inline-block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                View Details
            </Link>

        </div>
    </div>
  )
}

export default ProductCart