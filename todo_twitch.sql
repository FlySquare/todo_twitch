-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 29, 2020 at 01:08 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo_twitch`
--

-- --------------------------------------------------------

--
-- Table structure for table `todo_streamer`
--

CREATE TABLE `todo_streamer` (
  `streamer_id` int(11) NOT NULL,
  `streamer_username` varchar(250) NOT NULL,
  `streamer_pass` varchar(250) NOT NULL,
  `streamer_ip` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `todo_todo`
--

CREATE TABLE `todo_todo` (
  `todo_id` int(11) NOT NULL,
  `todo_sahip` varchar(250) NOT NULL,
  `todo_icerik` varchar(250) NOT NULL,
  `todo_tarih` timestamp NOT NULL DEFAULT current_timestamp(),
  `todo_durum` int(23) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todo_todo`
--

INSERT INTO `todo_todo` (`todo_id`, `todo_sahip`, `todo_icerik`, `todo_tarih`, `todo_durum`) VALUES
(1, 'flysquare', 'kel aç\r\n', '2020-05-27 00:32:06', 3),
(2, 'evrentr', 'naber abi\r\n', '2020-05-27 00:36:53', 0),
(3, 'flysquaree', ' kanasusamış alana kadar para harcama', '2020-05-27 01:21:03', 0),
(4, 'flysquaree', ' as', '2020-05-27 01:32:11', 3),
(5, 'flysquaree', ' yap', '2020-05-27 01:33:37', 3),
(6, 'flysquaree', ' ekle', '2020-05-27 01:33:46', 3),
(7, 'flysquaree', ' umut', '2020-05-27 01:38:38', 3),
(8, 'flysquaree', ' umt', '2020-05-27 01:38:45', 3),
(9, 'flysquaree', ' a', '2020-05-28 00:39:43', 3),
(10, 'flysquaree', ' b', '2020-05-28 00:39:45', 3),
(11, 'flysquaree', ' c', '2020-05-28 00:39:47', 3),
(12, 'flysquaree', ' umut', '2020-05-28 00:47:56', 0),
(13, 'flysquaree', ' acumk', '2020-05-28 00:48:01', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todo_streamer`
--
ALTER TABLE `todo_streamer`
  ADD PRIMARY KEY (`streamer_id`);

--
-- Indexes for table `todo_todo`
--
ALTER TABLE `todo_todo`
  ADD PRIMARY KEY (`todo_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todo_streamer`
--
ALTER TABLE `todo_streamer`
  MODIFY `streamer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `todo_todo`
--
ALTER TABLE `todo_todo`
  MODIFY `todo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
