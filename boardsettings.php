<?php
//Verifica se não existente uma sessão criada, se não, direciona para o login.php
session_start();

if (!isset($_SESSION['estado_login'])) {
	header('location: login');
	exit();
} elseif ($_SESSION['estado_boardsettings'] != 1) {
	header('location: index');
} elseif (isset($_POST['editarAccount'])  && $_POST['editarAccount'] == 1) {
	include_once('bd/bd.php');

	$id = $_SESSION['user_id'];
	$utilizador = $conn->real_escape_string($_POST['utilizadorPHP']);
	$email = $conn->real_escape_string($_POST['emailPHP']);

	$sql = "UPDATE login_users
				SET user_username = '$utilizador', user_email = '$email'
				WHERE user_id = '$id'";

	$update = mysqli_query($conn, $sql) or die(mysqli_error($conn));

	if (mysqli_affected_rows($conn) == 1) {
		$_SESSION['user_username'] = $utilizador;
		$_SESSION['user_email'] = $email;
		exit('OK!');
	} else {
		exit('ERROR!');
	}
} elseif (isset($_POST['clickBoard']) && $_POST['clickBoard'] == 1) {
	$_SESSION['estado_boardsettings'] = 0;
	$_SESSION['estado_boardclick'] = 1;

	exit('board?id=' . $_POST['idBoardClick']);
} else {
	include_once('bd/bd.php');

	$idIMG = $_SESSION['user_id'];
	$emailIMG = $_SESSION['user_email'];

	$sql = "SELECT user_imageurl FROM login_users WHERE user_email = '$emailIMG' AND user_id = '$idIMG'";
	$result = mysqli_query($conn, $sql);

	if ($row_cnt = $result->num_rows) {
		while ($row = mysqli_fetch_row($result)) {
			$urlperfilimagem = $row[0];
		}
		if (empty($urlperfilimagem)) {
			$urlperfilimagem = 'img/boardsettings/perfilDefault.jpg';
		}
	} else { //se não apresenta só esta menssagem
		echo '';
	}

	if ($_SESSION['estado_darkmode'] == 1) {
		$sql = "UPDATE login_users
					SET darkmode = '1'
					WHERE user_id = '$idIMG'";

		$update = mysqli_query($conn, $sql) or die(mysqli_error($conn));

		$darkmode = 'darkmode';
		$tipoDark = 'dark';
	} else {
		$sql = "SELECT darkmode FROM login_users WHERE user_id = '$idIMG'";
		$result = mysqli_query($conn, $sql);

		if ($row_cnt = $result->num_rows) {
			while ($row = mysqli_fetch_row($result)) {
				$darkmodenum = $row[0];
			}
			if ($darkmodenum == 1) {
				$darkmode = 'darkmode';
				$tipoDark = 'dark';
				$_SESSION['estado_darkmode'] = 1;
			} else {
				$darkmode = '';
				$tipoDark = 'light';
				$_SESSION['estado_darkmode'] = 0;
			}
		} else { //se não apresenta só esta menssagem
			echo 'ERROR!';
		}
	}

	//ip address info

	/*$host = gethostname();
		$ip = gethostbyname($host);
		echo $ip.'<br>'; 
		echo get_IP_address();*/
}
?>

<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="assets/css/boardsettings/main.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
	<link rel="stylesheet" href="assets/css/boardsettings/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/boardsettings/jquery-hex-colorpicker.css" />
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="assets/script/notifications/toastr.min.css">
	<title>Gestor de Boards - Work4theNoob</title>
</head>

