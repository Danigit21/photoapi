CREATE DATABASE photoapi;
USE photoapi;

-- --------------------------------------------------------


DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
(1, 'Newest Album', 1),
(2, 'Old Album', 1),
(3, 'Oldest Album', 2);


-- --------------------------------------------------------


DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `comment` VARCHAR(255) DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
   PRIMARY KEY (`id`),
   KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10  DEFAULT CHARSET=utf8mb4;


INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(1, 'Confetti Photo #1', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'Confetti1', 1),
(2, 'Confetti Photo #2', 'https://images.unsplash.com/photo-1481162854517-d9e353af153d', 'Confetti2', 1),
(3, 'Confetti Photo #3', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', 'Confetti3', 1),
(4, 'Confetti Photo #4', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', 'Confetti3', 2),
(5, 'Confetti Photo #5', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', 'Confetti3', 2);


-- --------------------------------------------------------


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(1, 'johan@hej.com', 'asdf', 'Johan', 'Nordström'),
(2, 'sean_banan@da.com', 'chiquita', 'Sean', 'Banan'),
(3, 'photo@api.com', 'photoapi', 'Photo', 'Api');


-- --------------------------------------------------------


DROP TABLE IF EXISTS `albums_photos`;
CREATE TABLE `albums_photos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `album_id` INT(11) NOT NULL,
  `photo_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  KEY `photo_id` (`photo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


INSERT INTO `albums_photos` (`id`, `album_id`, `photo_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 3, 3);



ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
  
  
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
  
  
ALTER TABLE `albums_photos`
  ADD CONSTRAINT `album_photos_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`),
  ADD CONSTRAINT `album_photos_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`);