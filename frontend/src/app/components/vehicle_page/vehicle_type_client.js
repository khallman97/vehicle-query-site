
"use client"
import { useState, useEffect, useCallback } from 'react';
import { useParams , useRouter  } from "next/navigation"; 
import VehcileContentBox from "@/app/components/vehicle_page/content/content_box/vehcile_content_box";
import FilterBox from "@/app/components/vehicle_page/filter/filter_box/filter_box";
import NumberRangeFilter from "@/app/components/vehicle_page/filter/number_filter/number_filter";
import styles from "./Vehciles.module.css";

import {  useQuery, useLazyQuery } from "@apollo/client";
import {
    GET_BIKES,
    GET_CARS,
    GET_SPACESHIPS,
    GET_DISTINCT_BIKE_FIELDS,
    GET_DISTINCT_CAR_FIELDS,
    GET_DISTINCT_SPACESHIP_FIELDS, 
} from "@/app/lib/queries.js"


// Main screen for when you have a vechile type selected
export default  function VehicleTypeClient( ) {
    const [filters, setFilters] = useState({});
    const [filterOptions, setFilterOptions] = useState({});
    
    // id comes from params, used for type of query
    const { id } = useParams();

    // route to push to page with vechile content on select
    const router = useRouter();

    // Determine which query to use based on the vehicle type 
    const { getDistinctFieldsQuery, getVehiclesQuery, mapDistinctData } = getQueries(id);

    // Helps force the filters to update when a new filter is selected
    const stableMapDistinctData = useCallback(mapDistinctData, []);

    // Gets the filter content (what the filter options are)
    const {
        data: distinctData,
        loading: distinctLoading,
        refetch: refetchDistinctFields,
      } = useQuery(getDistinctFieldsQuery, {
        variables: { filters },
      });

    // Fetch vehicles based on the filters
    const [fetchVehicles, { data: vehicleData, loading: vehicleLoading, error: vehicleError }] = useLazyQuery(getVehiclesQuery, {variables: filters});


    // set filters 
    useEffect(() => {
        if (distinctData) {
            const mappedData = mapDistinctData(distinctData);
            setFilterOptions({ ...mappedData });
        }
    }, [distinctData, stableMapDistinctData]);

    // force filters to update when a new one is selected
    useEffect(() => {}, [filterOptions]); 

    // Fetch filtered data whenever filters change
    useEffect(() => {
        fetchVehicles({ variables: filters });
        refetchDistinctFields({ filters }); 
    }, [filters, fetchVehicles, refetchDistinctFields]);
    

    // Handle changing the filters to adjust to new values
    const handleFilterChange = (field, value) => {
        setFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };
         
          if (Array.isArray(value)) {
            // For numeric ranges, set Gte and Lte
            if (value.length === 2) {
              updatedFilters[`${field}Gte`] = value[0];
              updatedFilters[`${field}Lte`] = value[1];
            // If the gte and lte are the same then adjust so min and max are the same
            } else if (value.length == 1) { 
                updatedFilters[`${field}Gte`] = value[0];
                updatedFilters[`${field}Lte`] = value[0];
            }
          } else if (!value) {
            // If All then delete all filters
            delete updatedFilters[field];
            delete updatedFilters[`${field}Gte`];
            delete updatedFilters[`${field}Lte`];
          } else {
            updatedFilters[field] = value;
          }
      
          return updatedFilters;
        });
      };

    if (distinctLoading || vehicleLoading) {
        return <h2>Loading...</h2>;
    }

    if (vehicleError) {
        console.error(vehicleError);
        return <p>Error loading vehicles</p>;
    }

    const vehicles = vehicleData?.[id] || [];
    return (
         <div className={styles.container}>
            <div className={styles.filtersContainer}>
            {Object.keys(filterOptions).map((field) => {
                const opts = filterOptions[field];
                const firstOption = opts[0];
                // Check if filter is a number then use the number filter component otherwise use regualer filter
                const isNumeric = typeof firstOption === 'number';
                if (isNumeric) {
                    const minVal = Math.min(...opts);
                    const maxVal = Math.max(...opts);
                    const currentValue = [
                        filters[`${field}Gte`] || minVal,
                        filters[`${field}Lte`] || maxVal,
                      ]; 
                    return (
                    <NumberRangeFilter
                        key={`${field}-${minVal}-${maxVal}`}
                        title={field.replace(/_/g, ' ').toUpperCase()}
                        min={minVal}
                        max={maxVal}
                        value={currentValue}
                        onChange={(newRange) => handleFilterChange(field, newRange)}
                    />
                    );
                } else {
                    return (
                    <FilterBox
                        key={field}
                        title={field}
                        options={opts}
                        onSelect={(value) => handleFilterChange(field, value)}
                        value={filters[field] || ""}
                    />
                    );
                }
                })}
            </div>
        <div className={styles.contentWrapper}>
            
            <div className={styles.contentBox}>
                {vehicles.map((vehicle, index) => (
                    <div
                        key={index}
                        onClick={() => router.push(`/vehicle/${id}/${encodeURIComponent(vehicle.model)}`)}
                        style={{ cursor: 'pointer' }}
                        className={styles.vehicleItem}
                    >
                        <VehcileContentBox params={vehicle} />
                    </div>
                ))}
            </div>

        </div>
        </div> 
    );
}

// Function to get queries based off the type selected
function getQueries(type) {
    switch (type) {
      case "bikes":
        return {
          getDistinctFieldsQuery: GET_DISTINCT_BIKE_FIELDS,
          getVehiclesQuery: GET_BIKES,
          mapDistinctData: (data) => ({
            type: data.distinctBikeFields.types,
            brand: data.distinctBikeFields.brands,
            gears: data.distinctBikeFields.gearCounts,
            wheel_size: data.distinctBikeFields.wheelSizes,
            year: data.distinctBikeFields.years,
          }),
        };
      case "cars":
        return {
          getDistinctFieldsQuery: GET_DISTINCT_CAR_FIELDS,
          getVehiclesQuery: GET_CARS,
          mapDistinctData: (data) => ({
            colour: data.distinctCarFields.colours,
            engine_size: data.distinctCarFields.engineSizes,
            horsepower: data.distinctCarFields.horsepowers,
            seats: data.distinctCarFields.totalSeats,
            top_speed: data.distinctCarFields.topSpeeds,
            year: data.distinctCarFields.years,
          }),
        };
      case "spaceships":
        return {
          getDistinctFieldsQuery: GET_DISTINCT_SPACESHIP_FIELDS,
          getVehiclesQuery: GET_SPACESHIPS,
          mapDistinctData: (data) => ({
            manufacturer: data.distinctSpaceshipFields.manufacturers,
            max_crew: data.distinctSpaceshipFields.maxCrews,
            top_speed: data.distinctSpaceshipFields.topSpeeds,
            year: data.distinctSpaceshipFields.years,
          }),
        };
      default:
        throw new Error(`Unknown vehicle type: ${type}`);
    }
  }