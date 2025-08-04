-- CreateTable
CREATE TABLE "Admin" (
    "id" BIGSERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "emailVerifiedAt" TIMESTAMP(0),
    "password" VARCHAR(255) NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT true,
    "rememberToken" VARCHAR(100),
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nameSlug" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "website" VARCHAR(255),
    "youtube" VARCHAR(255),
    "youtubeMusic" VARCHAR(255),
    "spotify" VARCHAR(255),
    "appleMusic" VARCHAR(255),
    "status" VARCHAR(255) NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cache" (
    "key" VARCHAR(255) NOT NULL,
    "value" TEXT NOT NULL,
    "expiration" INTEGER NOT NULL,

    CONSTRAINT "Cache_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "CacheLock" (
    "key" VARCHAR(255) NOT NULL,
    "owner" VARCHAR(255) NOT NULL,
    "expiration" INTEGER NOT NULL,

    CONSTRAINT "CacheLock_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "ChurchEvent" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "teamId" BIGINT NOT NULL,
    "startDate" TIMESTAMP(0) NOT NULL,
    "endDate" TIMESTAMP(0) NOT NULL,
    "venue" VARCHAR(255),
    "isHomeEvent" BOOLEAN NOT NULL DEFAULT true,
    "coverPhoto" VARCHAR(255),
    "creatorId" BIGINT NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "ChurchEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchTeamMember" (
    "id" BIGSERIAL NOT NULL,
    "teamId" BIGINT NOT NULL,
    "memberId" BIGINT NOT NULL,
    "adminRole" VARCHAR(255),
    "status" VARCHAR(255) NOT NULL DEFAULT 'active',
    "assignmentId" INTEGER NOT NULL,
    "creatorId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "ChurchTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchTeam" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "churchId" BIGINT NOT NULL,
    "coverPhoto" VARCHAR(255),
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "ChurchTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Church" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "profilePicture" VARCHAR(255),
    "uuid" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(255),
    "coverPhoto" VARCHAR(255),
    "facebook" VARCHAR(255),
    "youtube" VARCHAR(255),
    "instagram" VARCHAR(255),
    "website" VARCHAR(255),
    "email" VARCHAR(255),
    "phone" VARCHAR(255),
    "status" VARCHAR(255) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventFile" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "EventFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" BIGSERIAL NOT NULL,
    "filableId" INTEGER NOT NULL,
    "filableType" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "assetableId" INTEGER NOT NULL,
    "assetableType" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedSong" (
    "id" BIGSERIAL NOT NULL,
    "songId" INTEGER NOT NULL,
    "savableId" INTEGER NOT NULL,
    "savableType" VARCHAR(255) NOT NULL,
    "transposedInt" INTEGER,
    "speed" INTEGER,
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "SavedSong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "titleSlug" VARCHAR(255) NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "artistId" BIGINT NOT NULL,
    "album" VARCHAR(255),
    "year" VARCHAR(255),
    "lwcIntro" TEXT,
    "lwc" TEXT NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'draft',
    "creatorId" BIGINT NOT NULL,
    "youtube" VARCHAR(255),
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "views" INTEGER NOT NULL DEFAULT 0,
    "speed" INTEGER,
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "userType" VARCHAR(50) NOT NULL,
    "givenName" VARCHAR(255),
    "familyName" VARCHAR(255),
    "avatar" VARCHAR(255),
    "provider" VARCHAR(255),
    "providerId" VARCHAR(255),
    "username" VARCHAR(255) NOT NULL,
    "rememberToken" VARCHAR(100),
    "createdAt" TIMESTAMP(0),
    "updatedAt" TIMESTAMP(0),
    "emailVerificationToken" VARCHAR(255),
    "bio" VARCHAR(255),
    "latestKey" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adminsEmailUnique" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "church_teams_uuid_unique" ON "ChurchTeam"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "churchesUuidUnique" ON "Church"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "songsUuidUnique" ON "Song"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "usersEmailUnique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usersProviderIdUnique" ON "User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "usersUsernameUnique" ON "User"("username");

-- AddForeignKey
ALTER TABLE "ChurchEvent" ADD CONSTRAINT "churchEventsCreatorIDForeign" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChurchEvent" ADD CONSTRAINT "churchEventsTeamIDForeign" FOREIGN KEY ("teamId") REFERENCES "ChurchTeam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChurchTeamMember" ADD CONSTRAINT "churchTeamMembersCreatorIDForeign" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChurchTeamMember" ADD CONSTRAINT "churchTeamMembersMemberIDForeign" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChurchTeam" ADD CONSTRAINT "churchTeamsChurchIDForeign" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "songsArtistIDForeign" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "songsCreatorIDForeign" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
