<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');

        $idboard = $_SESSION['user_board'];
        $iduser = $_SESSION['user_id'];
        $id = $_POST['id'];
        $colunaID = $_POST['colunaID'];
        $_SESSION['user_tarefatual'] = $id;

        $nomeBoard = '';
        $prioridade = '';
        $categoria = '';

        $dataCriacao = '';
        $dataEncerramento = '';
        $descricao = '';

        $username = '';

        $comentarios = [];
        $allfiles = [];
        $boardperiodotrabalho = [];
        $pagamentos = [];
        $pagamentosTable = [];
        $perfilusersassociationtarefa = [];

        if($_SESSION['user_board_perms'][8] == 1){
            $sql = "SELECT board.nomeboard, board.prioridade, boardcategoria.nomeCategoria, board.dataCriacao, board.dataEncerramento, board.prazoEntrega, board.fatura, board.valor_pago, board.preco_total, board.despesas, board.lucro, board.falta_pagar, board.descricao, U.user_username FROM board, boardcategoria, login_users AS U WHERE board.id = '$id' AND board.id_board = '$idboard' AND boardcategoria.id = '$colunaID' AND boardcategoria.id_boarduser = '$idboard' AND board.id_user = U.user_id";
            $result=mysqli_query($conn,$sql);

            if($row_cnt = $result->num_rows){
                while($row=mysqli_fetch_row($result)){
                    $nomeBoard = $row[0];
                    $prioridade = $row[1];
                    $categoria = $row[2];
                    $dataCriacao = $row[3];
                    $dataEncerramento = $row[4];
                    $descricao = $row[12];
                    $username = $row[13];

                    for ($x = 4; $x < 12; $x++) {
                        if($x == 6 && $row[$x] === null){
                            $row[$x] = '';
                        } elseif($row[$x] === null){
                            $row[$x] = 0;
                        }
                    }
                    $dataEncerramento = $row[4];
                    array_push($pagamentos, [$row[5], $row[6], $row[7], $row[8], $row[9], $row[10], $row[11]]);
                }
                
                if($_SESSION['user_board_perms'][4] == 1){
                    $sql = "SELECT A.nomeTarefa, A.dataCriacao, A.id_listatarefas, B.user_username, B.user_email, B.user_imageurl FROM listatarefas AS A, login_users AS B WHERE A.id_board = '$idboard' AND A.id_boardtarefas = '$id' AND A.id_user = B.user_id";
                    $result=mysqli_query($conn,$sql);

                    if($row_cnt = $result->num_rows){
                        while($row=mysqli_fetch_row($result)){
                            array_push($comentarios, [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5]]);
                        }
                    }

                    $sql = "SELECT B.user_id, B.user_username, B.user_email, B.user_imageurl FROM boardprofileassociacao AS A, login_users AS B WHERE A.id_board = '$id' AND A.id_boarduser = '$idboard' AND B.user_id = A.id_user";

                    $result=mysqli_query($conn,$sql);

                    if($row_cnt = $result->num_rows){
                        while($row=mysqli_fetch_row($result)){
                            array_push($perfilusersassociationtarefa, [$row[0], $row[1], $row[2], $row[3]]);
                        }
                    }
                }

                if($_SESSION['user_board_perms'][5] == 1){
                    $sql = "SELECT id, url_image, tipo, filename_file FROM `filesboards` WHERE id_board = '$id'";

                    $result=mysqli_query($conn,$sql);

                    if($row_cnt = $result->num_rows){
                        while($row=mysqli_fetch_row($result)){
                            array_push($allfiles, [$row[0], $row[1], $row[2], $row[3]]);
                        }
                    }
                }

                if($_SESSION['user_board_perms'][6] == 1){
                    $sql = "SELECT A.atribuito, A.para, A.de, A.tempoTotal, B.user_username, B.user_email FROM boardperiodotrabalho AS A, login_users AS B WHERE id_board = '$id' AND id_boarduser = '$idboard' AND A.id_user = B.user_id";
                    
                    $result=mysqli_query($conn,$sql);

                    if($row_cnt = $result->num_rows){
                        while($row=mysqli_fetch_row($result)){
                            array_push($boardperiodotrabalho, [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5]]);
                        }
                    }
                }

                if($_SESSION['user_board_perms'][7] == 1){
                    $sql = "SELECT B.user_imageurl, B.user_username, B.user_email, B.user_id, A.dataCriacao, A.metodoPagamento, A.tipoPagamento, A.valor, A.observacao, A.id FROM `pagamentos` AS A, login_users AS B WHERE A.id_board = '$id' AND A.id_boarduser = '$idboard' AND A.id_user = B.user_id";

                    $result=mysqli_query($conn,$sql);

                    $permAdmin = 0;
                    if($_SESSION['user_board_perms'][0]==1&&$_SESSION['user_board_perms'][1]==1&&$_SESSION['user_board_perms'][2]==1&&$_SESSION['user_board_perms'][3]==1&&$_SESSION['user_board_perms'][4]==1&&$_SESSION['user_board_perms'][5]==1&&$_SESSION['user_board_perms'][6]==1&&$_SESSION['user_board_perms'][7]==1&&$_SESSION['user_board_perms'][8]==1&&$_SESSION['user_board_perms'][9]==1&&$_SESSION['user_board_perms'][10]==1&&$_SESSION['user_board_perms'][11]==1&&$_SESSION['user_board_perms'][12]==1&&$_SESSION['user_board_perms'][13]==1&&$_SESSION['user_board_perms'][14]==1&&$_SESSION['user_board_perms'][15]==1) {$permAdmin = 1;}

                    if($row_cnt = $result->num_rows){
                        while($row=mysqli_fetch_row($result)){
                            array_push($pagamentosTable, [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7], $row[8], $row[9], $permAdmin]);
                        }
                    }
                }

                $perfilOnBoard = '';
                //$sql = "SELECT B.user_username, B.user_email, B.user_imageurl, B.user_id FROM boardusers AS A, login_users AS B WHERE A.id_board = '$idBoard' AND A.id_user = B.user_id";
                $sql = "SELECT DISTINCT C.user_username, C.user_email, C.user_imageurl, C.user_id, A.id_boardpermissiao FROM boardpermissoesusers AS A, login_users AS C WHERE A.id_boarduser = '$idboard' AND A.id_user = C.user_id";
                $result=mysqli_query($conn,$sql);
                
                if($row_cnt = $result->num_rows){
                    while($row=mysqli_fetch_row($result)){
                        if(!empty($row[2])){
                            $perfilOnBoard .='<div class="col-auto px-0" style="margin-right:6px"><img src="'.$row[2].'" class="checkBoardAddEditTarefas" style="opacity: 1" data-index="'.$row[3].'" data-ativo="0" title="Utilizador: '.$row[0].' | Email: '.$row[1].'" alt="Pedimos desculpa pelo o erro"><span><i class="fas fa-check" style="display:none"></i></span></div>';
                        } else {
                            $perfilOnBoard .='<div class="col-auto px-0" style="margin-right:6px"><img src="img/boardsettings/defaultboard.jpg" class="checkBoardAddEditTarefas" style="opacity: 1" data-index="'.$row[3].'" data-ativo="0" title="Utilizador: '.$row[0].' | Email: '.$row[1].'" alt="Pedimos desculpa pelo o erro"><span><i class="fas fa-check" style="display:none"></i></span></div>';
                        } 
                    }
                }

                $origem = array($nomeBoard, $prioridade, $categoria, $comentarios, $allfiles, $dataCriacao, $boardperiodotrabalho, $dataEncerramento, $pagamentos, $pagamentosTable, $descricao, $perfilusersassociationtarefa, $username, $perfilOnBoard);
                echo json_encode($origem);
            } else {
                echo 'ERROR!';
            }
        }else {
            $origem = array('0');
            echo json_encode($origem);
        }

	} else {
		header('location: ../assets/logout.php');
	}
?>