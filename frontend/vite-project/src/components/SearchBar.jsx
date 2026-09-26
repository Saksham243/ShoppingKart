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
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 md:flex-row">
      <div className="flex-1">
        <label className="mb-2 block text-sm font-medium text-ink">Search products</label>
        <input
          type="text"
          placeholder="Search products..."
          name="search"
          onChange={handleChange}
          className="w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
        />
      </div>

      <div className="w-full md:w-56">
        <label className="mb-2 block text-sm font-medium text-ink">Category</label>
        <select
          className="w-full rounded-md border border-line bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
          defaultValue=""
          name="category"
          onChange={handleChange}
        >
          <option value="">All categories</option>
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