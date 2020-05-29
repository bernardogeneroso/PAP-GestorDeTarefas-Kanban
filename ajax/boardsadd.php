<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
        session_start();
        if($_SESSION['user_board_perms'][9] == 1){
            include_once('../bd/bd.php');

            $iduser = $_SESSION['user_id'];
            $idboard = $_SESSION['user_board'];
            $lengthMax = $_POST['lengthMax'];
            $takeBoardName = $_POST['takeBoardName'];
            $id = $_POST['id'];
            $tempoAtual = date('d-m-Y H:i:s');

            $sql = "INSERT INTO board (id, id_board, id_categoria, id_user, id_position, nomeboard, dataCriacao)
            VALUES ('', '$idboard', '$id', '$iduser', '$lengthMax', '$takeBoardName', '$tempoAtual')";
            mysqli_set_charset($conn,"utf8");

            if ($conn->query($sql) === TRUE) {
                $conn->query("UPDATE boardcategoria SET countBoard = '$lengthMax' WHERE id='$id' AND id_boarduser='$idboard'");
                $sql = "SELECT MAX(id) FROM board WHERE id_board = '$idboard'";

                $result=mysqli_query($conn,$sql);

                if($row_cnt = $result->num_rows){
                    while($row=mysqli_fetch_row($result)){
                        echo $row[0]." ".$_SESSION['user_board_perms'][10]." ".$_SESSION['user_board_perms'][11];
                    }
                }
            }
        } else {
            echo 0;
        }
	} else {
		header('location: ../assets/logout.php');
	}
?>
