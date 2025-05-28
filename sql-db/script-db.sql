DROP DATABASE IF EXISTS fs_project;
CREATE DATABASE fs_project;

USE fs_project;

-- Table des types d'utilisateurs
CREATE TABLE user_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE
);

-- Table des utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    user_type_id INT NOT NULL,
    FOREIGN KEY (user_type_id) REFERENCES user_type(id)
);

-- Types d'utilisateurs
INSERT INTO user_type (type_name) VALUES ('Admin'), ('Commercial');

-- Utilisateurs
INSERT INTO users (first_name, last_name, email, user_type_id) VALUES
('Alice', 'Dupont', "adupont@hn-services.fr", 1),
('Bob', 'Martin', "bmartin@hn-services.fr", 2);
