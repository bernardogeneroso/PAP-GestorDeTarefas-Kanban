<?php 
	session_start(); //inicia a sessão

	unset($_SESSION['estado_login']); //apaga a variável
	unset($_SESSION['estado_boardsettings']);
	session_destroy(); // destroy a sessão
	header('location: ../login'); //redireciona para a página de login.php
	exit(); //termina o ajax
?>