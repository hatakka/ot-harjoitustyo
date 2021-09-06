import React from 'react'

const Filter = ({filterNumbers, filterChange}) => {
    return (
        <div>
            filter shown with <input value={filterNumbers} onChange={filterChange} />
        </div>
    )
}

export default Filter