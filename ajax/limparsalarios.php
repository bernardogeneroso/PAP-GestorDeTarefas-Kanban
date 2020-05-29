<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');
        $id = $_SESSION['user_id'];
        $idBoard = $_SESSION['user_board'];

        if(!empty($_POST['positions'])){
            foreach($_POST['positions'] as $position) {
                $index = $position[0];

                $conn->query("UPDATE boardgestorsalario SET tipo_trabalhador_depende='0', tipo_trabalhador=NULL, salario_mensal=NULL, salario_semanal=NULL, tempo_trabalho_dias='0', tempo_trabalho_horas=NULL, dias_semanais_trabalho='0', receita_final=NULL, dataRegisto=NULL WHERE id_boarduser='$idBoard' AND id='$index'");
            }
        }

        $conn->query("UPDATE boarduser SET igestaosalario=NULL, fgestaosalario=NULL, fer=NULL, duteis=NULL WHERE id_boarduser='$idBoard'");
    } else {
		header('location: ../assets/logout.php');
	}
?>