import React from 'react';
import styles from './ContentCard.module.css';

// Shows all informtion about a vehcile when selected
export default function ContentCard({ vechile }) {
  
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          {vechile.__typename === 'Bike' && (
            <>
              <h2 className={styles.title}>Model: {vechile.model}</h2>
              <ul className={styles.list}>
                  <li><strong>Brand:</strong> {vechile.brand}</li>
                  <li><strong>Type:</strong> {vechile.type}</li>
                  <li><strong>Gears:</strong> {vechile.gears}</li>
                  <li><strong>Wheel Size:</strong> {vechile.wheel_size}</li>
                  <li><strong>Year:</strong> {vechile.year}</li>
              </ul>
            </>
          )}

          {vechile.__typename === 'Car' && (
            <>
              <h2 className={styles.title}>Model: {vechile.model}</h2>
              <ul className={styles.list}>
                  <li><strong>Colour:</strong> {vechile.colour}</li>
                  <li><strong>Engine Size:</strong> {vechile.engine_size}</li>
                  <li><strong>Horsepower:</strong> {vechile.horsepower}</li>
                  <li><strong>Make :</strong> {vechile.make}</li>
                  <li><strong>Seats:</strong> {vechile.seats}</li>
                  <li><strong>Top Speed:</strong> {vechile.top_speed}</li>
                  <li><strong>Year:</strong> {vechile.year}</li>
              </ul>
            </>
          )}

          {vechile.__typename === 'Spaceship' && (
            <>
              <h2 className={styles.title}>Model: {vechile.model}</h2>
              <ul className={styles.list}>
                  <li><strong>Manufacturer:</strong> {vechile.manufacturer}</li>
                  <li><strong>Max Crew Size:</strong> {vechile.max_crew}</li>
                  <li><strong>Top Speed:</strong> {vechile.top_speed}</li>
                  <li><strong>Year:</strong> {vechile.year}</li>
              </ul>
            </>
          )}

          {(!vechile.__typename || !['Bike','Car','Spaceship'].includes(vechile.__typename)) && (
            <h1>Vehicle Info Not Found</h1>
          )}
        </div>
      </div>
    );
}
