import React from 'react';

const Dropdown = ({ options, makeSelection }) => {
  console.log(options);

  const handleChange = (val) => {
    const currentSelected = options.filter(o => o.qState === 'S').map(o => Number(o.qElemNumber))
    currentSelected.push(Number(val));
    makeSelection(currentSelected);
  }
  return (
    <select onChange={(e) => handleChange(e.target.value)}>
      {options.map((opt, i) => <option key={i} value={opt.qElemNumber}>{opt.qText} - {opt.qState}</option>)}
    </select>
  )
}

export default Dropdown;