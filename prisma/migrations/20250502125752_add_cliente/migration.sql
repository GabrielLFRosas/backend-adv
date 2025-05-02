/*
  Warnings:

  - You are about to drop the column `cliente` on the `Processo` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `Processo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Processo" DROP COLUMN "cliente",
ADD COLUMN     "clienteId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "escritorioId" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_escritorioId_key" ON "Cliente"("email", "escritorioId");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_escritorioId_fkey" FOREIGN KEY ("escritorioId") REFERENCES "Escritorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processo" ADD CONSTRAINT "Processo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
