/*
  Warnings:

  - You are about to drop the `Honorario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParcelaHonorario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `parcelas` to the `Processo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Honorario" DROP CONSTRAINT "Honorario_processoId_fkey";

-- DropForeignKey
ALTER TABLE "ParcelaHonorario" DROP CONSTRAINT "ParcelaHonorario_honorarioId_fkey";

-- AlterTable
ALTER TABLE "Processo" ADD COLUMN     "parcelas" INTEGER NOT NULL,
ALTER COLUMN "dataInicio" DROP NOT NULL;

-- DropTable
DROP TABLE "Honorario";

-- DropTable
DROP TABLE "ParcelaHonorario";

-- CreateTable
CREATE TABLE "Parcelas" (
    "id" TEXT NOT NULL,
    "processoId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "dataPagamento" TIMESTAMP(3),

    CONSTRAINT "Parcelas_pkey" PRIMARY KEY ("id")
);
