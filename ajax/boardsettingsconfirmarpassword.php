<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');

		$iduser = $_SESSION['user_id'];
        $passowrd = hash("sha512", $conn->real_escape_string($_POST['passowrd']));
        $passowrdbd = '';
        $confirm = 0;

		$sql = "SELECT user_password FROM `login_users` WHERE user_id = '$iduser'";
		$result=mysqli_query($conn,$sql);

		if($row_cnt = $result->num_rows){
            while($row=mysqli_fetch_row($result)){
                $passowrdbd = $row[0];
            }
            
            if($passowrd === $passowrdbd){
                $confirm = 1;
            } else {
                $confirm = 0;
            }

            echo $confirm;
        }else { //se não apresenta só esta menssagem
			echo $confirm;
		}

	} else {
		header('location: ../assets/logout.php');
	}
?>