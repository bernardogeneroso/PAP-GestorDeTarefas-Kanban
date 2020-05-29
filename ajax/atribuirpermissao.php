<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

        include_once('../bd/bd.php');

        if($_SESSION['user_board_perms'][3] == 1){
            $idboard = $_SESSION['user_board'];
            $iduser = $_SESSION['user_id'];
            $perm = $_POST['perm'];
            $membro = $_POST['membro'];
            $permorder = $_POST['permorder'];
            $permDB = '';

            $count = '';
            $nomeperm = '';
            $iduseradmin = '';
            $permadmin = 0;

            $sql = "SELECT COUNT(A.id_boardpermissiao), B.nomeperm, A.id_boardpermissiao, B.id_user FROM boardpermissoesusers AS A, boardpermissoes AS B WHERE A.id_boarduser='$idboard' AND B.id = A.id_boardpermissiao AND B.permORder='$permorder'";
            $result=mysqli_query($conn,$sql);

            if($row_cnt = $result->num_rows){
                while($row=mysqli_fetch_row($result)){
                    $count = $row[0];
                    $nomeperm = $row[1];
                    $permadmin = $row[2];
                    $iduseradmin = $row[3];
                }


                $sql = "SELECT id_boardpermissiao FROM boardpermissoesusers WHERE id_boarduser='$idboard' AND id_user='$membro' AND id_boardpermissiao <> '$perm'";
                $result=mysqli_query($conn,$sql);

                if($row_cnt = $result->num_rows){
                    while($row=mysqli_fetch_row($result)){
                        $permDB = $row[0];
                    }
                    if($permDB == $perm){
                        echo 0;
                    } else if($perm == $permadmin){ //admin
                        if($membro == $iduseradmin){
                            echo 2;
                        } else {
                            $conn->query("UPDATE boardpermissoesusers SET id_boardpermissiao='$perm' WHERE id_boarduser='$idboard' AND id_user='$membro'");
                            echo 1;
                        }
                    } else { //resto
                        $conn->query("UPDATE boardpermissoesusers SET id_boardpermissiao='$perm' WHERE id_boarduser='$idboard' AND id_user='$membro'");
                        echo 1;
                    }
                } else {
                    echo 0;
                }
            }
        } else {
            echo 3;
        }
    } else {
		header('location: ../assets/logout.php');
	}
?>