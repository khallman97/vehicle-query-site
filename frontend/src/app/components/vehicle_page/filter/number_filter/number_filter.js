"use client"
import React, { useState } from 'react';
import styles from './NumberFilter.module.css'
import { Slider } from '@mui/material';

export default function NumberRangeFilter({ title, min, max, value, onChange }) {
    
    // Controls the local state of the slider to make it look more smooth
    const [tempValue, setTempValue] = useState(value);
    const handleChange = (event, newValue) => {
        setTempValue(newValue);
      };
    
    // Once selected update the actual value
    const handleChangeCommitted = (event, newValue) => {
        onChange(newValue); 
      };
  
    return (
      <div className={styles.title}>
        <label >
          {title}
        </label>
        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="auto"
          min={min}
          max={max}
          className={styles.slider}
          step={min < 1 ? 0.1 : 1} // Adjust steps based on input of min
        />
        <div className={styles.rangeValues}>
            <span>{tempValue[0]}</span>
            <span>{tempValue[1]}</span>
      </div>
      </div>
    );
  }