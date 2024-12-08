"use client"
import React, { useState } from 'react';
import styles from './FilterBox.module.css'; 

export default function FilterBox({ title, options, onSelect, value }) {
  
  
  // Upddate hook on other end
  const handleChange = (e) => {
      onSelect(e.target.value);
  };
  
  // Format display title to remove underscore, make it all upper case too
  const displayTitle = title ? title.replace(/_/g, ' ').toUpperCase() : '';
  return (
    <div className={styles.dropdownContainer}>
      {displayTitle && <label className={styles.title}>{displayTitle}   </label>}
      <select
        className={styles.dropdown}
        value={value}
        onChange={handleChange}
      >
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}