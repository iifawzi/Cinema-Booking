CREATE TABLE `admins` (
  `admin_id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `first_name` boolean,
  `last_name` date,
  `role` ENUM ('admin', 'superadmin')
);

CREATE TABLE `countries` (
  `country_id` int PRIMARY KEY AUTO_INCREMENT,
  `country_ar` varchar(255),
  `country_en` varchar(255)
);

CREATE TABLE `areas` (
  `area_id` int PRIMARY KEY AUTO_INCREMENT,
  `country_id` int,
  `area_ar` varchar(255),
  `area_en` varchar(255)
);

CREATE TABLE `cinemas` (
  `cinema_id` int PRIMARY KEY AUTO_INCREMENT,
  `cinema_ar` varchar(255),
  `cinema_en` varchar(255),
  `cinema_logo` varchar(255),
  `cinema_description` varchar(255),
  `contact_number` varchar(255),
  `area_id` int,
  `latitude` decimal,
  `longitude` decimal,
  `cinema_status` boolean,
  `last_checkout` date
);

CREATE TABLE `cinema_accounts` (
  `cinemaAccount_id` int PRIMARY KEY AUTO_INCREMENT,
  `cinema_id` int,
  `usernamne` varchar(255),
  `name_ar` varchar(255),
  `name_en` varchar(255),
  `phone_number` varchar(255),
  `password` varchar(255),
  `refresh_token` varchar(255),
  `role` ENUM ('csuperadmin', 'cadmin', 'cmoderator')
);

CREATE TABLE `halls` (
  `hall_id` int PRIMARY KEY AUTO_INCREMENT,
  `hall_name` varchar(255),
  `hall_description` varchar(255),
  `cinema_id` int,
  `rows_number` int,
  `columns_number` int,
  `hall_status` boolean
);

CREATE TABLE `corridors` (
  `corridor_id` int PRIMARY KEY AUTO_INCREMENT,
  `hall_id` int,
  `direction` ENUM ('row', 'column'),
  `corridor_number` int
);

CREATE TABLE `lockedSeats` (
  `lockedSeat_id` int PRIMARY KEY AUTO_INCREMENT,
  `slot_id` int,
  `hall_id` int,
  `row` int,
  `column` int
);

CREATE TABLE `slots` (
  `slot_id` int PRIMARY KEY AUTO_INCREMENT,
  `movie_id` int,
  `hall_id` int,
  `ticket_price` int,
  `start_time` date,
  `end_time` date,
  `slot_status` boolean
);

CREATE TABLE `movies` (
  `movie_id` int PRIMARY KEY AUTO_INCREMENT,
  `movie_name` varchar(255),
  `duration` varchar(255),
  `cover` varchar(255),
  `category` varchar(255),
  `description` varchar(255),
  `rate` decimal
);

CREATE TABLE `tickets` (
  `ticket_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `slot_id` int,
  `row` int,
  `column` int,
  `reservation_date` date
);

CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `phone_number` int,
  `first_name` int,
  `last_name` int,
  `area_id` date,
  `latitude` decimal,
  `longitude` decimal,
  `wallet` integer,
  `firebase_token` varchar(255),
  `refresh_token` varchar(255),
  `blocked` boolean
);

ALTER TABLE `areas` ADD FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`);

ALTER TABLE `cinemas` ADD FOREIGN KEY (`area_id`) REFERENCES `areas` (`country_id`);

ALTER TABLE `cinema_accounts` ADD FOREIGN KEY (`cinema_id`) REFERENCES `cinemas` (`cinema_id`);

ALTER TABLE `corridors` ADD FOREIGN KEY (`hall_id`) REFERENCES `halls` (`hall_id`);

ALTER TABLE `halls` ADD FOREIGN KEY (`cinema_id`) REFERENCES `cinemas` (`cinema_id`);

ALTER TABLE `lockedSeats` ADD FOREIGN KEY (`hall_id`) REFERENCES `halls` (`hall_id`);

ALTER TABLE `lockedSeats` ADD FOREIGN KEY (`slot_id`) REFERENCES `slots` (`slot_id`);

ALTER TABLE `slots` ADD FOREIGN KEY (`hall_id`) REFERENCES `halls` (`hall_id`);

ALTER TABLE `slots` ADD FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`slot_id`) REFERENCES `slots` (`slot_id`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`area_id`) REFERENCES `areas` (`area_id`);
