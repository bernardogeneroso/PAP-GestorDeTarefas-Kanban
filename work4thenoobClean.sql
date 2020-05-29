-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29-Maio-2020 às 21:01
-- Versão do servidor: 10.4.11-MariaDB
-- versão do PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `work4thenoobclean`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `board`
--

CREATE TABLE `board` (
  `id` int(11) NOT NULL,
  `id_board` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_position` int(11) DEFAULT NULL,
  `nomeboard` varchar(25) DEFAULT NULL,
  `prioridade` varchar(7) DEFAULT NULL,
  `descricao` longtext DEFAULT NULL,
  `dataCriacao` varchar(20) DEFAULT NULL,
  `tempoDespendido` varchar(20) DEFAULT NULL,
  `dataEncerramento` varchar(20) NOT NULL,
  `prazoEntrega` varchar(10) DEFAULT NULL,
  `fatura` varchar(20) DEFAULT NULL,
  `valor_pago` float DEFAULT NULL,
  `falta_pagar` float DEFAULT NULL,
  `preco_total` float DEFAULT NULL,
  `despesas` float DEFAULT NULL,
  `lucro` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `boardcategoria`
--

CREATE TABLE `boardcategoria` (
  `id` int(11) NOT NULL,
  `id_boarduser` int(11) DEFAULT NULL,
  `countBoard` int(11) DEFAULT NULL,
  `nomeCategoria` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `boardgestorsalario`
--

CREATE TABLE `boardgestorsalario` (
  `id` int(11) NOT NULL,
  `id_boarduser` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `tipo_trabalhador_depende` int(11) NOT NULL,
  `tipo_trabalhador` varchar(16) DEFAULT NULL,
  `salario_mensal` float DEFAULT NULL,
  `salario_semanal` float DEFAULT NULL,
  `tempo_trabalho_dias` int(11) DEFAULT NULL,
  `tempo_trabalho_horas` varchar(11) DEFAULT NULL,
  `dias_semanais_trabalho` int(11) DEFAULT NULL,
  `receita_final` float DEFAULT NULL,
  `dataRegisto` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `boardperiodotrabalho`
--

CREATE TABLE `boardperiodotrabalho` (
  `id` int(11) NOT NULL,
  `id_board` int(11) DEFAULT NULL,
  `id_boarduser` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `atribuito` varchar(100) DEFAULT NULL,
  `de` varchar(20) DEFAULT NULL,
  `para` varchar(20) DEFAULT NULL,
  `tempoTotal` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `boardpermissoes`
--

CREATE TABLE `boardpermissoes` (
  `id` int(11) NOT NULL,
  `id_boarduser` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `permORder` int(11) DEFAULT NULL,
  `nomeperm` varchar(20) DEFAULT NULL,
  `boardop1` tinyint(1) DEFAULT NULL,
  `boardop2` tinyint(1) DEFAULT NULL,
  `boardop3` tinyint(1) DEFAULT NULL,
  `boardop4` tinyint(1) DEFAULT NULL,
  `boardop5` tinyint(1) DEFAULT NULL,
  `boardop6` tinyint(1) DEFAULT NULL,
  `boardop7` tinyint(1) DEFAULT NULL,
  `boardop8` tinyint(1) DEFAULT NULL,
  `boardop9` tinyint(1) DEFAULT NULL,
  `boardop10` tinyint(1) DEFAULT NULL,
  `boardop11` tinyint(1) DEFAULT NULL,
  `boardop12` tinyint(1) DEFAULT NULL,
  `boardop13` tinyint(1) DEFAULT NULL,
  `boardop14` tinyint(1) DEFAULT NULL,
  `boardop15` tinyint(1) DEFAULT NULL,
  `boardop16` tinyint(1) DEFAULT NULL,
  `boardop17` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `boardpermissoesusers`
--

CREATE TABLE `boardpermissoesusers` (
  `id` int(11) NOT NULL,
  `id_boarduser` int(11) DEFAULT NULL,
  `id_boardpermissiao` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `boardprofileassociacao`
--

CREATE TABLE `boardprofileassociacao` (
  `id` int(11) NOT NULL,
  `id_board` int(11) DEFAULT NULL,
  `id_boarduser` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `boarduser`
--

CREATE TABLE `boarduser` (
  `id_boarduser` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `nomeboard` varchar(47) DEFAULT NULL,
  `cor` varchar(12) DEFAULT NULL,
  `imagem` varchar(100) DEFAULT NULL,
  `igestaosalario` varchar(10) DEFAULT NULL,
  `fgestaosalario` varchar(10) DEFAULT NULL,
  `fer` int(2) DEFAULT NULL,
  `duteis` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `boardusers`
--

CREATE TABLE `boardusers` (
  `id` int(11) NOT NULL,
  `id_board` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `corOrdem` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `filesboards`
--

CREATE TABLE `filesboards` (
  `id` int(11) NOT NULL,
  `id_board` int(11) DEFAULT NULL,
  `id_boardgeral` int(11) DEFAULT NULL,
  `url_image` varchar(100) DEFAULT NULL,
  `filename_file` varchar(255) DEFAULT NULL,
  `tipo` varchar(6) DEFAULT NULL,
  `upload_time` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `listadeamigos`
--

CREATE TABLE `listadeamigos` (
  `id` int(11) NOT NULL,
  `id_userprinc` int(11) DEFAULT NULL,
  `id_userfriend` int(11) DEFAULT NULL,
  `friend` int(11) DEFAULT NULL,
  `pedamistatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `listatarefas`
--

CREATE TABLE `listatarefas` (
  `id_listatarefas` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_board` int(11) DEFAULT NULL,
  `id_boardtarefas` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `nomeTarefa` varchar(40) DEFAULT NULL,
  `dataCriacao` varchar(20) DEFAULT NULL,
  `dataVencimento` varchar(20) DEFAULT NULL,
  `tempoEstimado` varchar(20) DEFAULT NULL,
  `prioridade` varchar(7) DEFAULT NULL,
  `descricao` longtext DEFAULT NULL,
  `atribudo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `login_users`
--

CREATE TABLE `login_users` (
  `user_id` int(11) NOT NULL,
  `user_username` varchar(32) NOT NULL,
  `user_email` varchar(60) NOT NULL,
  `user_password` varchar(128) NOT NULL,
  `user_status` int(1) NOT NULL,
  `user_statushoralimite` varchar(20) DEFAULT NULL,
  `user_name` varchar(30) DEFAULT NULL,
  `user_lname` varchar(30) DEFAULT NULL,
  `darkmode` int(1) NOT NULL,
  `user_imageurl` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pagamentos`
--

CREATE TABLE `pagamentos` (
  `id` int(11) NOT NULL,
  `id_board` int(11) DEFAULT NULL,
  `id_boarduser` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `dataCriacao` varchar(10) DEFAULT NULL,
  `metodoPagamento` varchar(15) DEFAULT NULL,
  `tipoPagamento` varchar(20) DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `observacao` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_board` (`id_board`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Índices para tabela `boardcategoria`
--
ALTER TABLE `boardcategoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_boarduser` (`id_boarduser`);

--
-- Índices para tabela `boardgestorsalario`
--
ALTER TABLE `boardgestorsalario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_boarduser` (`id_boarduser`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices para tabela `boardperiodotrabalho`
--
ALTER TABLE `boardperiodotrabalho`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_board` (`id_board`),
  ADD KEY `id_boarduser` (`id_boarduser`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices para tabela `boardpermissoes`
--
ALTER TABLE `boardpermissoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_boarduser` (`id_boarduser`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices para tabela `boardpermissoesusers`
--
ALTER TABLE `boardpermissoesusers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_boarduser` (`id_boarduser`),
  ADD KEY `id_boardpermissiao` (`id_boardpermissiao`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices para tabela `boardprofileassociacao`
--
ALTER TABLE `boardprofileassociacao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_board` (`id_board`),
  ADD KEY `id_boarduser` (`id_boarduser`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices para tabela `boarduser`
--
ALTER TABLE `boarduser`
  ADD PRIMARY KEY (`id_boarduser`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices para tabela `boardusers`
--
ALTER TABLE `boardusers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_board` (`id_board`),
  ADD KEY `id_user` (`id_user`);

--
-- Índices para tabela `filesboards`
--
ALTER TABLE `filesboards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_board` (`id_board`),
  ADD KEY `id_boardsettings` (`id_boardgeral`);

--
-- Índices para tabela `listadeamigos`
--
ALTER TABLE `listadeamigos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_userprinc` (`id_userprinc`),
  ADD KEY `id_userfriend` (`id_userfriend`);

--
-- Índices para tabela `listatarefas`
--
ALTER TABLE `listatarefas`
  ADD PRIMARY KEY (`id_listatarefas`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_board` (`id_board`),
  ADD KEY `id_boardtarefas` (`id_boardtarefas`);

--
-- Índices para tabela `login_users`
--
ALTER TABLE `login_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Índices para tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_board` (`id_board`),
  ADD KEY `id_boarduser` (`id_boarduser`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `board`
--
ALTER TABLE `board`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT de tabela `boardcategoria`
--
ALTER TABLE `boardcategoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de tabela `boardgestorsalario`
--
ALTER TABLE `boardgestorsalario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de tabela `boardperiodotrabalho`
--
ALTER TABLE `boardperiodotrabalho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT de tabela `boardpermissoes`
--
ALTER TABLE `boardpermissoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de tabela `boardpermissoesusers`
--
ALTER TABLE `boardpermissoesusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de tabela `boardprofileassociacao`
--
ALTER TABLE `boardprofileassociacao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=419;

--
-- AUTO_INCREMENT de tabela `boarduser`
--
ALTER TABLE `boarduser`
  MODIFY `id_boarduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `boardusers`
--
ALTER TABLE `boardusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT de tabela `filesboards`
--
ALTER TABLE `filesboards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT de tabela `listadeamigos`
--
ALTER TABLE `listadeamigos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de tabela `listatarefas`
--
ALTER TABLE `listatarefas`
  MODIFY `id_listatarefas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de tabela `login_users`
--
ALTER TABLE `login_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `board`
--
ALTER TABLE `board`
  ADD CONSTRAINT `board_ibfk_1` FOREIGN KEY (`id_board`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `board_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `boardcategoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `board_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `boardcategoria`
--
ALTER TABLE `boardcategoria`
  ADD CONSTRAINT `boardcategoria_ibfk_1` FOREIGN KEY (`id_boarduser`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `boardgestorsalario`
--
ALTER TABLE `boardgestorsalario`
  ADD CONSTRAINT `boardgestorsalario_ibfk_1` FOREIGN KEY (`id_boarduser`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `boardgestorsalario_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `boardperiodotrabalho`
--
ALTER TABLE `boardperiodotrabalho`
  ADD CONSTRAINT `boardperiodotrabalho_ibfk_1` FOREIGN KEY (`id_board`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `boardperiodotrabalho_ibfk_2` FOREIGN KEY (`id_boarduser`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `boardperiodotrabalho_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `boardpermissoes`
--
ALTER TABLE `boardpermissoes`
  ADD CONSTRAINT `boardpermissoes_ibfk_1` FOREIGN KEY (`id_boarduser`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `boardpermissoes_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `boardpermissoesusers`
--
ALTER TABLE `boardpermissoesusers`
  ADD CONSTRAINT `boardpermissoesusers_ibfk_1` FOREIGN KEY (`id_boarduser`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `boardpermissoesusers_ibfk_2` FOREIGN KEY (`id_boardpermissiao`) REFERENCES `boardpermissoes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `boardpermissoesusers_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `boardprofileassociacao`
--
ALTER TABLE `boardprofileassociacao`
  ADD CONSTRAINT `boardprofileassociacao_ibfk_1` FOREIGN KEY (`id_board`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `boardprofileassociacao_ibfk_2` FOREIGN KEY (`id_boarduser`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `boardprofileassociacao_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `boarduser`
--
ALTER TABLE `boarduser`
  ADD CONSTRAINT `boarduser_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `boardusers`
--
ALTER TABLE `boardusers`
  ADD CONSTRAINT `boardusers_ibfk_1` FOREIGN KEY (`id_board`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `boardusers_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `filesboards`
--
ALTER TABLE `filesboards`
  ADD CONSTRAINT `filesboards_ibfk_1` FOREIGN KEY (`id_board`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `filesboards_ibfk_2` FOREIGN KEY (`id_boardgeral`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `listadeamigos`
--
ALTER TABLE `listadeamigos`
  ADD CONSTRAINT `listadeamigos_ibfk_1` FOREIGN KEY (`id_userprinc`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listadeamigos_ibfk_2` FOREIGN KEY (`id_userfriend`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `listatarefas`
--
ALTER TABLE `listatarefas`
  ADD CONSTRAINT `listatarefas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listatarefas_ibfk_2` FOREIGN KEY (`id_board`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listatarefas_ibfk_3` FOREIGN KEY (`id_boardtarefas`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`id_board`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagamentos_ibfk_2` FOREIGN KEY (`id_boarduser`) REFERENCES `boarduser` (`id_boarduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagamentos_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `login_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
