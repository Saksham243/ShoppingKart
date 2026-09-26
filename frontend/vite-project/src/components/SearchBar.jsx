import React from "react";

function SearchBar({setSearch,setCategory}) {

  const handleChange=(e)=>{
    if(e.target.name==="search"){
      setSearch(e.target.value)
    }else if(e.target.name==="category"){
      setCategory(e.target.value)
    }
  }



  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row">
      
      {/* Search */}
      <div className="flex-1">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Search Products
        </label>

        <input
          type="text"
          placeholder="Search products..."
          name="search"
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Category */}
      <div className="w-full md:w-56">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Category
        </label>

        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          defaultValue=""
          name="category"
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;