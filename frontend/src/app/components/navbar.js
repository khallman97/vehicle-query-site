import React from "react";
import Link from "next/link";
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
             <Link href="/"><h1 style={{ fontSize: '20px' }} >Vehicle Finder</h1></Link>
        <div className={styles['button-group']}>
            <Link href="/vehicles/bikes" className={styles.button}>Bikes</Link> 
            <Link href="/vehicles/cars" className={styles.button}>Cars</Link>
            <Link href="/vehicles/spaceships" className={styles.button}>Spaceships</Link>
        </div>
    </nav>
);
}