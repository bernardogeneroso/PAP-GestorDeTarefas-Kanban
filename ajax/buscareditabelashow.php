<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

        if($_SESSION['user_board_perms'][13] == 1){
            include_once('../bd/bd.php');

            //$iduser = $_SESSION['user_id'];
            $idBoard = $_SESSION['user_board'];

            $boardarray = [];

            $sql = "SELECT A.id, A.nomeboard, B.nomeCategoria FROM board AS A, boardcategoria AS B WHERE A.id_board = '$idBoard' AND A.id_categoria = B.id";
            $result=mysqli_query($conn,$sql);

            if($row_cnt = $result->num_rows){
                while($row=mysqli_fetch_row($result)){
                    array_push($boardarray, [$row[0], $row[1], $row[2]]);
                }
            }
            echo json_encode($boardarray);
        } else {
            $send = array(0);
            echo json_encode($send);
        }
    } else {
		header('location: ../assets/logout.php');
	}
?>