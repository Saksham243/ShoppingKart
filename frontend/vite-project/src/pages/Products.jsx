import React, { useState, useEffect, } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import axiosInstance from "../axiosCalls/axios";

function Products() {
  const [search,setSearch] = useState('')
  const [category,setCategory] = useState('')
  const [products,setProducts] = useState(null)
  const [loader,setLoader] = useState(false)
  const [err,setErr] = useState(null)
  useEffect(()=>{
    setLoader(true)
    setErr(null)
    async function fetchProdsucts(){
      try {
        const prods=await axiosInstance.get('/products/allproducts' , {params:{
          search:search,
          category:category
        }})
        setProducts(prods.data.products)  
      } catch (error) {
        setErr(error)
      }finally{
        setLoader(false)
      }  
    }
    fetchProdsucts()
  },[search,category])


  if(loader && products===null){
    return <h1>Loading....</h1>
  }

  if(err){
    return <h1>Something went wrong while loading products</h1>
  }

  // if(products.length===0){
  //   return <h1>No products found</h1>
  // }


  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            ShopKart
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Discover products you'll love.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Search + Filter */}
        <SearchBar setSearch={setSearch} setCategory={setCategory}/>

        {/* Products Heading */}
        <div className="mt-10 mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Browse our latest products
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {products?.length} products
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.length==0
          ?<h1>No products found</h1>
          :
          products?.map((product) => (
            <ProductCard
              key={product?._id}
              product={product}
            />
          ))}
        </div>

      </main>
    </div>
  );
}

export default Products;