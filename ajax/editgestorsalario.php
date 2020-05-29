<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');
        $id = $_SESSION['user_id'];
        $idBoard = $_SESSION['user_board'];
        $index = $_POST['index'];
        $tipoTrabalhador = $_POST['tipoTrabalhador'];
        $salario = $_POST['salario'];
        $salarioGeral = $_POST['salarioGeral'];
        $salarioGeralTrate = $_POST['salarioGeralTrate'];
        $tipoTrabalhadorDepende = $_POST['tipoTrabalhadorDepende'];
        $diasuteis = $_POST['diasuteis'];
        $_SESSION['user_tipotrabalho'] = $tipoTrabalhadorDepende;

        $conn->query("UPDATE boardgestorsalario SET tipo_trabalhador='$tipoTrabalhador', $salarioGeral='$salario', $salarioGeralTrate=NULL, tipo_trabalhador_depende='$tipoTrabalhadorDepende', tempo_trabalho_dias='$diasuteis' WHERE id_boarduser='$idBoard' AND id='$index'");
    } else {
		header('location: ../assets/logout.php');
	}
?>