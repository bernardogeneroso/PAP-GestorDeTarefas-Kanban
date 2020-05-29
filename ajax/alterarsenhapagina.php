<?php
if (isset($_POST['update']) && $_POST['update'] == 1) {
    include_once('../bd/bd.php');
    
    $um = $_POST['um'];   
    $tres = $_POST['tres'];
    $iduser = $_POST['iduser'];
    $passowrdDB = '';

    $sql = "SELECT user_password FROM login_users WHERE SHA2(user_id, 512)='$iduser'";
    $result = mysqli_query($conn, $sql);
    if ($row_cnt = $result->num_rows) {
        while ($row = mysqli_fetch_row($result)) {
            $passowrdDB = $row[0];
        }
        $um = hash("sha512", $um);
        if($passowrdDB == $um){
            $conn->query("UPDATE login_users SET user_password=SHA2('$tres', 512), user_statushoralimite='' WHERE SHA2(user_id, 512)='$iduser'");
            echo 2;
        } else {
            echo 1;
        }
    } else {
        echo 0;
    }
} else {
    header('location: ../assets/logout.php');
}
