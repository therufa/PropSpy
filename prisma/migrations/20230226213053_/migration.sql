/*
  Warnings:

  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[url]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Property` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "QueueState" AS ENUM ('pending', 'processing', 'done', 'error');

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "rawHtml" DROP NOT NULL,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Queue" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "state" "QueueState" NOT NULL DEFAULT 'pending',
    "payload" JSON NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_url_key" ON "Property"("url");
