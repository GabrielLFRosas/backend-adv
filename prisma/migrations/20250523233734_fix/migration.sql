/*
  Warnings:

  - Changed the type of `dataVencimento` on the `Processo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Processo" DROP COLUMN "dataVencimento",
ADD COLUMN     "dataVencimento" TIMESTAMP(3) NOT NULL;
