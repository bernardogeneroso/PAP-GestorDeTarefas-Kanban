<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');
        $id = $_SESSION['user_id'];
        $idBoard = $_SESSION['user_board'];
        $sql = "SELECT corOrdem FROM boardusers WHERE id_board='$idBoard' AND id_user='$id'";
        $result = mysqli_query($conn, $sql);
        if ($row_cnt = $result->num_rows) {
            while ($row = mysqli_fetch_row($result)) {
            $corOrdem = $row[0];
            }
        }
        if($corOrdem==1){$cor='#224768';}elseif($corOrdem==2){$cor='#4950BA';}elseif($corOrdem==3){$cor='#A058AE';}elseif($corOrdem==4){$cor='#FF824C';}elseif($corOrdem==5){$cor='#2095F2';}elseif($corOrdem==6){$cor='#FFB600';}elseif($corOrdem==7){$cor='#519819';}
        echo $cor;
	} else {
		header('location: ../assets/logout.php');
	}
?>