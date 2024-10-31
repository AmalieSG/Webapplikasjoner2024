/*
  Warnings:

  - You are about to drop the `Feed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeedFollow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeedTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FeedToFeedTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Feed_url_key";

-- DropIndex
DROP INDEX "FeedTag_name_key";

-- DropIndex
DROP INDEX "_FeedToFeedTag_B_index";

-- DropIndex
DROP INDEX "_FeedToFeedTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Feed";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FeedFollow";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FeedTag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FeedToFeedTag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "publishedAt" DATETIME NOT NULL,
    "statusId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    CONSTRAINT "Project_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ProjectStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProjectCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Unnamed',
    "role" TEXT NOT NULL DEFAULT 'user'
);
INSERT INTO "new_User" ("email", "id") SELECT "email", "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectStatus_name_key" ON "ProjectStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectCategories_AB_unique" ON "_ProjectCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectCategories_B_index" ON "_ProjectCategories"("B");
