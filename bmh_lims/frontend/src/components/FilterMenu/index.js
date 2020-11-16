import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

const FilterMenu = ({dateRange, name, projectID, lab, genus, type}) => {
    return (
        <div>
            <div>Filters ... (symbol)</div>
            <div>Name, Project ID, Beginning Date, End Date</div>
            <div>Lab, Genus, Type</div>
        </div>
    )
}

export default FilterMenu
