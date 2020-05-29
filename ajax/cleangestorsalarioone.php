<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');
        $id = $_SESSION['user_id'];
        $idBoard = $_SESSION['user_board'];
        $index = $_POST['index'];
        
        $conn->query("UPDATE boardgestorsalario SET tipo_trabalhador_depende='0', tipo_trabalhador=NULL, salario_mensal=NULL, salario_semanal=NULL, tempo_trabalho_dias='0', tempo_trabalho_horas=NULL, dias_semanais_trabalho='0', receita_final=NULL, dataRegisto=NULL WHERE id_boarduser='$idBoard' AND id='$index'");
    } else {
		header('location: ../assets/logout.php');
	}
?>