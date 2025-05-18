/*
  Warnings:

  - The values [pending,accepted,rejected] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `companyId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('USER', 'COMPANY');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
ALTER TABLE "JobApplication" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "JobApplication" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "JobApplication" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropIndex
DROP INDEX "Notification_companyId_idx";

-- DropIndex
DROP INDEX "Notification_companyId_key";

-- DropIndex
DROP INDEX "Notification_userId_idx";

-- DropIndex
DROP INDEX "Notification_userId_key";

-- AlterTable
ALTER TABLE "JobApplication" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "companyId",
DROP COLUMN "userId",
ADD COLUMN     "fromId" TEXT,
ADD COLUMN     "fromType" "EntityType",
ADD COLUMN     "toId" TEXT,
ADD COLUMN     "toType" "EntityType";

-- CreateIndex
CREATE INDEX "Notification_fromId_fromType_idx" ON "Notification"("fromId", "fromType");

-- CreateIndex
CREATE INDEX "Notification_toId_toType_idx" ON "Notification"("toId", "toType");
