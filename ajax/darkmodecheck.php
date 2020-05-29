<?php
	if(isset($_POST['darkmodeAccount']) && $_POST['darkmodeAccount'] == 1){
		session_start();

		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];
		$darkmode = 0;

		$sql = "SELECT darkmode FROM login_users WHERE user_id = '$id'";
		$result=mysqli_query($conn,$sql);

		if($row_cnt = $result->num_rows){
            while($row=mysqli_fetch_row($result)){
                $darkmode = $row[0];
            }
        }else { //se não apresenta só esta menssagem
			echo 'ERROR!';
		}


		if($darkmode == 1){
			$darkmode = 0;
			$_SESSION['estado_darkmode'] = 0;
		} else {
			$darkmode = 1;
			$_SESSION['estado_darkmode'] = 1;
		}

		$sql = "UPDATE login_users
				SET darkmode = '$darkmode'
				WHERE user_id = '$id'";

	   	$update = mysqli_query($conn, $sql) or die(mysqli_error($conn));

	} else {
		header('location: ../assets/logout.php');
	}
?>