<body class="body-class <?= $darkmode; ?>">

	<nav class="navbar navbar-expand-lg navbar-<?= $tipoDark ?> bg-<?= $tipoDark ?> changeDarkmode selectDesactive">
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="menu">
			<div>
				<div class="ml-1"><a>Work4theNoob</a></div>
				<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
					<li class="nav-item">
						<a class="nav-link" id="board" style="color: #008ce3;">Board</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="account">Conta</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="friend">Amigos</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" id="definition">Definições</a>
					</li>
					<li class="nav-item logout">
						<a class="nav-link text-danger" id="definition">Terminar sessão</a>
					</li>
				</ul>
			</div>
			<div class="navbar-collapse rightMenu" id="menu">
				<a class="mr-2">
					<hr class="hrVertical"></a>
				<li class="nav-item">
					<div id="darkmodecss">
						<i class="fas fa-adjust fa-sm" id="darkmodeID" style="background-color:<?= ($darkmode == '') ? $darkmode : '#343a40' ?>"></i>
						<img id="imgEstilo" src="<?= $urlperfilimagem ?>" alt="Pedimos desculpa pelo o erro">
					</div>
				</li>
			</div>
		</div>
	</nav>



	<div class="container" id="boardDIV">
		<div>
			<h1 class="marginName">Boards</h1>
		</div>
		<!--<hr class="hr">-->
		<div class="container">
			<div class="row addBoardRow" style="justify-content: center;align-items: center;padding-left: 4pc;padding-right: 4pc;">
				<?php

				$id = $_SESSION['user_id'];
				//$sql = "SELECT A.nomeboard, A.cor, A.imagem, A.id_boarduser FROM boarduser AS A, boardusers AS B WHERE A.id_boarduser = B.id_board AND B.id_user = '$id'";
				$sql = "SELECT A.nomeboard, A.cor, A.id_boarduser, D.boardop1, D.boardop2, D.boardop3, D.boardop4 FROM boarduser AS A, boardusers AS B, boardpermissoesusers AS C, boardpermissoes AS D WHERE A.id_boarduser = B.id_board AND B.id_user = '$id' AND C.id_boarduser = B.id_board AND C.id_user = B.id_user AND C.id_boardpermissiao = D.id";
				//comparação da base de dados com os campos
				mysqli_set_charset($conn, "utf8");
				$result = mysqli_query($conn, $sql);

				if ($row_cnt = $result->num_rows) {
					while ($row = mysqli_fetch_row($result)) {
						$nomeboard = $row[0];
						$corboard = $row[1];
						$idboard = $row[2];
						$showMenuOp = '';
						($row[3] == 1 && $row[4] == 1 && $row[5] == 1 && $row[6] == 1) ? $showMenuOp = '<div id="takeValue" class="divBoardOption selectDesactive" style="cursor:pointer"><i class="far fa-edit editBoard opacityFA mr-1" data-toggle="modal" data-target="#modalEditBoard"></i><i class="far fa-trash-alt opacityFA removeBoard"></i></div>' : '';
						echo '<div class="card cardBoard mr-1 mt-2 ml-1" style="background-color:' . $corboard . '">
									<div class="card-body card-for-board-body" data-id="' . $idboard . '">
										<div class="clickBoardRedirect" style="height: 90%;cursor:pointer">
											<div class="card-title selectDesactive" id="nomeBoard">' . $nomeboard . '</div>
										</div>
										' . $showMenuOp . '
									</div>
								</div>';
					}
				}
				?>

				<div id="middleADD" class="col-2 middleADD mr-1 mt-2 ml-1" data-toggle="modal" data-target="#addBoardModal">
					<i class="fa fa-plus-circle addboard fa-5x"></i>
				</div>
			</div>
		</div>
	</div>
	<div class="container" id="definitionDIV" style="display: none;">
		<div>
			<h1 class="marginName">Definições</h1>
		</div>
		<div class="divMargin">
			<div class="mb-2">
				<a class="h3" style="color: #0074BF">Navegação</a>
			</div>
			<div class="custom-control custom-switch">
				<input type="checkbox" class="custom-control-input" id="switchesHelpMod">
				<label title="Ao clicar ativará o modo ajuda" class="custom-control-label" for="switchesHelpMod">Modo ajuda</label>
			</div>
		</div>
	</div>
	<div class="container body-class <?= $darkmode; ?>" id="accountDIV" style="display: none;">
		<div>
			<h1 class="marginName">Conta</h1>
		</div>
		<div class="divProfile row">
			<div class="col-md-12 d-flex justify-content-end align-items-center">
				<button class="btn btn-success ativarFormulario" data-toggle="modal" data-target="#formAccountPassowrd">Ativar formulário</button>
			</div>
			<img id="imgEstiloConta" src="<?= $urlperfilimagem ?>" alt="Pedimos desculpa pelo o erro">
			<form class="col-md-12 d-flex justify-content-center align-items-center mt-2 ml-1" method="POST" enctype="multipart/form-data">
				<input class="btn btn-primary" id="file" name="file" type="file" style="display: none;" disabled>
				<div class="d-flex justify-content-center align-items-center mr-2 mt-1 mb-4">
					<input class="btn btn-primary" id="guardarIMG" type="submit" value="Alterar imagem" disabled>
				</div>
			</form>
			<form id="accountForm">
				<div class="container">
					<div class="row">
						<div class="form-group col-md-6">
							<label for="staticEmail" class="col-form-label">Utilizador</label>
							<input type="text" class="form-control" name="utilizador" disabled>
						</div>
						<div class="form-group col-md-6">
							<label for="staticEmail" class="col-form-label">Email</label>
							<input type="text" class="form-control" name="email" disabled>
						</div>
						<div class="form-group col-md-6">
							<label for="staticEmail" class="col-form-label">Primeiro nome</label>
							<input type="text" class="form-control" name="pnome" disabled>
						</div>
						<div class="form-group col-md-6">
							<label for="staticEmail" class="col-form-label">Último nome</label>
							<input type="text" class="form-control" name="lnome" disabled>
						</div>
						<div class="col-md-12 d-flex justify-content-center align-items-center">
							<button class="btn btn-primary" data-toggle="modal" data-target="#formchangepasswordmodal">Alterar palavra-passe</button>
						</div>
					</div>
				</div>
			</form>
		</div>
		<!--<hr class="hr">-->
	</div>

	<div class="container" id="friendDIV" style="display: none;">
		<?php
		$sql = "SELECT B.user_username, B.user_email, B.user_imageurl, B.user_id FROM listadeamigos AS A, login_users AS B WHERE A.id_userprinc = '$id' AND A.pedamistatus = 1 AND A.id_userfriend = B.user_id";
		mysqli_set_charset($conn, "utf8");
		$result = mysqli_query($conn, $sql);

		if ($row_cnt = $result->num_rows) {
			echo '<div><div><h1 id="contaName">Pedidos de amizade</h1></div><!--<hr class="hr">--><div>';
			while ($row = mysqli_fetch_row($result)) {
				echo '
						<div class="flex-row d-flex align-items-center justify-content-center mb-2" style="display: flex;">
							<div class="col-md-4 card body-class ' . $darkmode . '" style="padding: 6px; display: contents;" data-index="' . $row[3] . '">
								<img class="card-img-top mr-2" src="' . $row[2] . '" title="Email: ' . $row[1] . ' | Utilizador: ' . $row[0] . '" alt="Pedimos desculpa pelo o erro" style="height: 40px;width: 40px;display: block;object-fit: cover;border-radius: 100px;cursor: pointer;">
								<button class="btn btn-success mr-2 aceitarPedidoDeAmizade">Aceitar pedido</button>
								<button class="btn btn-danger cancelarPedidoDeAmizade">Cancelar</button>
							</div>
						</div>
					</div></div>';
			}
		}


		?>

		<div>
			<h1 class="marginName">Gestor de amizades</h1>
		</div>
		<!--<hr class="hr">-->
		<button type="button" class="btn btn-primary btn-lg btn-block adicionarAmigoModal" data-toggle="modal" data-target="#modalFriendAdd">Adicionar amigos</button>
		<div class="container">
			<div class="row cardShowFriendRow">
				<?php

				$sql = "SELECT B.user_username, B.user_email, B.user_imageurl, B.user_id FROM listadeamigos AS A, login_users AS B WHERE A.id_userprinc = '$id' AND A.id_userfriend = B.user_id AND A.friend = 1";
				mysqli_set_charset($conn, "utf8");
				$result = mysqli_query($conn, $sql);

				if ($row_cnt = $result->num_rows) {
					while ($row = mysqli_fetch_row($result)) {
						echo '<div class="col-sm mt-2">
								<div class="card cardfriend body-class ' . $darkmode . '">
									<img class="card-img-top pedidoamizadeRemoveFromSearch" src="' . $row[2] . '" alt="Pedimos desculpa pelo o erro" style="max-width: 12pc;max-height: 12pc;">
									<div class="card-body">
										<h5 class="card-title">' . $row[0] . '</h5>
										<p class="card-text">Email: ' . $row[1] . '</a>
									</div>
									<a href="#" class="btn btn-danger removerAmizade" data-index="' . $row[3] . '" style="margin: 6px;">Remover amizade</a>
								</div>
							</div>';
					}
				}
				?>
			</div>
		</div>
	</div>
	</div>

	</div>

	<!-- Add Board -->
	<div class="modal fade" id="addBoardModal" tabindex="-1" role="dialog" aria-labelledby="addBoardModal" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content body-class <?= $darkmode; ?>">
				<div class="modal-header">
					<h5 class="modal-title" id="addBoardModalTitle">Criar Board</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">

					<input type="text" class="form-control" name="boardName" maxlength="47" placeholder="Nome para a/o board/projeto">


					<div class="divModal">
						Estilo da Board
					</div>
					<input type="text" class="form-control" id="color-picker2" placeholder="A sua cor">

					<div class="divModal">Adicionar membros</div>

					<div class="row">
						<?php

						$sql = "SELECT B.user_username, B.user_email, B.user_imageurl, B.user_id FROM listadeamigos AS A, login_users AS B WHERE A.id_userprinc = '$id' AND A.id_userfriend = B.user_id AND A.friend = 1";

						$result = mysqli_query($conn, $sql);

						if ($row_cnt = $result->num_rows) {
							while ($row = mysqli_fetch_row($result)) {
								if (!empty($row[2])) {
									echo '<div class="col-1 hoverPerfil" style="margin-right:6px"><img src="' . $row[2] . '" class="checkBoardAdd" style="height: 40px;width: 40px;border-radius:50%;object-fit: cover;" data-index="' . $row[3] . '" title="Utilizador: ' . $row[0] . ' | Email: ' . $row[1] . '" alt="Pedimos desculpa pelo o erro"><span><i class="fas fa-check" style="display:none"></i></span></div>';
								} else {
									echo '<div class="col-1 hoverPerfil" style="margin-right:6px"><img src="img/boardsettings/defaultboard.jpg" class="checkBoardAdd" style="height: 40px;width: 40px;border-radius:50%;object-fit: cover;" data-index="' . $row[3] . '" title="Utilizador: ' . $row[0] . ' | Email: ' . $row[1] . '" alt="Pedimos desculpa pelo o erro"><span><i class="fas fa-check" style="display:none"></i></span></div>';
								}
							}
						} else { //se não apresenta só esta menssagem

						}
						?>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeboardadd">Fechar</button>
					<button type="button" class="btn btn-primary" id="submeterboardadd">Criar Board</button>
				</div>
			</div>
		</div>
	</div>


	<input type="hidden" name="darkmode" value="<?= $_SESSION['estado_darkmode']; ?>">
	<input type="hidden" name="modoajuda" value="<?= $_SESSION['estado_modoajuda']; ?>">

	<!-- Modal Add friend -->
	<div class="modal fade" id="modalFriendAdd" tabindex="-1" role="dialog" aria-labelledby="modalFriendAdd" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content body-class <?= $darkmode; ?>">
				<div class="modal-header">
					<h5 class="modal-title" id="modalFriendAdd">Adicionar amigo</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">

					<div align="center">
						<input type="text" name="search" id="search" placeholder="Procurar amigos - Email" class="form-control focusInputFriend" />
					</div>
					<div id="mensagemfriend"></div>


				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary btnClose" data-dismiss="modal">Fechar</button>
					<button type="button" class="btn btn-primary" id="addNewAmigo">Enviar pedido de amizade</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Edit Board -->
	<div class="modal fade" id="modalEditBoard" tabindex="-1" role="dialog" aria-labelledby="modalEditBoard" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content body-class <?= $darkmode; ?>">
				<div class="modal-header">
					<h5 class="modal-title" id="modalEditBoardNameFriend">Editar Board - <a></a></h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body bodyCleanEditBoard">



					<input type="text" class="form-control boardNameEdit" name="boardNameEdit" maxlength="47" placeholder="Nome para a/o board/projeto">


					<div class="divModal">
						Estilo da Board
					</div>
					<input type="text" class="form-control" id="color-picker3" placeholder="Esolha a cor para a sua Board">

					<div class="divModal">Gestor de membros</div>

					<div class="row gestorMembrosRow"></div>

					<input type="hidden" name="idBoardEditFriend">


				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" id="submetereditBoardclose" data-dismiss="modal">Fechar</button>
					<button type="button" class="btn btn-primary" id="submetereditBoard">Editar Board</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal FORM ACTIVE -->
	<div class="modal fade" id="formAccountPassowrd" tabindex="-1" role="dialog" aria-labelledby="formAccountPassowrd" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content body-class <?= $darkmode; ?>">
				<div class="modal-header">
					<h5 class="modal-title" id="formAccountPassowrdTitle">Confirmar palavra-passe</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">

					<div class="container">
						<div class="row">
							<div class="form-group input-group col-md-12">
								<div class="input-group-prepend">
									<span class="input-group-text body-class <?= $darkmode; ?>"><i class="fa fa-lock" aria-hidden="true"></i></span>
								</div>
								<input type="password" class="form-control" name="passowordcurrentmodal" placeholder="Palavra-passe">
							</div>
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary btnClose" data-dismiss="modal">Fechar</button>
					<button type="button" class="btn btn-primary" id="confirmPasswordModal">Confirmar palavra-passe</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal PASSWORD CONFIRM FORM -->
	<div class="modal fade" id="formchangepasswordmodal" tabindex="-1" role="dialog" aria-labelledby="formchangepasswordmodal" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content body-class <?= $darkmode; ?>">
				<div class="modal-header">
					<h5 class="modal-title" id="formchangepasswordmodalTitle">Alterar palavra-passe</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">

					<div class="container">
						<div class="row">
							<div class="form-group input-group col-md-12">
								<div class="input-group-prepend">
									<span class="input-group-text body-class <?= $darkmode; ?>"><i class="fa fa-lock" aria-hidden="true"></i></span>
								</div>
								<input type="password" class="form-control" name="passowordcurrentmodalshow" placeholder="Palavra-passe atual">
							</div>
							<div class="form-group input-group col-md-12">
								<div class="input-group-prepend">
									<span class="input-group-text body-class <?= $darkmode; ?>"><i class="fa fa-lock" aria-hidden="true"></i></span>
								</div>
								<input type="password" class="form-control" name="passowordnewmodal" placeholder="Nova palavra-passe">
							</div>
							<div class="form-group input-group col-md-12">
								<div class="input-group-prepend">
									<span class="input-group-text body-class <?= $darkmode; ?>"><i class="fa fa-lock" aria-hidden="true"></i></span>
								</div>
								<input type="password" class="form-control" name="passowordnewconfirmmodal" placeholder="Confirmar nova palavra-passe">
							</div>
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary btnClose" data-dismiss="modal">Fechar</button>
					<button type="button" class="btn btn-primary" id="alterarPassword">Alterar palavra-passe</button>
				</div>
			</div>
		</div>
	</div>

	<!--------------------------------------------------------------------------->

	<script src="assets/script/jquery.min.js"></script>
	<script src="assets/script/jquery-ui.min.js"></script>

	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
	<script src="assets/script/boardsettings/script.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" crossorigin="anonymous"></script>
	<script src="assets/script/jquery-hex-colorpicker.min.js"></script>
	<script src="assets/script/notifications/toastr.min.js"></script>
</body>

</html>