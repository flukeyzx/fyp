/*
  Warnings:

  - The values [free,standard,premium] on the enum `Plan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Plan_new" AS ENUM ('FREE', 'STANDARD');
ALTER TABLE "Company" ALTER COLUMN "subscriptionPlan" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "subscriptionPlan" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "subscriptionPlan" TYPE "Plan_new" USING ("subscriptionPlan"::text::"Plan_new");
ALTER TABLE "Company" ALTER COLUMN "subscriptionPlan" TYPE "Plan_new" USING ("subscriptionPlan"::text::"Plan_new");
ALTER TYPE "Plan" RENAME TO "Plan_old";
ALTER TYPE "Plan_new" RENAME TO "Plan";
DROP TYPE "Plan_old";
ALTER TABLE "Company" ALTER COLUMN "subscriptionPlan" SET DEFAULT 'FREE';
ALTER TABLE "User" ALTER COLUMN "subscriptionPlan" SET DEFAULT 'FREE';
COMMIT;

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "subscriptionPlan" SET DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionPlan" SET DEFAULT 'FREE';
