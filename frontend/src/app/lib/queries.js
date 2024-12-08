import { gql } from '@apollo/client';


// Get list of all bikes, can pass in query terms as well to filter data
export const GET_BIKES = gql`
  query Bikes(
    $brand: String
    $gearsGte: Int
    $gearsLte: Int
    $type: String
    $wheel_sizeGte: Int
    $wheel_sizeLte: Int
    $yearGte: Int
    $yearLte: Int
    $model: String
  ) {
    bikes(
      brand: $brand
      gearsGte: $gearsGte
      gearsLte: $gearsLte
      type: $type
      wheel_sizeGte: $wheel_sizeGte
      wheel_sizeLte: $wheel_sizeLte
      yearGte: $yearGte
      yearLte: $yearLte
      model: $model
    ) {
      brand
      gears
      model
      type
      wheel_size
      year
    }
  }
`;

// Returns list of distinc values, can pass in a biker filter as well to limit the returns
export const GET_DISTINCT_BIKE_FIELDS = gql`
query Bikes($filters: BikeFiltersInput) {
    distinctBikeFields(filters: $filters) {
      brands
      gearCounts
      types
      wheelSizes
      years
    }
  }
`;

// Gets list of all cars, can filter data 
export const GET_CARS = gql`
  query Cars(
    $make: String
    $colour: String
    $engine_sizeGte: Float
    $engine_sizeLte: Float
    $horsepowerGte: Int
    $horsepowerLte: Int
    $seatsGte: Int
    $seatsLte: Int
    $top_speedGte: Float
    $top_speedLte: Float
    $yearGte: Int
    $yearLte: Int
    $model: String
  ) {
    cars(
      make: $make
      colour: $colour
      engine_sizeGte: $engine_sizeGte
      engine_sizeLte: $engine_sizeLte
      horsepowerGte: $horsepowerGte
      horsepowerLte: $horsepowerLte
      seatsGte: $seatsGte
      seatsLte: $seatsLte
      top_speedGte: $top_speedGte
      top_speedLte: $top_speedLte
      yearGte: $yearGte
      yearLte: $yearLte
      model: $model
    ) {
      make
      model
      colour
      engine_size
      horsepower
      seats
      top_speed
      year
    }
  }
`;

// get list of all distinc values, can filter data with car filter as well
export const GET_DISTINCT_CAR_FIELDS = gql`
query Cars($filters: CarFiltersInput) {
    distinctCarFields(filters: $filters) {
        colours
        engineSizes
        horsepowers
        totalSeats
        topSpeeds
        years
    }
  }
`;

// get list of all spaceships , can filter out data
export const GET_SPACESHIPS = gql`
  query Spaceships(
    $manufacturer: String
    $max_crewGte: Int
    $max_crewLte: Int
    $top_speedGte: Float
    $top_speedLte: Float
    $yearGte: Int
    $yearLte: Int
    $model: String
  ) {
    spaceships(
      manufacturer: $manufacturer
      max_crewGte: $max_crewGte
      max_crewLte: $max_crewLte
      top_speedGte: $top_speedGte
      top_speedLte: $top_speedLte
      yearGte: $yearGte
      yearLte: $yearLte
      model: $model
    ) {
      manufacturer
      model
      max_crew
      top_speed
      year
    }
  }
`;

// get list of all distinct spaceship values, can add filters to limit return
export const GET_DISTINCT_SPACESHIP_FIELDS = gql`
query Spaceship($filters: SpaceshipFiltersInput) {
    distinctSpaceshipFields(filters: $filters) {
        manufacturers
        maxCrews
        topSpeeds
        years
    }
  }
`;

// Returns list of all vehciles using a search term which references any string column
export const GET_ALL_VEHICLES = gql`
  query GetAllVehicles($search: String) {
    bikes(search: $search) {
      model
      brand
      type
    }
    cars(search: $search) {
      make
      model
      colour
    }
    spaceships(search: $search) {
      manufacturer
      model
    }
  }
`;

// get a vechile by its exact model
export const GET_VEHICLE_BY_MODEL = gql`
  query GetVehicleByModel($model: String!) {
    bikes(model: $model) {
      brand
      model
      type
      gears
      wheel_size
      year
    }
    cars(model: $model) {
      make
      model
      year
      colour
      engine_size
      horsepower
      seats
      top_speed
    }
    spaceships(model: $model) {
      manufacturer
      model
      year
      max_crew
      top_speed
    }
  }
`;

// get a bike by its exact model
export const GET_BIKE_BY_MODEL = gql`
  query GetBikeByModel($model: String!) {
    bikeByModel(model: $model) {
      gears
      model
      brand
      type
      wheel_size
      year
    }
  }
`;

// get a car by its exact model
export const GET_CAR_BY_MODEL = gql`
  query GetCarByModel($model: String!) {
    carByModel(model: $model) {
      colour
      engine_size
      horsepower
      make
      model
      seats
      top_speed
      year
    }
  }
`;

// get a spaceship by its exact model
export const GET_SPACESHIP_BY_MODEL = gql`
  query GetSpaceshipByModel($model: String!) {
    spaceshipByModel(model: $model) {
      manufacturer
      max_crew
      model
      top_speed
      year
    }
  }
`;