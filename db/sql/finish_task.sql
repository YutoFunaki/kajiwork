-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql
-- 生成日時: 2023 年 9 月 12 日 17:42
-- サーバのバージョン： 5.7.43
-- PHP のバージョン: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- データベース: `kajiwork`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `finish_tasks`
--

CREATE TABLE `finish_tasks` (
  `id` int(11) NOT NULL,
  `tasks_id` int(11) NOT NULL,
  `tasks_name` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `user_id` int(11) NOT NULL,
  `finish_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `finish_tasks`
--
ALTER TABLE `finish_tasks`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `finish_tasks`
--
ALTER TABLE `finish_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
