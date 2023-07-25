import React from 'react'

const Checkbox = ({value,onChange}) => {

  return (
    <div>
      <input type='checkbox' value={value} onChange={onChange}></input>
    </div>
  )
}

export default Checkbox
