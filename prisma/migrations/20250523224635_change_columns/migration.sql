/*
  Warnings:

  - You are about to drop the column `percentualParticipacao` on the `AdvogadoProcesso` table. All the data in the column will be lost.
  - You are about to drop the column `dataEncerramento` on the `Processo` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `Processo` table. All the data in the column will be lost.
  - You are about to drop the column `parcelas` on the `Processo` table. All the data in the column will be lost.
  - Added the required column `dataVencimento` to the `Processo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nrParcelas` to the `Processo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentualParticipacao` to the `Processo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdvogadoProcesso" DROP COLUMN "percentualParticipacao";

-- AlterTable
ALTER TABLE "Processo" DROP COLUMN "dataEncerramento",
DROP COLUMN "dataInicio",
DROP COLUMN "parcelas",
ADD COLUMN     "dataVencimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nrParcelas" INTEGER NOT NULL,
ADD COLUMN     "percentualParticipacao" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Parcelas" ADD CONSTRAINT "Parcelas_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
