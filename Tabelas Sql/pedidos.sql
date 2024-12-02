CREATE TABLE `pedidos` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`cliente_id` INT(11) NULL DEFAULT NULL,
	`total` DECIMAL(10,2) NULL DEFAULT NULL,
	`data` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `cliente_id` (`cliente_id`) USING BTREE,
	CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=18
;
