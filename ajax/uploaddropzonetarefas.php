<?php
    if (isset($_FILES['attachments'])) {
        session_start();

        if($_SESSION['user_board_perms'][9] == 1){
            include_once('../bd/bd.php');
            $msg = "";

            $idTarefaAtual = $_SESSION['user_tarefatual'];
            $idboard = $_SESSION['user_board'];
            $horaAtual = date('d-m-Y H:i:s');

            $fileName = $_FILES['attachments']['name'][0];

            $fileExt = explode('.',$fileName);
            $fileActualExt = strtolower(end($fileExt));
            $fileNameIn = $fileExt[0];

            $allowed = array('jpg','jpeg','png','gif','docx','pptx','pdf','txt','zip','rar','7z','xlsx');

            if(in_array($fileActualExt, $allowed)){
                $fileNameNew = $fileNameIn.".".uniqid('',true).".".$fileActualExt; 
                $fileDestination = 'C:/Users/Camelo/Documents/xampp/htdocs/pap/img/board/tarefas/'.$fileNameNew;
                $fileDestinationSent = 'img/board/tarefas/'.$fileNameNew;
                move_uploaded_file($_FILES['attachments']['tmp_name'][0], $fileDestination);

                $conn->query("INSERT INTO `filesboards` (`id`, `id_board`, `id_boardgeral`, `url_image`, `filename_file`, `tipo`, `upload_time`) VALUES (NULL, '$idTarefaAtual', '$idboard', '$fileDestinationSent', '$fileNameIn', '$fileActualExt', '$horaAtual');");

                $msg = array("status" => 1, "msg" => "Ficheiro adicionado", "path" => $fileDestinationSent, "id" => $conn->insert_id, "tipo" => $fileActualExt, "filename" => $fileNameIn);
                
            } else {
                $msgtext = "O ficheiro com o formato ".$fileActualExt." não é aceite";
                $msg = array("status" => 0, "msg" => $msgtext);
            }
        } else {
            $msg = array("status" => 0, "msg" => "Não pode adicionar imagens!");
        }

        exit(json_encode($msg));
    } else {
    	header('location: ../assets/logout.php');
    }
?>