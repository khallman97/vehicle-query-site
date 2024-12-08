const { gql } = require('apollo-server');

const typeDefs = gql`
  type Bike {
    gears: Int
    model: String
    brand: String
    type: String
    wheel_size: Int
    year: Int
  }

  type Car {
    colour: String
    engine_size: Float
    horsepower: Int
    make: String
    model: String
    seats: Int
    top_speed: Float
    year: Int
  }

  type Spaceship {
    manufacturer: String
    max_crew: Int
    model: String
    top_speed: Float
    year: Int
  }

  type DistinctBikeFields {
    brands: [String]
    types: [String]
    gearCounts: [Int]
    wheelSizes: [Int]
    years: [Int]
  }

  type DistinctCarsFields {
    colours: [String]
    engineSizes: [Float]
    horsepowers: [Int]
    makes: [String]
    totalSeats: [Int]
    topSpeeds: [Float]
    years: [Int]
  }

  type DistinctSpaceshipsFields {
    manufacturers: [String]
    maxCrews: [Int]
    topSpeeds: [Float]
    years: [Int]
  }

  input BikeFiltersInput {
    brand: String
    gears: IntRangeInput
    type: String
    wheel_size: IntRangeInput
    year: IntRangeInput
  }

  input CarFiltersInput {
    colour: String
    horsepower: IntRangeInput
    engine_size: FloatRangeInput
    make: String
    model: String
    seats: IntRangeInput
    top_speed: FloatRangeInput
    year: IntRangeInput
  }

  input SpaceshipFiltersInput {
    manufacturer: String
    max_crew: IntRangeInput
    model: String
    top_speed: FloatRangeInput
    year: IntRangeInput
  }
  
  input IntRangeInput {
    gte: Int
    lte: Int
  }

  input FloatRangeInput {
    gte: Float
    lte: Float
  }

  type Query {
    bikes(
      search: String
      brand: String
      gearsGte: Int
      gearsLte: Int
      model: String
      type: String
      wheel_sizeGte: Int
      wheel_sizeLte: Int
      yearGte: Int
      yearLte: Int
    ): [Bike]
  
    cars(
      search: String
      colour: String
      engine_sizeGte: Float
      engine_sizeLte: Float
      horsepowerGte: Int
      horsepowerLte: Int
      make: String
      model: String
      seatsGte: Int
      seatsLte: Int
      top_speedGte: Float
      top_speedLte: Float
      yearGte: Int
      yearLte: Int
    ): [Car]
  
    spaceships(
      search: String
      manufacturer: String
      max_crewGte: Int
      max_crewLte: Int
      model: String
      top_speedGte: Float
      top_speedLte: Float
      yearGte: Int
      yearLte: Int
    ): [Spaceship]

    distinctBikeFields(filters: BikeFiltersInput): DistinctBikeFields
    distinctCarFields(filters: CarFiltersInput): DistinctCarsFields
    distinctSpaceshipFields(filters: SpaceshipFiltersInput): DistinctSpaceshipsFields
    
    

    bikeByModel(model: String!): Bike
    carByModel(model: String!): Car
    spaceshipByModel(model: String!): Spaceship
  }

  input BikeInput {
    gears: Int
    model: String
    brand: String
    type: String
    wheel_size: Int
    year: Int
  }

  input CarInput {
    colour: String
    engine_size: Float
    horsepower: Int
    make: String
    model: String
    seats: Int
    top_speed: Float
    year: Int
  }

  input SpaceshipInput {
    manufacturer: String
    max_crew: Int
    model: String
    top_speed: Float
    year: Int
  }

  type Mutation {
    addBike(input: BikeInput!): Bike
    addCar(input: CarInput!): Car
    addSpaceship(input: SpaceshipInput!): Spaceship
  }

`;

module.exports = typeDefs;
