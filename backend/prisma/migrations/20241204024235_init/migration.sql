-- CreateTable
CREATE TABLE "bikes" (
    "grears" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "wheel_size" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "bikes_pkey" PRIMARY KEY ("model")
);

-- CreateTable
CREATE TABLE "cars" (
    "colour" TEXT NOT NULL,
    "engine_size" DOUBLE PRECISION NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "top_speed" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("model")
);

-- CreateTable
CREATE TABLE "spaceships" (
    "manufacturer" TEXT NOT NULL,
    "max_crew" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "top_speed" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "spaceships_pkey" PRIMARY KEY ("model")
);
