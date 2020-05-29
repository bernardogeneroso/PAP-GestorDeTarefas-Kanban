<?php
session_start();

//se já tiver login
if (isset($_SESSION['estado_login'])) {
	header('location: boardsettings');
	exit();
} else if (isset($_POST['login'])) { //se receber a confirmação 1 vai entrar e verififcar
	include_once('bd/bd.php'); //chamar a base de dados

	$email = $conn->real_escape_string($_POST['emailPHP']);
	$password = hash("sha512", $conn->real_escape_string($_POST['passwordPHP']));

	$sql = "SELECT user_status, user_username, user_id, user_email FROM login_users WHERE user_email = '$email' AND user_password = '$password'";

	//comparação da base de dados com os campos
	$result = mysqli_query($conn, $sql);

	if ($row_cnt = $result->num_rows) {
		while ($row = mysqli_fetch_row($result)) {
			if (intval($row[0]) === 0) {
				$send = array(0, '<p style="color: #FF7274">Confirme o seu email</p>');
				exit(json_encode($send));
			} else {
				$_SESSION['user_username'] = $row[1]; //no row vê o utilizador e coloco-o na sessão utilizador
				$_SESSION['user_id'] = $row[2];
				$_SESSION['user_email'] = $row[3];
				$_SESSION['estado_login'] = '1'; //aqui colocámos
				$_SESSION['estado_boardsettings'] = 1;
				$_SESSION['estado_darkmode'] = $_POST['darkmodePHP'];
				$_SESSION['ip_server'] = ($_SERVER['SERVER_ADDR']=='::1'?'127.0.0.1':$_SERVER['SERVER_ADDR']); 
				$send = array(2);
				exit(json_encode($send));
			}
		}
	} else { //se não apresenta só esta menssagem
		$send = array(0, '<p style="color: #FF7274">Login incorrecto</p>');
		exit(json_encode($send));
	}
} else if (isset($_POST['loginRegisto'])) {
	include_once('bd/bd.php'); //chamar a base de dados

	$utilizador = trim($conn->real_escape_string($_POST['utilizadorRegistoPHP']));
	$email = trim($conn->real_escape_string($_POST['emailRegistoPHP']));
	$password = hash("sha512", trim($conn->real_escape_string($_POST['passwordRegistoPHP'])));
	date_default_timezone_set("Europe/Lisbon");
	$hora = date_create();
	$horatual = $hora->format('d-m-Y H:i');
	$hora->modify('+1 hour');
	$horaSomada = $hora->format('d-m-Y H:i');

	$sql = "INSERT INTO login_users (user_email, user_username, user_password, user_statushoralimite) VALUES ('$email', '$utilizador', '$password', '$horaSomada')";

	if (mysqli_query($conn, $sql)) {
		include("assets/phpmailer/phpmailer/class.phpmailer.php"); 
		include("assets/phpmailer/phpmailer/class.smtp.php");

		$id = hash("sha512", $conn->insert_id);
		$link = "localhost/pap/confirmaremail?h=" . $id;
		$subject = "Work4theNoob - Confirme o seu email | " . $utilizador;

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
							<div>Olá <strong>' . $utilizador . '</strong>, agradecemos a sua escolha, esperamos que desfrute da nossa aplicação!</div>
							<div>Confirme este email até às ' . $horaSomada . '.</div>
							<br>
						</td>
					</tr>
					<td>
						<br>
						<div>Clique no link para confirmar o seu email: <a href="' . $link . '">Clique aqui!</div>
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
			$nome = $utilizador;	
			$mensagem = $message;
			$assunto = $subject;
			include("assets/phpmailer/envio.php");


		$send = array(2, '<p style="color: green">Confirme o seu email</p>');
		exit(json_encode($send));
	} else { //se não apresenta só esta menssagem
		$send = array(0, '<p style="color: #FF7274">Registo inválido</p>');
		exit(json_encode($send));
	}
}
?>

<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login - Work4theNoob</title>
	<link rel="stylesheet" href="assets/css/login/main.css">
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
	<link rel="stylesheet" type="text/css" href="assets/script/notifications/toastr.min.css">
	<!--<script src="https://kit.fontawesome.com/yourcode.js"></script>-->
</head>

