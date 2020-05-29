<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $passwordconfirm = hash("sha512", $_POST['passwordconfirm']);
        $password  = '';

        $sql = "SELECT user_password FROM login_users WHERE user_id='$iduser'";
        $result=mysqli_query($conn,$sql);

        if($row_cnt = $result->num_rows){
            while($row=mysqli_fetch_row($result)){
                $password = $row[0];
            }

            if($passwordconfirm == $password){
                echo 'DONE';
            }  else {
                echo 'ERROR';
            }
        }else {
            echo 'ERROR';
        }
    } else {
		header('location: ../assets/logout.php');
	}
?>