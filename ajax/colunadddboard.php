<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
        session_start();
        
        if($_SESSION['user_board_perms'][9] == 1){
            include_once('../bd/bd.php');

            $id = $_SESSION['user_id'];
            $idboard = $_SESSION['user_board'];
            $colunaName = $_POST['colunaName'];
            $idTake = '';

            $sql = "INSERT INTO boardcategoria (id, id_boarduser, countBoard, nomeCategoria)
            VALUES ('', '$idboard', '0', '$colunaName')";
            mysqli_set_charset($conn,"utf8");
            $cancelOpacity = '';
            if ($_SESSION['user_board_perms'][11] == 0) {$cancelOpacity = 'opacity:0.5';}
            if ($conn->query($sql) === TRUE) {
                $idTake = $conn->insert_id;

                $sql = "SELECT corOrdem FROM boardusers WHERE id_board='$idboard' AND id_user='$id'";
                $result=mysqli_query($conn,$sql);
                if($row_cnt = $result->num_rows){
                    while($row=mysqli_fetch_row($result)){
                        $corOrdem = $row[0];
                        $cor = '';
                        if($corOrdem=='1'){$cor='#224768';}elseif($corOrdem=='2'){$cor='#4950ba';}elseif($corOrdem=='3'){$cor='#a058ae';}elseif($corOrdem=='4'){$cor='#ff824c';}elseif($corOrdem=='5'){$cor='#2095f2';}elseif($corOrdem=='6'){$cor='#ffb600';}elseif($corOrdem=='7'){$cor='#519819';}
                        $send = array($idTake, $cancelOpacity, $cor);
                        echo json_encode($send);
                    }
                }
            }
        } else {
            echo json_encode(0);
        }
	} else {
		header('location: ../assets/logout.php');
	}
?>
