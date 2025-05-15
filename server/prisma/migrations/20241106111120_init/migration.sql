-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('LOCAL', 'OAUTH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "avatar" TEXT,
    "resume" TEXT,
    "skills" JSONB,
    "authProvider" "AuthProvider" NOT NULL DEFAULT 'LOCAL',
    "oAuthId" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetExpiry" TIMESTAMP(3),
    "emailVerificationToken" TEXT,
    "emailVerificationExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserSavedJobs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_oAuthId_key" ON "User"("oAuthId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserSavedJobs_AB_unique" ON "_UserSavedJobs"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSavedJobs_B_index" ON "_UserSavedJobs"("B");

-- AddForeignKey
ALTER TABLE "_UserSavedJobs" ADD CONSTRAINT "_UserSavedJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSavedJobs" ADD CONSTRAINT "_UserSavedJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
