<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];

		$account = [];

		$sql = "SELECT user_username, user_email, user_name, user_lname FROM login_users WHERE user_id = '$id'";
		$result=mysqli_query($conn,$sql);

		if($row_cnt = $result->num_rows){
            while($row=mysqli_fetch_row($result)){
                array_push($account, [$row[0], $row[1], $row[2], $row[3]]);
            }
			echo json_encode($account);
        }else { //se não apresenta só esta menssagem
			echo json_encode('ERROR');
		}

	} else {
		header('location: ../assets/logout.php');
	}
?>