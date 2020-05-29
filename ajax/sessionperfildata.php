<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];

		$sql = "SELECT user_id, user_username, user_email, user_imageurl FROM login_users WHERE user_id='$id'";
		$result=mysqli_query($conn,$sql);

		if($row_cnt = $result->num_rows){
            while($row=mysqli_fetch_row($result)){
                $um = $row[0];
                $dois = $row[1];
                $tres = $row[2];
                $quatro = $row[3];
            }
            $send = array($um, $dois, $tres, $quatro);
			echo json_encode($send, JSON_UNESCAPED_UNICODE);
        }else { //se não apresenta só esta menssagem
			echo 'ERROR!';
		}

	} else {
		header('location: ../assets/logout.php');
	}
?>