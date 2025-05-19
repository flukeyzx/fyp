/*
  Warnings:

  - You are about to drop the column `isRegistered` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "isRegistered",
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "subscriptionPlan" "Plan" NOT NULL DEFAULT 'free';
