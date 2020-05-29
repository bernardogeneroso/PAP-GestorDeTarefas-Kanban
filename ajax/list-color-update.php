<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');
        $id = $_SESSION['user_id'];
        $idBoard = $_SESSION['user_board'];
        $corOrdem = $_POST['corAtual'];
        $cor = '';
        if($corOrdem=='#224768'){$cor='1';}elseif($corOrdem=='#4950ba'){$cor='2';}elseif($corOrdem=='#a058ae'){$cor='3';}elseif($corOrdem=='#ff824c'){$cor='4';}elseif($corOrdem=='#2095f2'){$cor='5';}elseif($corOrdem=='#ffb600'){$cor='6';}elseif($corOrdem=='#519819'){$cor='7';}
        $conn->query("UPDATE boardusers SET corOrdem='$cor' WHERE id_board='$idBoard' AND id_user='$id'");
        echo $cor;
    } else {
		header('location: ../assets/logout.php');
	}
?>