import React, { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
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


  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-10 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
          <div>
            <h1 className="font-display text-2xl text-ink">ShopKart</h1>
            <p className="mt-0.5 text-sm text-ink-soft">Discover products you'll love.</p>
          </div>

          <Link
            to="/home"
            className="rounded-md border border-line bg-surface px-3.5 py-2 text-sm font-semibold text-ink-soft transition hover:border-primary/40 hover:text-primary"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <SearchBar setSearch={setSearch} setCategory={setCategory}/>

        <div className="mt-10 mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">Products</h2>
          <span className="text-sm text-ink-soft">{products?.length} products</span>
        </div>

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