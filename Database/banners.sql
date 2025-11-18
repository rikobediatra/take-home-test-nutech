
CREATE TABLE `banners` (
  `idBanner` int NOT NULL AUTO_INCREMENT COMMENT 'Primary key untuk banner',
  `banner_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nama banner',
  `banner_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'URL gambar banner',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT 'Deskripsi banner',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu banner dibuat',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu update banner',
  PRIMARY KEY (`idBanner`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabel take home test banner';