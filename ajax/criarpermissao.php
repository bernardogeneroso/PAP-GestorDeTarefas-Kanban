<?php
	if (isset($_POST['update']) && $_POST['update'] == 1) {
        session_start();
        include_once('../bd/bd.php');
        
        $iduser = $_SESSION['user_id'];
        $idboard = $_SESSION['user_board'];
        $nomep = $_POST['nomep'];
        $boardop = $_POST['checkBoxPerm'];
        $permchange = ($_POST['permchange']+1);

        $sql = "INSERT INTO boardpermissoes (id, id_boarduser, id_user, permORder, nomeperm, boardop1, boardop2, boardop3, boardop4, boardop5, boardop6, boardop7, boardop8, boardop9, boardop10, boardop11, boardop12, boardop13, boardop14, boardop15, boardop16, boardop17)
        VALUES (NULL, '$idboard', '$iduser', $permchange, '$nomep', '$boardop[0]', '$boardop[1]', '$boardop[2]', '$boardop[3]', '$boardop[4]', '$boardop[5]', '$boardop[6]', '$boardop[7]', '$boardop[8]', '$boardop[9]', '$boardop[10]', '$boardop[11]', '$boardop[12]', '$boardop[13]', '$boardop[14]', '$boardop[15], '$boardop[16]')";
        mysqli_set_charset($conn,"utf8");

        if ($conn->query($sql) === TRUE) {
            $send = array('1', $conn->insert_id, $permchange);
            echo json_encode($send);
        } else {
            $send = array('0', $conn->error);
            echo json_encode($send);
        }
    } else {
    	header('location: ../assets/logout.php');
    }
?>