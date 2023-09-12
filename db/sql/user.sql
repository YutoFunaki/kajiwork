-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql
-- 生成日時: 2023 年 9 月 12 日 17:36
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
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT 'usersの主キー',
  `username` varchar(16) CHARACTER SET utf8mb4 NOT NULL COMMENT 'ユーザー名',
  `password` varchar(64) NOT NULL COMMENT 'パスワード',
  `email` varchar(32) NOT NULL COMMENT 'メールアドレス',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'usersの主キー', AUTO_INCREMENT=227;
COMMIT;
