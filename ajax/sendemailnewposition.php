<?php
if (isset($_POST['update']) && $_POST['update'] == 1) {
    session_start();

    if ($_SESSION['user_board_perms'][8] == 1) {
        include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $idboard = $_SESSION['user_board'];

        $nomeBoard = $_POST['nomeBoard'];
        $coluna = $_POST['coluna'];
        $idtarefa = $_POST['idtarefa'];
        $emailArray = [];
        $board = [];
        $comentarios = '';
        $menu = '';
        $menuContent = '';
        $hrEstiloPagamento = '';
        $commentAndPagamento = '';
        $menuContent = '';
        $menuContent = '';
        $menuContent = '';
        $subject = '';

        //$sql = "SELECT B.user_email, C.nomeboard FROM boardprofileassociacao AS A, login_users AS B, boarduser AS C WHERE A.id_board = '$idtarefa' AND A.id_boarduser = '$idboard' AND A.id_user = B.user_id AND A.id_boarduser = C.id_boarduser";
        $sql = "SELECT B.user_email, C.nomeboard, D.boardop5, D.boardop7, D.boardop8 FROM boardprofileassociacao AS A, login_users AS B, boarduser AS C, boardpermissoes AS D, boardpermissoesusers AS E WHERE A.id_board = '$idtarefa' AND A.id_boarduser = '$idboard' AND A.id_user = B.user_id AND A.id_boarduser = C.id_boarduser AND E.id_user = B.user_id AND E.id_boardpermissiao = D.id";
        $result = mysqli_query($conn, $sql);

        if ($row_cnt = $result->num_rows) {
            while ($row = mysqli_fetch_row($result)) {
                array_push($emailArray, [$row[0], $row[1], $row[2], $row[3], $row[4]]);
            }
        }


        $sql = "SELECT A.prioridade, A.descricao, A.dataCriacao, A.tempoDespendido, A.dataEncerramento, A.prazoEntrega, A.fatura, A.valor_pago, A.falta_pagar, A.preco_total, A.despesas, A.lucro, B.user_username FROM board AS A, login_users AS B WHERE A.id_board = '$idboard' AND A.id = '$idtarefa' AND A.id_user = B.user_id";

        $result = mysqli_query($conn, $sql);

        if ($row_cnt = $result->num_rows) {
            while ($row = mysqli_fetch_row($result)) {
                for ($x = 0; $x < 12; $x++) {
                    if ($row[$x] === null) {
                        $row[$x] = 0;
                    }
                }

                array_push($board, [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7], $row[8], $row[9], $row[10], $row[11], $row[12]]);
            }
        }


        $sql = "SELECT B.user_username, A.nomeTarefa FROM listatarefas AS A, login_users AS B WHERE A.id_board = '$idboard' AND A.id_boardtarefas = '$idtarefa' AND A.id_user = B.user_id";

        $result = mysqli_query($conn, $sql);

        if ($row_cnt = $result->num_rows) {
            while ($row = mysqli_fetch_row($result)) {
                $comentarios .= '<div style="margin-left: 6px;">' . $row[0] . ': ' . $row[1] . '</div>';
            }
        }

        //if
        $menuPagamentos = '';
        $menuPagamentosContent = '';
        $countPagamento = '';


        if ($board[0][0] == '') {
            $board[0][0] = '#2C2F33';
            $urgencia = 'Sem prioridade';
        } elseif ($board[0][0] == '#519839') {
            $urgencia = 'Normal';
        } elseif ($board[0][0] == '#f2d600' || $board[0][0] == '#F2D600') {
            $urgencia = 'Pouco Urgente';
        } elseif ($board[0][0] == '#ff9f1a' || $board[0][0] == '#FF9F1A') {
            $urgencia = 'Urgente';
        } elseif ($board[0][0] == '#eb5a46' || $board[0][0] == '#EB5A46') {
            $urgencia = 'Emergente';
        }

        if ($board[0][1] != '' ||  $board[0][1] != null) {
            $descricao = $board[0][1];
        } else {
            $descricao = 'Sem descrição';
        }


        if ($board[0][2] != '' || $board[0][2] != null) {
            $menu .= '<th>Data de Criação</th>';
            $menuContent .= '<td align="center">' . $board[0][2] . '</td>';
        }
        if ($board[0][3] != '' || $board[0][3] != null) {
            $menu .= '<th>Tempo despedindo</th>';
            $menuContent .= '<td align="center">' . $board[0][3] . '</td>';
        }
        if ($board[0][4] != '' || $board[0][4] != null) {
            $menu .= '<th>Data de encerramento</th>';
            $menuContent .= '<td align="center">' . $board[0][4] . '</td>';
        }
        if ($board[0][5] != '' || $board[0][5] != null) {
            $menu .= '<th>Prazo de entrega</th>';
            $menuContent .= '<td align="center">' . $board[0][5] . '</td>';
        }

        if ($board[0][6] != '' || $board[0][6] != null || !empty($board[0][6])) {
            $menuPagamentos .= '<th>Fatura</th>';
            $menuPagamentosContent .= '<td align="center" style="text-align:center;">' . $board[0][6] . '</td>';
            $countPagamento .= 1;
        }
        if ($board[0][7] != '0' || $board[0][7] != null || $board[0][7] != '') {
            $menuPagamentos .= '<th>Valor pago</th>';
            $menuPagamentosContent .= '<td align="center" style="text-align:center;">' . $board[0][7] . '&euro;</td>';
            $countPagamento .= 1;
        }
        if ($board[0][8] != '0' || $board[0][8] != null || $board[0][8] != '') {
            $menuPagamentos .= '<th>Falta pagar</th>';
            $menuPagamentosContent .= '<td align="center" style="text-align:center;">' . $board[0][8] . '&euro;</td>';
            $countPagamento .= 1;
        }
        if ($board[0][9] != '0' || $board[0][9] != null || $board[0][9] != '') {
            $menuPagamentos .= '<th>Preço total</th>';
            $menuPagamentosContent .= '<td align="center" style="text-align:center;">' . $board[0][9] . '&euro;</td>';
            $countPagamento .= 1;
        }
        if ($board[0][10] != '0' || $board[0][10] != null || $board[0][10] != '') {
            $menuPagamentos .= '<th>Despessas</th>';
            $menuPagamentosContent .= '<td align="center" style="text-align:center;">' . $board[0][10] . '&euro;</td>';
            $countPagamento .= 1;
        }
        if ($board[0][11] != '0' || $board[0][11] != null || $board[0][11] != '') {
            $menuPagamentos .= '<th>Lucro</th>';
            $menuPagamentosContent .= '<td align="center" style="text-align:center;">' . $board[0][11] . '&euro;</td>';
            $countPagamento .= 1;
        }

        ($comentarios != '') ? $estiloCommentarios = 'inline-table' : $estiloCommentarios = 'none';

        if ($countPagamento > 0) {
            $estiloPagamento = '';
            $hrEstiloPagamento = 'block';
        } else {
            $estiloPagamento = 'none';
        }

        if ($comentarios == '' && $countPagamento == 0) {
            $commentAndPagamento = 'none';
        }
        //envia para as pessoas que estão associadas a tarefa

        include("../assets/phpmailer/phpmailer/class.phpmailer.php");
        include("../assets/phpmailer/phpmailer/class.smtp.php");

        for ($x = 0; $x < sizeof($emailArray); $x++) {
            //mail
            $subject = $emailArray[$x][1] . ' > ' . $nomeBoard . ' > ' . $coluna;

            $message = '<html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
            </head>
            <body style="margin: 20; padding: 32;" >
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="50%">
            <tr>
            <td>
                <table border="0" width="800" height="150px">
                <tr bgcolor="#2C2F33">
                    
                    <td align="center" style="margin-top: 2pc;display: block;font-size: 3pc;">
                        <div>
                            <strong style="color: white;">Work4thenoob</strong>
                        <div>
                        <!--<img src="" alt="" width="360" height="120" style="display: block;">-->
                    </td>
                
                    
                    <td align="right" bgcolor=' . $board[0][0] . ' style="width:20%; text-align:center; color:white; font-size:18px; border-left:solid 5px white;">
                        ' . $urgencia . '
                    </td>
                </tr>
                <tr> 
                    </td>
                    </tr>
                    </td>
                    
                    <td align="center" bgcolor="#ffffff" colspan="2" style="padding: 0px 30px 10px 30px;">
                        <tr><td>Tarefa atribuída por <strong>' . $board[0][12] . '</strong></td><tr>
                        <hr style="border-top: 1px solid #a2a0a0 !important">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:16px">
                        <tr>
                        <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                            <td width="260" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                <td>
                                <strong>Descrição:</strong>
                                
                                    ' . $descricao . '
                                
                                 </td>
                                </tr>
                            </table>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20">
                            &nbsp;
                            </td>
                        </tr>
                        <tr>';

            if ($emailArray[$x][3] == 1) {
                $message .= '<td style="padding: 20px 0 2px 0;width: 100%;">
                <hr style="border-top: 1px solid #a2a0a0 !important">

                
                <table align="center" width="100%"  height="50px"  style="border: 0px solid black;">
                            <thead>
                                
                                    ' . $menu . '
                                
                            </thead>
                            <tbody>
                                <tr>
                                    ' . $menuContent . '
                                </tr>
                            </tbody>
                        </table>
                </td>
                </tr>';
            }

            if ($emailArray[$x][4] == 1) {
                $message .= '<hr style="border-top: 1px solid #a2a0a0 !important;display:' . $hrEstiloPagamento . '"> 
                <tr>
                <td style="padding: 0px 0 0px 0;display:' . $estiloPagamento . '">

                <table width="100%"  height="50px"  style="border: 0px solid black;">
                    <thead>
                        
                            ' . $menuPagamentos . '
                        
                    </thead>
                    <tbody>
                        <tr>
                            ' . $menuPagamentosContent . '
                        </tr>
                    </tbody>
                </table>';
            }

            if ($emailArray[$x][2] == 1) {
                $message .= '</td>
                </tr><hr style="border-top: 1px solid #a2a0a0 !important;display:' . $commentAndPagamento . '">
                <td style="padding: 0px 0 0px 0;"> 
                </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" height="50px" style="display:' . $estiloCommentarios . '">
                            <tr>
                                <table>
                                    <td text-align="left" style="width="20%">Comentários:</td>
                                    <td text-align="left" width="80%">
                                    </td>
                                </table>
                            </tr>
                            <tr>
                                <td align="center" style="width:100%">
                                    <table width="100%">	
                                        ' . $comentarios . '
                                    </table>
                                </td>
                            </tr>
                        </table>
                
                
                ';
            }


            $message .= '</td></td><tr>
                            <td align="center" style="padding: 10px 15px;">
                                Faça <a href="localhost/pap">login</a> para ver a terafa!
                            </td>
                        </tr>
                        <tr>
                        <td align="center" bgcolor="#2C2F33" style="padding: 20px 30px;width:100%">
                            <table width="100%">
                            <tr width="100%">
                                <td style="text-align:center;" colspan="3">
                                    <b style="color:white;" > Work4thenoob - Gestor de tarefas</b>
                                </td>
                            </tr>
                            <!--<tr width="50%">
                                <td align="right">
                                    <img src="" alt="" width="90" height="30">
                                </td>
                                <td width="110" align="center">
                                <img src="" alt="" width="90" height="30">
                                </td>
                                <td align="left">
                                <img src="" alt="" width="90" height="30"> 
                                </td>
                            </tr>-->
                            </table>
                        </td>
                    </tr>
                    </table>
                </<tr>
                </tr>
                </table>
                </body>
                </html>';



            /*$message = '
            <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
            </head>
            <body style="margin: 20; padding: 32;" >
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="50%">
            <tr>
            <td>
                <table border="0" width="800" height="150px">
                <tr bgcolor="#2C2F33">
                    
                    <td align="center" style="margin-top: 2pc;display: block;font-size: 3pc;">
                        <div>
                            <strong style="color: white;">Work4thenoob</strong>
                        <div>
                        <!--<img src="" alt="" width="360" height="120" style="display: block;">-->
                    </td>
                
                    
                    <td align="right" bgcolor='.$board[0][0].' style="width:20%; text-align:center; color:white; font-size:18px; border-left:solid 5px white;">
                        '.$urgencia.'
                    </td>
                </tr>
                <tr> 
                    </td>
                    </tr>
                    </td>
                    
                    <td align="center" bgcolor="#ffffff" colspan="2" style="padding: 0px 30px 10px 30px;">
                        <tr><td>Tarefa atribuída por <strong>'.$board[0][12].'</strong></td><tr>
                        <hr style="border-top: 1px solid #a2a0a0 !important">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:16px">
                        <tr>
                        <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                            <td width="260" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                <td>
                                <strong>Descrição:</strong>
                                
                                    '.$descricao.'
                                
                                 </td>
                                </tr>
                            </table>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20">
                            &nbsp;
                            </td>
                        </tr>
                        <tr>
                        <td style="padding: 20px 0 2px 0;width: 100%;">
                        <hr style="border-top: 1px solid #a2a0a0 !important">

                        
                        <table align="center" width="100%"  height="50px"  style="border: 0px solid black;">
                                    <thead>
                                        
                                            '.$menu.'
                                        
                                    </thead>
                                    <tbody>
                                        <tr>
                                            '.$menuContent.'
                                        </tr>
                                    </tbody>
                                </table>
                        </td>
                        </tr>
                        <hr style="border-top: 1px solid #a2a0a0 !important;display:'.$hrEstiloPagamento.'"> 
                        <tr>
                        <td style="padding: 0px 0 0px 0;display:'.$estiloPagamento.'">

                        <table width="100%"  height="50px"  style="border: 0px solid black;">
                            <thead>
                                
                                    '.$menuPagamentos.'
                                
                            </thead>
                            <tbody>
                                <tr>
                                    '.$menuPagamentosContent.'
                                </tr>
                            </tbody>
                        </table>

                        </td>
                        </tr<hr style="border-top: 1px solid #a2a0a0 !important;display:'.$commentAndPagamento.'">
                        <td style="padding: 0px 0 0px 0;">

                        
                        </td>
                        </tr>

                        <tr>
                            <td>
                                <table width="100%" height="50px" style="display:'.$estiloCommentarios.'">
                                    <tr>
                                        <table>
                                            <td text-align="left" style="width="20%">Comentários:</td>
                                            <td text-align="left" width="80%">
                                            </td>
                                        </table>
                                    </tr>
                                    <tr>
                                        <td align="center" style="width:100%">
                                            <table width="100%">	
                                                '.$comentarios.'
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            
                    </table>
                    </td>
                    </td>
                    <tr>
                        <td align="center" style="padding: 10px 15px;">
                            Faça <a href="localhost/pap">login</a> para ver a terafa!
                        </td>
                    </tr>
                    <tr>
                    <td align="center" bgcolor="#2C2F33" style="padding: 20px 30px;width:100%">
                        <table width="100%">
                        <tr width="100%">
                            <td style="text-align:center;" colspan="3">
                                <b style="color:white;" > Work4thenoob - Gestor de tarefas</b>
                            </td>
                        </tr>
                        <!--<tr width="50%">
                            <td align="right">
                                <img src="" alt="" width="90" height="30">
                            </td>
                            <td width="110" align="center">
                            <img src="" alt="" width="90" height="30">
                            </td>
                            <td align="left">
                            <img src="" alt="" width="90" height="30"> 
                            </td>
                        </tr>-->
                        </table>
                    </td>
                </tr>
                </table>
            </<tr>
            </tr>
            </table>
            </body>
            </html>
            ';*/

            $mailDestino = $emailArray[$x][0];
            $nome = $emailArray[$x][1];
            $mensagem = $message;
            $assunto = $subject;
            include("../assets/phpmailer/envio.php");
        }

        echo json_encode(1);
    } else {
        echo json_encode(0);
    }
} else {
    header('location: ../assets/logout.php');
}
