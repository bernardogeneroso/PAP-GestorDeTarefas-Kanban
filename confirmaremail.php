<?php
if(!empty($_GET['h'])){
    include_once('bd/bd.php');
    $idGET = $_GET['h'];
    $horaLimite = '';
    date_default_timezone_set("Europe/Lisbon");
	$hora = date_create();
    $horatual = $hora->format('d-m-Y H:i');
    $datatual = $hora->format('d-m-Y');

    $sql = "SELECT user_statushoralimite FROM login_users WHERE SHA2(user_id, 512)='$idGET'";
    $result = mysqli_query($conn, $sql);
    if ($row_cnt = $result->num_rows) {
        while ($row = mysqli_fetch_row($result)) {
            $horaLimite = $row[0];
        }
        $horaLimiteData = substr($horaLimite,0,10);
        if($horaLimite >= $horatual){
            $conn->query("UPDATE login_users SET user_status='1', user_statushoralimite=NULL WHERE SHA2(user_id, 512)='$idGET'");

            if($conn->affected_rows != 0){
                $emailConfirmation = 'Email confirmado! Será redirecionado para a página de Login em 5 segundos';
            } else if($horaLimiteData != $datatual){
                header('location: login');
            } else {
                $emailConfirmation = 'Email inválido! Será redirecionado para a página de Login em 5 segundos';
            }
        } else {
            $emailConfirmation = 'Email inválido! Será redirecionado para a página de Login em 5 segundos';
        }
    } else {
        $emailConfirmation = 'Email inválido! Será redirecionado para a página de Login em 5 segundos';
    }
} else {
    header('location: login');
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="5;url=login"/>
    <title>Confirmar email - Work4theNoob</title>
    <style>
        @import url('https://fonts.googleapis.com/css?family=Montserrat');
        body  {
            background-color: #f2f2f2; /*#F9FAFC;*/
            font-family: 'Montserrat';
        }
        h1 {
            font-size: 6pc;
            margin-bottom: 1pc;
        }
        p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div>
        <div style="text-align:center;margin-top:15%;font-size:2pc">
            <h1>Work4thenoob</h1>
            <p><?= $emailConfirmation ?></p>
        </div>
    </div>
</body>
</html>