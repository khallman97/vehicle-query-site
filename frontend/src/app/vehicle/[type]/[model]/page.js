"use client";

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_BIKE_BY_MODEL, GET_CAR_BY_MODEL, GET_SPACESHIP_BY_MODEL } from '@/app/lib/queries';
import ContentCard from '@/app/components/vehicle_page/content/content_card/content_card';

// shows all information about an exact model. Needs to type and model to process
export default function VehicleTypeModelPage() {
  const { type, model } = useParams();


  if (!model) {
    return <p>No model provided in the URL</p>;
  }
  
  // Decode the model in case there are spaces in the url
  const decodedModel =  decodeURIComponent(model);
  
  // Selects the right query based on the type provided
  const queryDetails = {
    bike: { query: GET_BIKE_BY_MODEL, key: 'bikeByModel' },
    bikes: { query: GET_BIKE_BY_MODEL, key: 'bikeByModel' },
    car: { query: GET_CAR_BY_MODEL, key: 'carByModel' },
    cars: { query: GET_CAR_BY_MODEL, key: 'carByModel' },
    spaceship: { query: GET_SPACESHIP_BY_MODEL, key: 'spaceshipByModel' },
    spaceships: { query: GET_SPACESHIP_BY_MODEL, key: 'spaceshipByModel' },
  }[type] || null;
  
  // Query the data
  const { data, loading, error } = useQuery(queryDetails.query, { variables: { model: decodedModel } });
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error loading vehicle</p>;
  }

  // Extract the vehicle data 
  const vehicle = data?.[queryDetails.key];
  if (!vehicle) {
    return <p>No {type} found with model: {model}</p>;
  }
  // pass data to content card
  return (
    <ContentCard vechile={vehicle}/>
  );
}
