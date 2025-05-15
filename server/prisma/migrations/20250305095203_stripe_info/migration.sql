-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'standard', 'premium');

-- CreateEnum
CREATE TYPE "SubStatus" AS ENUM ('inactive', 'active', 'cancelled');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "subscriptionPlan" "Plan" NOT NULL DEFAULT 'free',
ADD COLUMN     "subscriptionStatus" "SubStatus" NOT NULL DEFAULT 'inactive';
