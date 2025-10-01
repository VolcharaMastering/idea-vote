-- CreateTable
CREATE TABLE "public"."Idea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idea" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IpAddress" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "votesCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "IpAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vote" (
    "id" TEXT NOT NULL,
    "ipAddressId" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Idea_idea_key" ON "public"."Idea"("idea");

-- CreateIndex
CREATE UNIQUE INDEX "IpAddress_ip_key" ON "public"."IpAddress"("ip");

-- CreateIndex
CREATE INDEX "Vote_ideaId_idx" ON "public"."Vote"("ideaId");

-- CreateIndex
CREATE INDEX "Vote_ipAddressId_idx" ON "public"."Vote"("ipAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_ipAddressId_ideaId_key" ON "public"."Vote"("ipAddressId", "ideaId");

-- AddForeignKey
ALTER TABLE "public"."Vote" ADD CONSTRAINT "Vote_ipAddressId_fkey" FOREIGN KEY ("ipAddressId") REFERENCES "public"."IpAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vote" ADD CONSTRAINT "Vote_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "public"."Idea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
