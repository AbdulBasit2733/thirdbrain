/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Share` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Share` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Share" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "hash" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Share_hash_key" ON "Share"("hash");

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
