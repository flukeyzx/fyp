/*
  Warnings:

  - You are about to drop the column `subscriptionStatus` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "jobsPostedThisMonth" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriptionStatus",
ADD COLUMN     "apiCallsThisMonth" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "jobsAppliedThisMonth" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "SubStatus";

-- CreateIndex
CREATE INDEX "User_subscriptionPlan_idx" ON "User"("subscriptionPlan");
