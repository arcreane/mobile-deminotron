-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Objets`;
CREATE TABLE `Objets` (
  `id_obj` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) NOT NULL,
  `prix` int(11) NOT NULL,
  PRIMARY KEY (`id_obj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Utilisateur`;
CREATE TABLE `Utilisateur` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `pseudo` varchar(150) NOT NULL,
  PRIMARY KEY (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Utilisateur_Objets`;
CREATE TABLE `Utilisateur_Objets` (
  `id_utilisateur` int(11) NOT NULL,
  `id_objets` int(11) NOT NULL,
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_objets` (`id_objets`),
  CONSTRAINT `Utilisateur_Objets_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  CONSTRAINT `Utilisateur_Objets_ibfk_2` FOREIGN KEY (`id_objets`) REFERENCES `Objets` (`id_obj`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Utilisateur_statistique`;
CREATE TABLE `Utilisateur_statistique` (
  `id_utilisateur` int(11) NOT NULL,
  `nb_parties` int(11) NOT NULL,
  `nb_victoires` int(11) NOT NULL,
  `nb_serie_victoires_max` int(11) NOT NULL,
  `temps_moyen_niveau` int(11) NOT NULL,
  KEY `id_utilisateur` (`id_utilisateur`),
  CONSTRAINT `Utilisateur_statistique_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur` (`id_utilisateur`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2021-10-28 11:06:17