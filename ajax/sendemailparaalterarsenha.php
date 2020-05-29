<?php
if (isset($_POST['update']) && $_POST['update'] == 1) {
    include_once('../bd/bd.php');
    
    $email = trim($_POST['email']);
    $iduser = '';
    date_default_timezone_set("Europe/Lisbon");
	$hora = date_create();
	$horatual = $hora->format('d-m-Y H:i');
	$hora->modify('+1 hour');
    $horaSomada = $hora->format('d-m-Y H:i');
    
    $sql = "SELECT user_id FROM login_users WHERE user_email='$email'";
    $result = mysqli_query($conn, $sql);
    if ($row_cnt = $result->num_rows) {
        while ($row = mysqli_fetch_row($result)) {
            $iduser = $row[0];
        }
        $conn->query("UPDATE login_users SET user_statushoralimite='$horaSomada' WHERE user_id='$iduser'");

        $iduser = hash("sha512", $iduser);

        //email
        include("../assets/phpmailer/phpmailer/class.phpmailer.php"); 
		include("../assets/phpmailer/phpmailer/class.smtp.php"); 

        $link = "localhost/pap/alterarsenha?h=".$iduser;
        $subject = "Work4theNoob - Alterar a senha da conta";

        $message = '
            <html>
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			</head>
			<body style="margin: 20; padding: 32;" >
				<table align="center" border="0" cellpadding="0" cellspacing="0" width="50%">
                    <tr>
                        <td>
                            <table border="0" width="800" height="150px">
                                <tr bgcolor="#2C2F33">
                                    <td align="center" style="margin-top: 2pc;margin-bottom: 2pc;display: block;font-size: 3pc;">
                                        <div>
                                            <strong style="color: white;">Work4thenoob</strong>
                                        <div>
                                    </td>
                                </tr>
                        </td>
                    </tr>
                    <tr>
						<td>
							<br>
							<div>Neste momento tem até as '.$horaSomada.' para confirmar o email!</div>
							<br>
						</td>
					</tr>
					<td>
						<br>
						<div>Clique no link para alterar a sua senha: <a href="' . $link . '">Clique aqui!</div>
						<br>
					</td>
					<tr>
						<td align="center" bgcolor="#2C2F33" style="padding: 20px 30px;width:100%">
							<table width="100%">
								<tr width="100%">
									<td style="text-align:center;" colspan="3">
										<b style="color:white;" > Work4thenoob - Gestor de tarefas</b>
									</td>
								</tr>
							</table>
						</td>
					</tr>
						</table>
				</table>
			</body>
			</html>';


            $mailDestino = $email;
			$nome = 'Work4thenoob';	
			$mensagem = $message;
			$assunto = $subject;
			include("../assets/phpmailer/envio.php");
    }
} else {
    header('location: ../assets/logout.php');
}
