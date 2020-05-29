<?php 
	//Verifica se não existente uma sessão criada, se não, direciona para o login.php
	session_start();
	if(!isset($_SESSION['estado_login'])){
		header('location: login');
		exit();
	} elseif ($_SESSION['estado_boardsettings'] == 1) {
		header('location: boardsettings');
	} elseif ($_SESSION['estado_boardclick'] == 1) {
		header('location: board');
	}
?>