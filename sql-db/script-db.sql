DROP DATABASE IF EXISTS fs_project;
CREATE DATABASE fs_project;

USE fs_project;

-- Table des types d'utilisateurs
CREATE TABLE user_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE
);

-- Table des utilisateurs
CREATE TABLE app_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_type_id INT NOT NULL,
    FOREIGN KEY (user_type_id) REFERENCES user_type(id)
);

-- Types d'utilisateurs
INSERT INTO user_type (type_name) VALUES ('Admin'), ('Commercial');

-- Utilisateurs
INSERT INTO app_user (first_name, last_name, user_type_id) VALUES
('Alice', 'Dupont', 1),
('Bob', 'Martin', 2);
