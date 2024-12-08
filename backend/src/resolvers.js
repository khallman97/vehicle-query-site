const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
    Query: {
      bikes: async (_, args) => {
        const {
          search,
          brand,
          gearsGte,
          gearsLte,
          model,
          type,
          wheel_sizeGte,
          wheel_sizeLte,
          yearGte,
          yearLte,
        } = args;
        return await prisma.bikes.findMany({
          where: {
            ...(search ? { OR: [
              { model: { contains: search, mode: "insensitive" } },
              { brand: { contains: search, mode: "insensitive" } },
              { type: { contains: search, mode: "insensitive" } }
            ]} : {}),
            ...(brand ? { brand } : {}),
            ...(model ? { model } : {}),
            ...(type ? { type } : {}),
            ...(gearsGte || gearsLte
              ? { gears: { ...(gearsGte ? { gte: gearsGte } : {}), ...(gearsLte ? { lte: gearsLte } : {}) } }
              : {}),
            ...(wheel_sizeGte || wheel_sizeLte
              ? { wheel_size: { ...(wheel_sizeGte ? { gte: wheel_sizeGte } : {}), ...(wheel_sizeLte ? { lte: wheel_sizeLte } : {}) } }
              : {}),
            ...(yearGte || yearLte
              ? { year: { ...(yearGte ? { gte: yearGte } : {}), ...(yearLte ? { lte: yearLte } : {}) } }
              : {}),
          },
        });
      },
      cars: async (_, args) => {
        const {
          search,
          make,
          colour,
          engine_sizeGte,
          engine_sizeLte,
          seatsGte,
          seatsLte,
          top_speedGte,
          top_speedLte,
          yearGte,
          yearLte,
          model,
        } = args;
      
        return await prisma.cars.findMany({
          where: {
            ...(search
              ? {
                  OR: [
                    { make: { contains: search, mode: "insensitive" } },
                    { colour: { contains: search, mode: "insensitive" } },
                    { model: { contains: search, mode: "insensitive" } },
                  ],
                }
              : {}),
            ...(make ? { make } : {}),
            ...(colour ? { colour } : {}),
            ...(model ? { model } : {}),
            ...(engine_sizeGte || engine_sizeLte
              ? { engine_size: { ...(engine_sizeGte ? { gte: engine_sizeGte } : {}), ...(engine_sizeLte ? { lte: engine_sizeLte } : {}) } }
              : {}),
            ...(seatsGte || seatsLte
              ? { seats: { ...(seatsGte ? { gte: seatsGte } : {}), ...(seatsLte ? { lte: seatsLte } : {}) } }
              : {}),
            ...(top_speedGte || top_speedLte
              ? { top_speed: { ...(top_speedGte ? { gte: top_speedGte } : {}), ...(top_speedLte ? { lte: top_speedLte } : {}) } }
              : {}),
            ...(yearGte || yearLte
              ? { year: { ...(yearGte ? { gte: yearGte } : {}), ...(yearLte ? { lte: yearLte } : {}) } }
              : {}),
          },
        });
      },
      spaceships: async (_, args) => {
        const {
          search,
          manufacturer,
          max_crewGte,
          max_crewLte,
          top_speedGte,
          top_speedLte,
          yearGte,
          yearLte,
          model,
        } = args;
      
        return await prisma.spaceships.findMany({
          where: {
            ...(search
              ? {
                  OR: [
                    { manufacturer: { contains: search, mode: "insensitive" } },
                    { model: { contains: search, mode: "insensitive" } },
                  ],
                }
              : {}),
            ...(manufacturer ? { manufacturer } : {}),
            ...(model ? { model } : {}),
            ...(max_crewGte || max_crewLte
              ? { max_crew: { ...(max_crewGte ? { gte: max_crewGte } : {}), ...(max_crewLte ? { lte: max_crewLte } : {}) } }
              : {}),
            ...(top_speedGte || top_speedLte
              ? { top_speed: { ...(top_speedGte ? { gte: top_speedGte } : {}), ...(top_speedLte ? { lte: top_speedLte } : {}) } }
              : {}),
            ...(yearGte || yearLte
              ? { year: { ...(yearGte ? { gte: yearGte } : {}), ...(yearLte ? { lte: yearLte } : {}) } }
              : {}),
          },
        });
      },
      distinctBikeFields: async (_, {filters}) => {

        const whereClause = {
          ...filters, // Apply filters dynamically
          ...(filters?.gears ? { gears: { gte: filters.gears.gte, lte: filters.gears.lte } } : {}),
          ...(filters?.year ? { year: { gte: filters.year.gte, lte: filters.year.lte } } : {}),
          ...(filters?.wheel_size ? { wheel_size: { gte: filters.wheel_size.gte, lte: filters.wheel_size.lte } } : {}),
        };

        const brands = await prisma.bikes.findMany({
          distinct: ['brand'],
          where: whereClause,
          select: { brand: true },
        });
  
        const types = await prisma.bikes.findMany({
          distinct: ['type'],
          where: whereClause,
          select: { type: true },
        });
  
        const gearCounts = await prisma.bikes.findMany({
          distinct: ['gears'],
          where: whereClause,
          select: { gears: true },
        });
  
        const wheelSizes = await prisma.bikes.findMany({
          distinct: ['wheel_size'],
          where: whereClause,
          select: { wheel_size: true },
        });
  
        const years = await prisma.bikes.findMany({
          distinct: ['year'],
          where: whereClause,
          select: { year: true },
        });
  
        return {
          brands: brands.map((item) => item.brand),
          types: types.map((item) => item.type),
          gearCounts: gearCounts.map((item) => item.gears),
          wheelSizes: wheelSizes.map((item) => item.wheel_size),
          years: years.map((item) => item.year),
        };
      },
      distinctCarFields: async (_, {filters}) => {
        const whereClause = {
          ...filters, // Apply filters dynamically
          ...(filters?.engine_size ? { engine_size: { gte: filters.engine_size.gte, lte: filters.engine_size.lte } } : {}),
          ...(filters?.horsepower ? { horsepower: { gte: filters.horsepower.gte, lte: filters.horsepower.lte } } : {}),
          ...(filters?.year ? { year: { gte: filters.year.gte, lte: filters.year.lte } } : {}),
          ...(filters?.seats ? { seats: { gte: filters.seats.gte, lte: filters.seats.lte } } : {}),
          ...(filters?.top_speed ? { seats: { gte: filters.top_speed.gte, lte: filters.top_speed.lte } } : {})
        };

        const colours = await prisma.cars.findMany({
          distinct: ['colour'],
          where: whereClause,
          select: { colour: true },
        });
  
        const engineSizes = await prisma.cars.findMany({
          distinct: ['engine_size'],
          where: whereClause,
          select: { engine_size: true },
        });
  
        const horsepowers = await prisma.cars.findMany({
          distinct: ['horsepower'],
          where: whereClause,
          select: { horsepower: true },
        });
  
        const makes = await prisma.cars.findMany({
          distinct: ['make'],
          where: whereClause,
          select: { make: true },
        });
  
        const totalSeats = await prisma.cars.findMany({
          distinct: ['seats'],
          where: whereClause,
          select: { seats: true },
        });

        const topSpeeds = await prisma.cars.findMany({
          distinct: ['top_speed'],
          where: whereClause,
          select: { top_speed: true },
        });

        const years = await prisma.cars.findMany({
          distinct: ['year'],
          where: whereClause,
          select: { year: true },
        });
  
        return {
          colours: colours.map((item) => item.colour),
          engineSizes: engineSizes.map((item) => item.engine_size),
          horsepowers: horsepowers.map((item) => item.horsepower),
          makes: makes.map((item) => item.make),
          //models: models.map((item) => item.model),
          totalSeats: totalSeats.map((item) => item.seats),
          topSpeeds: topSpeeds.map((item) => item.top_speed),
          years: years.map((item) => item.year),
        };
      },
      distinctSpaceshipFields: async (_, {filters}) => {
        const whereClause = {
          ...filters, // Apply filters dynamically
          ...(filters?.max_crew ? { max_crew: { gte: filters.max_crew.gte, lte: filters.max_crew.lte } } : {}),
          ...(filters?.year ? { year: { gte: filters.year.gte, lte: filters.year.lte } } : {}),
          ...(filters?.top_speed ? { seats: { gte: filters.top_speed.gte, lte: filters.top_speed.lte } } : {})
        };
        const manufacturers = await prisma.spaceships.findMany({
          distinct: ['manufacturer'],
          where: whereClause,
          select: { manufacturer: true },
        });
  
        const maxCrews = await prisma.spaceships.findMany({
          distinct: ['max_crew'],
          where: whereClause,
          select: { max_crew: true },
        });


        const topSpeeds = await prisma.spaceships.findMany({
          distinct: ['top_speed'],
          where: whereClause,
          select: { top_speed: true },
        });

        const years = await prisma.spaceships.findMany({
          distinct: ['year'],
          where: whereClause,
          select: { year: true },
        });
  
        return {
          manufacturers: manufacturers.map((item) => item.manufacturer),
          maxCrews: maxCrews.map((item) => item.max_crew),
          //models: models.map((item) => item.model),
          topSpeeds: topSpeeds.map((item) => item.top_speed),
          years: years.map((item) => item.year),
        };
      },
      bikeByModel: async (_, { model }) => {
        return await prisma.bikes.findFirst({
          where: { model: model },
        });
      },
      carByModel: async (_, { model }) => {
        return await prisma.cars.findFirst({
          where: { model: model },
        });
      },
      spaceshipByModel: async (_, { model }) => {
        return await prisma.spaceships.findFirst({
          where: { model: model },
        });
      }
    },
    Mutation: {
      addBike: async (_, { input }) => {
        return await prisma.bikes.create({
          data: input,
        });
      },
      addCar: async (_, { input }) => {
        return await prisma.cars.create({
          data: input,
        });
      },
      addSpaceship: async (_, { input }) => {
        return await prisma.spaceships.create({
          data: input,
        });
      },
    },
};

module.exports = resolvers;