<body class="body-class">
	<div class="login-pagina">
		<div class="form body-class">
			<h2>Work4theNoob</h2>
			<form class="form-login" method="POST" action="login.php">
				<div class="form-group mb-0">
					<span class="span_awesome">
						<i class="fa fa-envelope" aria-hidden="true"></i>
					</span>
					<input type="email" name="email" class="form-control-lg body-class" placeholder="Email">
				</div>
				<div class="form-group mb-2">
					<span class="span_awesome">
						<i class="fa fa-lock" aria-hidden="true"></i>
					</span>
					<input type="password" name="password" class="form-control-lg changetype body-class" placeholder="Palavra-passe">
					<span class="span_awesome_password input_password">
						<i class="fas fa-eye" aria-hidden="true"></i>
						<i class="fas fa-eye-slash" aria-hidden="true"></i>
					</span>
				</div>
				<span class="span_info" id="span-info-login"></span>
				<input type="button" class="btn btn-primary body-class" value="Login" id="login">
				<p class="mensagem">Não esta registado? <a href="#" class="clickAlteraForm" id="login-alteracao">Criar uma conta</a></p>
				<p class="mensagem">Alterar a senha/Esqueceu-se da senha? <a data-toggle="modal" data-target="#modalAlterarPassword">Clica aqui</a></p>
			</form>
			<form class="form-registar" method="POST" action="login.php">
				<div class="form-group mb-0">
					<span class="span_awesome">
						<i class="fa fa-user" aria-hidden="true"></i>
					</span>
					<input type="text" name="utilizador_registo" class="form-control-lg body-class" placeholder="Utilizador">
				</div>
				<div class="form-group mb-0">
					<span class="span_awesome">
						<i class="fa fa-envelope" aria-hidden="true"></i>
					</span>
					<input type="email" name="email_registo" class="form-control-lg body-class" placeholder="Email">
				</div>
				<div class="form-group mb-0">
					<span class="span_awesome">
						<i class="fa fa-lock" aria-hidden="true"></i>
					</span>
					<input type="password" name="password_registo" class="form-control-lg body-class changetype body-class" placeholder="Palavra-passe">
					<span class="span_awesome_password input_password_top">
						<i class="fa fa-eye" aria-hidden="true"></i>
						<i class="fa fa-eye-slash" aria-hidden="true" style="display: contents;"></i>
					</span>
				</div>
				<div class="form-group mb-0">
					<span class="span_awesome">
						<i class="fa fa-lock" aria-hidden="true"></i>
					</span>
					<input type="password" name="passwordconfirm_registo" class="form-control-lg body-class changetype body-class" placeholder="Repetir a palavra-passe">
					<span class="span_awesome_password input_password">
						<i class="fa fa-eye" aria-hidden="true"></i>
						<i class="fa fa-eye-slash" aria-hidden="true"></i>
					</span>
				</div>
				<span class="span_info" id="span-info-registar"></span>
				<input type="button" class="body-class" value="Criar conta" id="registar">
				<p class="mensagem">Já esta registado? <a href="#" class="clickAlteraForm" id="registar-alteracao">Login</a></p>
				<p class="mensagem">Alterar a senha/Esqueceu-se da senha? <a data-toggle="modal" data-target="#modalAlterarPassword">Clica aqui</a></p>
			</form>
		</div>
		<div id="darkmodecss">
			<i class="fas fa-adjust" id="darkmodeID"></i>
		</div>
		<div style="text-align: center;-webkit-margin-before-collapse: discard;padding-top: 20px;">
			<i class="fas fa-question" title="Modo ajuda" style="border: 4px solid #0074E1;border-radius: 20px;padding: 12px;color: #0074E1;cursor: pointer;"></i>
		</div>
	</div>

	<input type="hidden" name="darkmode" value="0">


	<!-- Modal Alterar PASSWORD -->
	<div class="modal fade" id="modalAlterarPassword" tabindex="-1" role="dialog" aria-labelledby="modalAlterarPasswordlabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content body-class">
				<div class="modal-header">
					<h5 class="modal-title" id="modalAlterarPasswordTitle">1º passo | Insira o seu email</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="exampleInputEmail1">Email</label>
						<input type="email" class="form-control" name="emailAlterarpass" placeholder="Insira o seu email">
					</div>
					<span id="mensagemAlterarSenha">

					</span>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
					<button type="button" class="btn btn-primary" id="continuarAlterarSenha">Continuar</button>
				</div>
			</div>
		</div>
	</div>



	<script src="assets/script/jquery.min.js"></script>
	<script src="assets/script/login/script.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script src="assets/script/notifications/toastr.min.js"></script>
</body>

</html>