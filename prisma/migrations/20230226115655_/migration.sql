-- CreateTable
CREATE TABLE "Property" (
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastVisited" TIMESTAMP(3),
    "rawHtml" TEXT NOT NULL,
    "address" TEXT,
    "price" TEXT,
    "plotSize" TEXT,
    "areaSize" TEXT,
    "rooms" TEXT,
    "floor" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("url")
);
