-- run this script to create required tables

CREATE TABLE Roles (
    id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(500) DEFAULT '',
    timestamp DATETIME2 DEFAULT SYSUTCDATETIME()
);

CREATE TABLE Users (
    id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    fullName VARCHAR(255) DEFAULT '',
    avatarUrl VARCHAR(500) DEFAULT 'https://i.sstatic.net/l60Hf.png',
    status TINYINT DEFAULT 0, -- 0=false,1=true,2=deleted
    role UNIQUEIDENTIFIER NULL REFERENCES Roles(id),
    loginCount INT DEFAULT 0 CHECK (loginCount >= 0),
    timestamp DATETIME2 DEFAULT SYSUTCDATETIME()
);
