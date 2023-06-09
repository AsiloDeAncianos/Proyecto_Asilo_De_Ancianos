CREATE DATABASE IF NOT EXISTS BDCAAMBU;

USE BDCAAMBU;

CREATE TABLE Benefactor (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NombreCompleto VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Telefono VARCHAR(10) NOT NULL,
    UbicacionDomicilio VARCHAR(100) NOT NULL,
    Anonimo BIT NULL DEFAULT 0
);

CREATE TABLE InstitucionAsilo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    NIT VARCHAR(20) NOT NULL,
    NombreRepresentantePrincipal VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Celular VARCHAR(20) NOT NULL,
    Direccion VARCHAR(200) NOT NULL,
    Localizacion VARCHAR(100) NOT NULL
);++++++++++++++++++++++++++++++++

CREATE TABLE Campania (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Requerimiento VARCHAR(100) NOT NULL,
    Imagenes MEDIUMTEXT NULL,
    FechaInicio DATETIME NOT NULL,
    FechaCierre DATETIME NOT NULL,
    Estado BIT NOT NULL DEFAULT 1,
    InstitucionAsiloID INT NOT NULL,
    FOREIGN KEY (InstitucionAsiloID) REFERENCES InstitucionAsilo(ID)
);

CREATE TABLE Donacion (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CampaniaID INT NOT NULL,
    BenefactorID INT NOT NULL,
    RecogidaPorAsilo BIT NOT NULL DEFAULT 0,
    FechaRecoleccion DATETIME NOT NULL,
    Recibido BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (CampaniaID) REFERENCES Campania(ID),
    FOREIGN KEY (BenefactorID) REFERENCES Benefactor(ID)
);

CREATE TABLE Gestor (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Usuario VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL
);


CREATE TABLE RecojosProgramados (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CampaniaID INT NOT NULL,
    FechaRecoleccion DATETIME NOT NULL,
    Responsable VARCHAR(100) NOT NULL,
    FOREIGN KEY (CampaniaID) REFERENCES Campania(ID)
);
