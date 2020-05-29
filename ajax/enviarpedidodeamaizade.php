<?php
if (isset($_POST['update']) && $_POST['update'] == 1) {
    session_start();
    include_once('../bd/bd.php');

    $emailamigo = $_POST['emailamigo'];
    $iduser = $_SESSION['user_id'];

    $sql = "SELECT B.id_userfriend FROM login_users AS A, listadeamigos AS B WHERE A.user_email='$emailamigo' AND A.user_id = B.id_userfriend AND B.id_userprinc = $iduser";
    $result = mysqli_query($conn, $sql);
    if ($row_cnt = $result->num_rows) {
        echo 2; //amigo
    } else {
        $id = '';
        $sql = "SELECT user_id FROM `login_users` WHERE user_email='$emailamigo'";
        $result = mysqli_query($conn, $sql);
        if ($row_cnt = $result->num_rows) {
            while ($row = mysqli_fetch_row($result)) {
                $id = $row[0];
            }
        }
        $sql = "INSERT INTO listadeamigos (id, id_userprinc, id_userfriend, friend, pedamistatus)
        VALUES ('', '$iduser', '$id', 0, 0)";
        mysqli_set_charset($conn, "utf8");

        if ($conn->query($sql) === TRUE) {
            $sql = "INSERT INTO listadeamigos (id, id_userprinc, id_userfriend, friend, pedamistatus)
            VALUES ('', '$id', '$iduser', 0, 1)";
            mysqli_set_charset($conn, "utf8");

            if ($conn->query($sql) === TRUE) {
                echo 1;
            } else {
                echo 3;
            }
        } else {
            echo 4;
        }
    }
} else {
    header('location: ../assets/logout.php');
}
