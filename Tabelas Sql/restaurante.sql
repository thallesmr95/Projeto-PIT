CREATE TABLE `restaurante` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`data` DATE NULL DEFAULT NULL,
	`servico` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`preco` DECIMAL(10,2) NULL DEFAULT NULL,
	`categoria` ENUM('Bebidas','Porcoes','Pratos Principais','Sobremesa') NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`STATUS` ENUM('ativo','realizado','cancelado') NULL DEFAULT 'ativo' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=29
;
