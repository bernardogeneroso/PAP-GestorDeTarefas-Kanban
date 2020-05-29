<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

        if($_SESSION['user_board_perms'][9] == 1){
            include_once('../bd/bd.php');

            $id = $_SESSION['user_id'];
            $idBoard = $_SESSION['user_board'];
            $index = $_POST['index'];
            $comentario = $_POST['comment'];
            $atributo = '';
            $position = 0;
            $dataCriacao = date('d-m-Y H:i:s');

            $username = '';
            $email = '';
            
            $sql = "SELECT A.user_imageurl, A.user_username, A.user_email, (MAX(B.position)+1) FROM login_users AS A, listatarefas AS B WHERE A.user_id = '$id' AND B.id_user = '$id' AND B.id_board = '$idBoard'";
            $result=mysqli_query($conn,$sql);

            if($row_cnt = $result->num_rows){
                while($row=mysqli_fetch_row($result)){
                    $atributo = $row[0];
                    $username = $row[1];
                    $email = $row[2];
                    $position = $row[3];

                    if(empty($position) || is_null($position)){
                        $position = 1;
                    }
                }
            }

            $conn->query("INSERT INTO listatarefas (id_listatarefas, id_user, id_board, id_boardtarefas, position, nomeTarefa, atribudo, dataCriacao) VALUES ('', '$id', '$idBoard', '$index', '$position', '$comentario', '$atributo', '$dataCriacao')");

            $origem = array($atributo, $username, $email, $conn->insert_id, $dataCriacao, $id, $position);
            echo json_encode($origem, JSON_UNESCAPED_UNICODE);
        } else {
            $origem = array('0');
            echo json_encode($origem);
        }
    } else {
		header('location: ../assets/logout.php');
	}
?>