-- CreateTable
CREATE TABLE "Movie" (
    "name" TEXT NOT NULL,
    "releasedAt" TIMESTAMP(3) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "_id" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "movieId" TEXT NOT NULL,
    "_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "reviewer" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
