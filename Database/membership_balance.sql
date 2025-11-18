
CREATE TABLE `membership_balance` (
  `idBalance` int NOT NULL AUTO_INCREMENT COMMENT 'Primary key untuk saldo member',
  `idMembership` int NOT NULL COMMENT 'Foreign key mengacu ke table membership',
  `balance` bigint NOT NULL DEFAULT '0' COMMENT 'Saldo member',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu data dibuat',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Tanggal dan waktu data diupdate',
  PRIMARY KEY (`idBalance`),
  KEY `fk_membership` (`idMembership`),
  CONSTRAINT `fk_membership` FOREIGN KEY (`idMembership`) REFERENCES `membership` (`idMembership`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabel saldo member';