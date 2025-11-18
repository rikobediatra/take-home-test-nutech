CREATE TABLE `membership` (
  `idMembership` int NOT NULL AUTO_INCREMENT COMMENT 'Primary key untuk membership',
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Email membership',
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nama depan membership',
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nama belakang membership',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Hash password',
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'URL path membership',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT 'Status member: 1 = aktif, 0 = non-aktif',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu data dibuat',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu data terakhir diupdate',
  PRIMARY KEY (`idMembership`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabel untuk menyimpan data membership';