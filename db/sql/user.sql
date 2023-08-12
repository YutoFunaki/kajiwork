 CREATE TABLE users (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'usersの主キー', 
  `username` VARCHAR(16) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'ユーザー名',
  `password` VARCHAR(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'パスワード', 
  `email` VARCHAR(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'メールアドレス', 
  `created_at` TIMESTAMP NULL DEFAULT NOW() COMMENT '作成日';
 );
 
INSERT INTO users (`username`, `password`, `email`) VALUES ('admin', 'admin', 'admin@gmail.com');


