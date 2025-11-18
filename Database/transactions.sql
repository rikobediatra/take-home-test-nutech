
CREATE TABLE `transactions` (
  `idTransaction` int NOT NULL AUTO_INCREMENT COMMENT 'Primary key transaksi',
  `idBalance` int NOT NULL COMMENT 'Foreign key mengacu ke table membership_balance',
  `invoice_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nomor invoice unik',
  `service_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'mengacu ke table services',
  `transaction_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Jenis transaksi',
  `total_amount` bigint NOT NULL COMMENT 'Total nominal transaksi',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu transaksi dibuat',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu update transaksi',
  PRIMARY KEY (`idTransaction`),
  UNIQUE KEY `invoice_number` (`invoice_number`),
  KEY `fk_balance` (`idBalance`),
  CONSTRAINT `fk_balance` FOREIGN KEY (`idBalance`) REFERENCES `membership_balance` (`idBalance`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabel transaksi member';