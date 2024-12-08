#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
    
    CREATE TABLE IF NOT EXISTS bikes (
        brand varchar(20),
        gears int,
        model varchar(50) Primary Key,
        type varchar(20),
        wheel_size int,
        year int
    );


    CREATE TABLE IF NOT EXISTS cars (
        colour varchar(20),
        engine_size float4,
        horsepower int,
        make varchar(50),
        model varchar(20) Primary Key,
        seats int,
        top_speed float4,
        year int
    );


    CREATE TABLE IF NOT EXISTS spaceships (
        manufacturer varchar(50),
        max_crew int,
        model varchar(20) Primary Key,
        top_speed float8,
        year int
    );

    INSERT INTO bikes (brand, gears, model, type, wheel_size, year) VALUES
    ('EraCraft', 3, 'Urbanite', 'Road', 29, 2014),
    ('GreenVolt', 14, 'MetroCruiser', 'BMX', 12, 1997),
    ('TrailPeak', 24, 'SwiftLink', 'City', 29, 2004),
    ('TourBound', 3, 'CityScape', 'City', 16, 1989),
    ('RockForge', 14, 'Viva', 'City', 29, 2017),
    ('Echo Mountain', 1, 'EcoCruze', 'Mountain', 26, 2021),
    ('Summit Cycles', 27, 'Loop', 'City', 16, 2011),
    ('Eldorado Cycles', 7, 'Streetwise', 'BMX', 24, 1989),
    ('TrailPeak', 1, 'Transit Pro', 'BMX', 20, 1987),
    ('TrailPeak', 14, 'Pulse Commute', 'City', 27.5, 2023),
    ('MetroCycle', 14, 'VoltDrive', 'BMX', 26, 2017),
    ('RidgeLine', 3, 'EcoBoost', 'Hybrid', 20, 2001),
    ('RidgeLine', 3, 'SwiftE', 'Hybrid', 26, 2002),
    ('AeroCycle', 27, 'ChargeRide', 'BMX', 24, 2013),
    ('Urbane Wheels', 27, 'Pulse Hybrid', 'Road', 27.5, 1980),
    ('Urbane Wheels', 7, 'GreenRide', 'BMX', 26, 1988),
    ('ChargeLine', 7, 'Energia', 'BMX', 20, 1990),
    ('ChargeLine', 7, 'Voltix', 'Road', 27.5, 1988),
    ('Apollo & Co.', 3, 'NeoCycle', 'BMX', 24, 1989),
    ('CommuteWorks', 27, 'Amped', 'City', 27.5, 2014),
    ('Cavalier Bikes', 24, 'Vintage Wayfarer', 'Hybrid', 24, 2003),
    ('Rosewood Bicycles', 24, 'Eldorado', 'City', 20, 1994),
    ('Pathway Cycles', 21, 'Cruise Classic', 'City', 20, 2024),
    ('TerraForce', 24, 'Heritage', 'City', 16, 2023),
    ('Nimbus Cycles', 7, 'Apollo Retro', 'Hybrid', 29, 2014),
    ('GreenVolt', 1, 'Vintage Cadence', 'Hybrid', 16, 1999),
    ('CityStride', 14, 'Old Town', 'Road', 20, 1981),
    ('AeroCycle', 1, 'Rosewood', 'BMX', 26, 1996),
    ('Urbane Wheels', 7, 'Eclipse Deluxe', 'Hybrid', 24, 2007),
    ('Pathway Cycles', 1, 'Timeless', 'Road', 20, 2020),
    ('Stratospeed', 14, 'EnduroQuest', 'BMX', 29, 2012),
    ('VeloGenix', 21, 'CrossWay', 'Hybrid', 26, 2023),
    ('EcoRide', 3, 'Pathfinder', 'Road', 24, 2018),
    ('Odyssey Rides', 24, 'RoadVoyage', 'BMX', 16, 1980),
    ('Energize Bikes', 27, 'TrekVenture', 'BMX', 16, 2011),
    ('Oldtown Rides', 1, 'Trail Scout', 'BMX', 16, 2021),
    ('EcoBoost', 14, 'Odyssey', 'Road', 29, 2011),
    ('EnduroX', 21, 'Farline', 'Mountain', 12, 2005),
    ('Zenith Bikes', 21, 'Freedom 500', 'Road', 16, 2021),
    ('Stratospeed', 27, 'Escape Pro', 'BMX', 16, 1985);

    INSERT INTO cars (colour, engine_size, horsepower, make, model, seats, top_speed, year) VALUES
    ('SteelBlue', 4.8, 214, 'Astoria Automotive', 'EcoNova', 5, 253.6, 2020),
    ('HotPink', 1.3, 351, 'Falcon Exotics', 'ZenDrive', 8, 273.4, 1961),
    ('Azure', 2.5, 148, 'Eon Energy Cars', 'Voltura', 5, 204.2, 2019),
    ('Magenta', 3.7, 399, 'PureVolt', 'HydraVolt', 8, 316.6, 2013),
    ('MediumPurple', 5.3, 313, 'HydraWorks', 'Celera', 7, 298.2, 2010),
    ('Navy', 2.0, 645, 'Summit Vehicles', 'Eon Electric', 5, 398.0, 1979),
    ('DarkGoldenRod', 3.6, 214, 'Pulse', 'EcoSphere', 4, 241.6, 1971),
    ('Cyan', 2.7, 369, 'Zenith Automotive', 'Verde', 8, 294.6, 1971),
    ('Sienna', 1.3, 220, 'NovaAuto', 'VivaCharge', 2, 221.0, 1978),
    ('Gold', 3.4, 147, 'Nostalgic Motors', 'Ionica', 7, 212.8, 2002),
    ('LightGray', 4.9, 505, 'Exodus Cars', 'Urbania', 5, 371.0, 1953),
    ('Lime', 2.7, 187, 'LuxeDrive', 'MetroLink', 4, 221.8, 1959),
    ('GhostWhite', 4.5, 601, 'Eon Energy Cars', 'Nimble', 2, 405.4, 1989),
    ('Plum', 1.9, 610, 'Voltura Automotive', 'Pulse One', 8, 383.0, 1967),
    ('MediumTurquoise', 1.3, 484, 'Regalia Automobiles', 'Swift', 8, 326.6, 1956),
    ('SlateGray', 4.1, 138, 'Celera', 'Viva Mini', 4, 216.2, 1987),
    ('YellowGreen', 5.4, 250, 'GreenForce Motors', 'CityZ', 7, 274.0, 1951),
    ('MediumVioletRed', 2.6, 145, 'EvoDrive', 'Spry', 2, 204.0, 2010),
    ('Teal', 1.2, 702, 'Aurora Motors', 'Pop', 4, 412.8, 1956),
    ('SlateGray', 3.3, 561, 'Aurora Motors', 'Quickster', 4, 377.4, 1959),
    ('PaleGoldenRod', 4.3, 538, 'Aurora Motors', 'Aether X1', 7, 378.2, 1980),
    ('DarkGreen', 1.9, 267, 'Eon Energy Cars', 'Vortex Pro', 5, 245.8, 1952),
    ('LightGoldenRodYellow', 5.8, 694, 'HydraWorks', 'NovaVolt', 4, 455.6, 1965),
    ('ForestGreen', 3.1, 324, 'Exodus Cars', 'Eclipse LX', 7, 280.6, 1993),
    ('GoldenRod', 3.5, 288, 'Nostalgic Motors', 'Stratos Prime', 5, 270.2, 2014),
    ('Indigo', 2.6, 313, 'Crestline', 'Falcon X-7', 2, 271.2, 2023),
    ('DarkGray', 1.0, 621, 'Phoenix Motorsports', 'Celesta One', 7, 378.4, 1969),
    ('Lavender', 3.1, 190, 'Trailblaze Automotive', 'Radiant Edge', 4, 227.0, 2024),
    ('Gold', 1.3, 252, 'Crownline Classics', 'Nebula S5', 7, 233.8, 2002),
    ('Yellow', 1.1, 519, 'TerraCruz', 'Spectra Ultra', 8, 338.6, 1974),
    ('White', 3.2, 127, 'Veloce Dynamics', 'Velocity GT', 7, 202.8, 2017),
    ('LightSlateGray', 4.5, 411, 'NovaAuto', 'ThunderStrike', 4, 329.4, 1967),
    ('LightYellow', 1.5, 622, 'Astoria Automotive', 'Tempest R', 8, 383.8, 1975),
    ('MediumAquaMarine', 2.7, 223, 'Celeste Automotive', 'Phoenix XR', 5, 236.2, 1965),
    ('Sienna', 3.1, 501, 'Swiftline Motors', 'Ignition Z', 2, 351.4, 2012),
    ('CadetBlue', 4.6, 117, 'Pulse', 'TurboBlade', 8, 212.8, 1977),
    ('MediumSlateBlue', 4.7, 698, 'EvoDrive', 'Raptor 500', 7, 446.2, 1973),
    ('DarkGray', 5.3, 506, 'Hyperion Speedworks', 'Flashfire', 2, 375.4, 2013),
    ('PowderBlue', 1.8, 533, 'Cavalier Cars', 'Cyclone SX', 4, 351.2, 2002),
    ('Peru', 4.2, 665, 'RidgeLine Motors', 'EvoRacer', 5, 428.0, 2022);

    INSERT INTO spaceships (manufacturer, max_crew, model, top_speed, year) VALUES
    ('Titan Galactic', 400, 'Star Wanderer', 0.7098, 2021),
    ('Pulsar Ventures', 50, 'Celestial Voyager', 0.20821, 2004),
    ('Stellar Elegance', 100, 'Galactic Horizon', 0.76554, 2004),
    ('Hyperion Aerospace', 400, 'Nova Pursuer', 0.22462, 2023),
    ('Lunar Horizon Works', 50, 'Solar Flare', 0.2325, 2007),
    ('AeonDrive Industries', 50, 'Stardust Seeker', 0.11487, 2013),
    ('Vanguard Forge', 1, 'Nebula Rider', 0.58419, 2002),
    ('AstroTech Systems', 2, 'Celestial Dawn', 0.56278, 2018),
    ('AetherForge', 400, 'Galaxion', 0.7879, 2022),
    ('Defender Dynamics', 8000, 'Infinity''s Edge', 0.83108, 2008),
    ('StellarCraft Labs', 100, 'Quantum Whisper', 0.6177, 2005),
    ('Seraphim Galactic', 100, 'Nebula Nexus', 0.37434, 2014),
    ('NebulaWorks', 8000, 'Omega Strider', 0.3241, 2013),
    ('Eclipse & Co.', 8000, 'Chrono Ascendant', 0.56656, 2003),
    ('HyperNova Dynamics', 100, 'Infinity Pulse', 0.21229, 2011),
    ('Starlight Systems', 100, 'Spectral Enigma', 0.95166, 2007),
    ('StarGuard Heavy Industries', 2, 'Eon Drive', 0.00894, 2022),
    ('Galactix Industries', 400, 'Zyron', 0.40532, 2011),
    ('Dreamcatcher Systems', 1, 'Photon Voyager', 0.3214, 2008),
    ('Cosmos Whisper Labs', 10, 'Nova Protocol', 0.63525, 2003),
    ('AstralCraft Collective', 8000, 'Astral Vortex', 0.01225, 2019),
    ('Vanguard Forge', 10, 'Orion''s Blade', 0.01637, 2019),
    ('NebulaWorks', 50, 'Starbreaker', 0.46729, 2020),
    ('AetherForge', 50, 'Eclipse Raider', 0.30835, 2008),
    ('Nimbus Technologies', 2, 'Luminous Falcon', 0.21409, 2009),
    ('Defender Dynamics', 1, 'Celestial Avenger', 0.88768, 2004),
    ('Sentinel Spaceworks', 400, 'Solar Mirage', 0.56433, 2000),
    ('PrimeStar Works', 1, 'Void Saber', 0.15363, 2009),
    ('NovaForge', 2, 'Dawn''s Crusader', 0.69215, 2018),
    ('Celestial Innovations', 10, 'Cosmic Hunter', 0.85943, 2019),
    ('NovaForge', 100, 'Aether Drift', 0.53658, 2003),
    ('Voidcraft Enterprises', 10, 'Starlit Phantom', 0.12481, 2015),
    ('Onyx Defense Industries', 10, 'Celestial Mirage', 0.96706, 2020),
    ('Stellar Elegance', 10, 'Cosmos Dreamer', 0.47485, 2014),
    ('Dreamcatcher Systems', 10, 'Silent Comet', 0.95572, 2006),
    ('Radiant Edge', 10, 'Eclipse Shadow', 0.8177, 2016),
    ('Dreamcatcher Systems', 50, 'Eventide Nomad', 0.91707, 2014),
    ('Celestial Path Foundry', 8000, 'Nebula Wraith', 0.41758, 2007),
    ('Dreamcatcher Systems', 10, 'Specter Horizon', 0.39286, 2010),
    ('Quantum Dynamics', 8000, 'Luna''s Echo', 0.26686, 2012);

  COMMIT;
EOSQL