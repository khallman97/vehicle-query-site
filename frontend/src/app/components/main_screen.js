import React from 'react';
import styles from './MainScreen.module.css'; 
import Link from "next/link";
import SearchBar from '@/app/components/searchbar/searchbar'

// Main screen with search bar and buttons for selecting type
export default function MainScreen() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Vehicle Finder</h1>
            <div className={styles.searchBox}>
                <SearchBar > </SearchBar>
            </div>
            
            <div className={styles.buttonContainer}>
                <Link href="/vehicles/bikes" className={styles.button}>
                    <img src="/images/bike.jpg" alt="Bike" className={styles.buttonImage} />
                    <p className={styles.buttonText}>Bikes</p>
                </Link>
                <Link href="/vehicles/cars" className={styles.button}>
                    <img src="/images/car.jpg" alt="Button 2" className={styles.buttonImage} />
                    <p className={styles.buttonText}>Cars</p>
                    </Link>
                <Link href="/vehicles/spaceships" className={styles.button}>
                    <img src="/images/spaceship.jpg" alt="Button 3" className={styles.buttonImage} />
                    <p className={styles.buttonText}>Spaceships</p>
                    </Link>
            </div>
        </div>
    );
}