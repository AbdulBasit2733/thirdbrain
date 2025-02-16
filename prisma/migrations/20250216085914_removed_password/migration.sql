/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "provider" "Provider" NOT NULL;
