"use client"
import React from 'react';
import styles from './VehcileContentBox.module.css'


// View of the list when looking at types of vehciles
export default  function VehcileContentBox ({ params }) {
    
    const { model } =  params
    
    return (
        <div className={styles.boxContent}>
            <h1 >{model}</h1>
            
        </div>
    );
};