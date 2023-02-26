/*
  Warnings:

  - You are about to drop the column `description` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `html` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Property` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rawHtml` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastVisited" DATETIME,
    "rawHtml" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT,
    "plotSize" TEXT,
    "areaSize" TEXT,
    "rooms" TEXT,
    "floor" TEXT
);
INSERT INTO "new_Property" ("createdAt", "id", "title", "url") SELECT "createdAt", "id", "title", "url" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");
