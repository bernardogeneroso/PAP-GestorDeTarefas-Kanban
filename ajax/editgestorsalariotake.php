<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');
        $id = $_SESSION['user_id'];
        $idBoard = $_SESSION['user_board'];
        $index = $_POST['index'];
        $salario = '';
        $tipoTrabalhador = '0';

        $sql = "SELECT tipo_trabalhador, salario_mensal, salario_semanal FROM boardgestorsalario WHERE id='$index' AND id_boarduser='$idBoard'";
        $result=mysqli_query($conn,$sql);

		if($row_cnt = $result->num_rows){
            while($row=mysqli_fetch_row($result)){
                $salario = ($row[1]==null||$row[1]=='')?$row[2]:$row[1];
                if($row[0]=='' || $row[0]==null){
                    $tipoTrabalhador = '0';
                } else if($row[0]=='Externo')  {
                    $tipoTrabalhador = '1';
                }
            }
        }
        $send = array($tipoTrabalhador, $salario);
        echo json_encode($send);
    } else {
		header('location: ../assets/logout.php');
	}
?>