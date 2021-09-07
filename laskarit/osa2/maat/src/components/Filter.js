import React from 'react'

const Filter = ({filterCountries, filterChange}) => {
    return (
        <div>
            find countries <input value={filterCountries} onChange={filterChange} />
        </div>
    )
}

export default Filter