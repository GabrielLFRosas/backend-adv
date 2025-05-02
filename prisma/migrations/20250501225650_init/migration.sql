-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADVOGADO', 'ADMIN');

-- CreateEnum
CREATE TYPE "PermissaoUsuario" AS ENUM ('ADMIN', 'MEMBRO');

-- CreateEnum
CREATE TYPE "StatusProcesso" AS ENUM ('EM_ANDAMENTO', 'ENCERRADO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escritorio" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,

    CONSTRAINT "Escritorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioEscritorio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "escritorioId" TEXT NOT NULL,
    "permissao" "PermissaoUsuario" NOT NULL,

    CONSTRAINT "UsuarioEscritorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoProcesso" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "TipoProcesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Processo" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "tipoId" TEXT NOT NULL,
    "escritorioId" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valorCausa" DOUBLE PRECISION NOT NULL,
    "status" "StatusProcesso" NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataEncerramento" TIMESTAMP(3),

    CONSTRAINT "Processo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvogadoProcesso" (
    "id" TEXT NOT NULL,
    "processoId" TEXT NOT NULL,
    "advogadoId" TEXT NOT NULL,
    "percentualParticipacao" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AdvogadoProcesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Honorario" (
    "id" TEXT NOT NULL,
    "processoId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataPrevistaRecebimento" TIMESTAMP(3) NOT NULL,
    "dataRecebido" TIMESTAMP(3),
    "recebido" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Honorario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParcelaHonorario" (
    "id" TEXT NOT NULL,
    "honorarioId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "dataPagamento" TIMESTAMP(3),

    CONSTRAINT "ParcelaHonorario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Escritorio_cnpj_key" ON "Escritorio"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioEscritorio_userId_escritorioId_key" ON "UsuarioEscritorio"("userId", "escritorioId");

-- CreateIndex
CREATE UNIQUE INDEX "TipoProcesso_nome_key" ON "TipoProcesso"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Processo_numero_key" ON "Processo"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "AdvogadoProcesso_processoId_advogadoId_key" ON "AdvogadoProcesso"("processoId", "advogadoId");

-- AddForeignKey
ALTER TABLE "UsuarioEscritorio" ADD CONSTRAINT "UsuarioEscritorio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioEscritorio" ADD CONSTRAINT "UsuarioEscritorio_escritorioId_fkey" FOREIGN KEY ("escritorioId") REFERENCES "Escritorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processo" ADD CONSTRAINT "Processo_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoProcesso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processo" ADD CONSTRAINT "Processo_escritorioId_fkey" FOREIGN KEY ("escritorioId") REFERENCES "Escritorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvogadoProcesso" ADD CONSTRAINT "AdvogadoProcesso_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvogadoProcesso" ADD CONSTRAINT "AdvogadoProcesso_advogadoId_fkey" FOREIGN KEY ("advogadoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Honorario" ADD CONSTRAINT "Honorario_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcelaHonorario" ADD CONSTRAINT "ParcelaHonorario_honorarioId_fkey" FOREIGN KEY ("honorarioId") REFERENCES "Honorario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
