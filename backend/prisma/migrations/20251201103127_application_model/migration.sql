-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateTable
CREATE TABLE "PermitApplication" (
    "id" TEXT NOT NULL,
    "applicant_name" TEXT NOT NULL,
    "applicant_email" TEXT NOT NULL,
    "permit_type" TEXT NOT NULL,
    "application_status" "ApplicationStatus" NOT NULL DEFAULT 'Pending',
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "PermitApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PermitApplication" ADD CONSTRAINT "PermitApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
