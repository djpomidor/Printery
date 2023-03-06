import React from 'react'

const Search = () => {
  return (
    <form className="form-inline ms-auto me-4 d-none d-md-flex">
    <div className="input-group input-group-inline shadow-none">
      <span className="input-group-text border-0 shadow-none ps-0 pe-3"><i className="bi bi-search"></i> </span>
      <input type="text" className="form-control form-control-flush" placeholder="Search" aria-label="Search" />
    </div>
  </form>
  )
}

export default Search