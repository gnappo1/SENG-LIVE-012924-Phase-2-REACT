import React from 'react'

const Sorting = ({ handleUpdateSort, sortingObj }) => {
  return (
    <div>
        <select name="sortBy" onChange={handleUpdateSort} value={sortingObj.sortBy}>
            <option value="">Select One</option>
            <option value="name">Name</option>
            <option value="phase">Phase</option>
        </select>
          <div>
              <input onChange={handleUpdateSort} type="radio" id="radion-asc" name="sortHow" value="asc" checked={sortingObj.sortHow === 'asc'} />
              <label htmlFor="radion-asc">asc</label>
              <input onChange={handleUpdateSort} type="radio" id="radion-desc" name="sortHow" value="desc" checked={sortingObj.sortHow === 'desc'} />
              <label htmlFor="radio-desc">desc</label>
          </div>
    </div>
  )
}

export default Sorting