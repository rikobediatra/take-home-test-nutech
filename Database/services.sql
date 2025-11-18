
CREATE TABLE `services` (
  `idService` int NOT NULL AUTO_INCREMENT COMMENT 'Primary key untuk service',
  `service_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Kode unik service',
  `service_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nama layanan/service',
  `service_icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'URL icon service',
  `service_tariff` int NOT NULL COMMENT 'Tarif layanan',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu data dibuat',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu data diupdate',
  PRIMARY KEY (`idService`),
  UNIQUE KEY `service_code` (`service_code`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabel untuk menyimpan data layanan/service';