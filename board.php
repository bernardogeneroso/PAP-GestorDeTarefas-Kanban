<?php
//Verifica se não existente uma sessão criada, se não, direciona para o login.php
session_start();

if (!isset($_SESSION['estado_login'])) {
  header('location: login');
  exit();
} elseif (isset($_GET['id'])) {
  $idBoard = $_GET['id'];
  $id = $_SESSION['user_id'];

  include_once('bd/bd.php');

  $sql = "SELECT A.id_boarduser, A.nomeboard FROM boarduser AS A, boardusers AS B WHERE A.id_boarduser = B.id_board AND B.id_user = '$id' AND A.id_boarduser = '$idBoard'";
  $result = mysqli_query($conn, $sql);

  if ($row_cnt = $result->num_rows) {
    while ($row = mysqli_fetch_row($result)) {
      $confirm = $row[0];
      $nomeboard = $row[1];
    }
  } elseif ($_SESSION['estado_boardsettings'] == 1) {
    $_SESSION['estado_boardsettings'] = 1;
    $_SESSION['estado_boardclick'] = 0;
    header('location: boardsettings');
  } else { //se não apresenta só esta menssagem
    $_SESSION['estado_boardsettings'] = 1;
    $_SESSION['estado_boardclick'] = 0;
    header('location: boardsettings');
  }

  $sql = "SELECT A.user_imageurl, A.user_username, A.user_email, A.user_id, B.tipo_trabalhador_depende FROM login_users AS A, boardgestorsalario AS B WHERE A.user_id = '$id' AND B.id_boarduser = '$idBoard' AND A.user_id = B.id_user";
  $result = mysqli_query($conn, $sql);

  if ($row_cnt = $result->num_rows) {
    while ($row = mysqli_fetch_row($result)) {
      $imgurlperfil = $row[0];
      $_SESSION['estilo_img'] = $row[0];
      $usernameperfil = $row[1];
      $emailperfil = $row[2];
      $user_id = $row[3];
      $_SESSION['user_tipotrabalho'] = $row[4];
      //echo $_SESSION['user_tipotrabalho'];
    }
    $_SESSION['user_board'] = $idBoard;
    
  } else { //se não apresenta só esta menssagem
    echo 'ERROR1';
  }

  $username = $_SESSION['user_username'];
  $board = $_SESSION['estado_boardclick'];

  if ($_SESSION['estado_darkmode'] == 1) {
    $sql = "UPDATE login_users
					SET darkmode = '1'
					WHERE user_id = '$id'";

    $update = mysqli_query($conn, $sql) or die(mysqli_error($conn));

    $darkmode = 'darkmode';
    $tipoDark = 'dark';
  } else {
    $sql = "SELECT darkmode FROM login_users WHERE user_id = '$id'";
    $result = mysqli_query($conn, $sql);

    if ($row_cnt = $result->num_rows) {
      while ($row = mysqli_fetch_row($result)) {
        $darkmodenum = $row[0];
      }
      if ($darkmodenum == 1) {
        $darkmode = 'darkmode';
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

  $sql = "SELECT B.boardop1, B.boardop2, B.boardop3, B.boardop4, B.boardop5, B.boardop6, B.boardop7, B.boardop8, B.boardop9, B.boardop10, B.boardop11, B.boardop12, B.boardop13, B.boardop14, B.boardop15, B.boardop16, B.boardop17 FROM boardpermissoesusers AS A, boardpermissoes AS B WHERE A.id_boarduser = '$idBoard' AND A.id_user = '$id' AND A.id_boardpermissiao = B.id";
  $result = mysqli_query($conn, $sql);

  if ($row_cnt = $result->num_rows) {
    while ($row = mysqli_fetch_row($result)) {
      $perms = array($row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7], $row[8], $row[9], $row[10], $row[11], $row[12], $row[13], $row[14], $row[15], $row[16]);
      $_SESSION['user_board_perms'] = $perms;
    }
  }

  //echo $_SESSION['ip_server'];
} else {
  $_SESSION['estado_boardsettings'] = 1;
  $_SESSION['estado_boardclick'] = 0;
  header('location: boardsettings');
}
//echo print_r($_SESSION);
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- CSS -->
  <link rel="stylesheet" href="assets/css/board/main.css">

  <!-- FontAwesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">

  <!-- BOOTSTRAP CSS -->
  <link rel="stylesheet" href="assets/css/boardsettings/bootstrap.min.css">

  <!-- Toastr Notificações -->
  <link rel="stylesheet" type="text/css" href="assets/script/notifications/toastr.min.css">

  <!-- Datatables CSS -->
  <link rel="stylesheet" type="text/css" href="assets/datatables/datatables.min.css" />

  <!-- --------------------------- -->

  <!-- jQuery -->
  <script src="assets/script/jquery.min.js"></script>
  <script src="assets/script/jquery-ui.min.js"></script>
  <script src="assets/script/jquery.ui.touch-punch.min.js"></script> <!-- Resolve Bug em dispositivos Android/IOS - Mover board -->

  <!--DROPZONE -->
  <script src="assets/fileuploader/jquery.dropzone.min.js" type="text/javascript"></script>

  <!-- FileUploader -->
  <script src="assets/fileuploader/vendor/jquery.ui.widget.js" type="text/javascript"></script>
  <script src="assets/fileuploader/jquery.iframe-transport.js" type="text/javascript"></script>
  <script src="assets/fileuploader/jquery.fileupload.js" type="text/javascript"></script>

  <!-- POPOVER -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.0.4/popper.js"></script>

  <!-- BOARD SCRIPT -->
  <script src="assets/script/board/script.js"></script>

  <!-- EASYTIMER -->
  <script src="assets/easytimer/easytimer.min.js"></script>

  <!-- BOOTSTRAP -->
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" crossorigin="anonymous"></script>

  <!-- NOFITICACOES -->
  <script src="assets/script/notifications/toastr.min.js"></script>

  <!-- DATATABLES -->
  <script src="https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/1.1.2/js/dataTables.buttons.min.js"></script>
  <script src="https://cdn.datatables.net/select/1.1.2/js/dataTables.select.min.js"></script>
  <script src="https://cdn.datatables.net/responsive/2.0.2/js/dataTables.responsive.min.js"></script>
  <!--<script src="assets/datatables/dataTables.altEditor.free.js"></script>-->
  <!--<script type="text/javascript" src="assets/datatablesTeste/ColVis.js"></script>-->

  <title><?= $nomeboard ?> - Work4theNoob</title>
</head>

<body class="body-class <?= $darkmode ?>">

  <nav class="navbar navbar-expand-lg navbar-<?= $tipoDark ?> bg-<?= $tipoDark ?> changeDarkmode selectDesactive">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="menu">
      <div>
        <div class="ml-1"><a>Work4theNoob</a> | <?= $nomeboard ?></div>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a class="nav-link" id="board" style="color: #008ce3;">Tarefas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="list">Sub-tarefas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="definition">Definições</a>
          </li>
        </ul>
      </div>
      <div class="navbar-collapse rightMenu" id="menu">

        <?php
        $sql = "SELECT B.user_username, B.user_email, B.user_imageurl, B.user_id FROM boardusers AS A, login_users AS B WHERE A.id_board = '$idBoard' AND A.id_user = B.user_id AND A.id_user <> '$id'";
        $result = mysqli_query($conn, $sql);

        if ($row_cnt = $result->num_rows) {
          while ($row = mysqli_fetch_row($result)) {
            if (!empty($row[2])) {
              echo '<a class="mr-1"><img id="imgEstiloConta" class="topMenuImgUsers" data-id-user-top="' . $row[3] . '" src="' . $row[2] . '" title="Utilizador: ' . $row[0] . ' | Email: ' . $row[1] . '" alt="Pedimos desculpa pelo o erro"></a>';
            } else {
              echo '<a class="mr-1"><img id="imgEstiloConta" class="topMenuImgUsers" data-id-user-top="' . $row[3] . '" src="img/boardsettings/defaultboard.jpg" title="Utilizador: ' . $row[0] . ' | Email: ' . $row[1] . '" alt="Pedimos desculpa pelo o erro"></a>';
            }
          }
        }
        ?>

        <a class="mr-2">
          <hr class="hrVertical"></a>
        <li id="adjustMenuTOPTime" class="menuRight floatRight infoActive badge badge-info text-wrap text-white ml-2 mr-2 playTimeTopMenu" style="display:none"><a class="active" style="padding: 6px;">
            <bname></bname> | Tempo: <time></time> <i class="fas fa-pause ml-1 playTimeBoardTopMenuPause"></i>
          </a></li>
        <div class="dropdown">
          <img class="imgEstiloConta perfilContaTopMenu dropdown-toggle imgEstiloConta" id="menuTopDropdown" src="<?= $imgurlperfil; ?>" data-index="<?= $user_id ?>" data-imageurl="<?= $imgurlperfil; ?>" title="Utilizador: <?= $usernameperfil ?> | Email: <?= $emailperfil ?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="menuTopDropdown">
            <button class="dropdown-item" type="button" onclick="window.location.href='boardsettings'">Gestor de Boards</button>
            <button class="dropdown-item text-danger" type="button" onclick="window.location.href='assets/logout'">Terminar sessão</button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div id="error"></div>

  <div id="listatarefaDIV" class="container" style="display: none">
      
  </div>

  <div id="boardDIV" style="display: block;">
    <div class="lists" style="<?= (empty($darkmode))?:'opacity:0.9;'; ?>">
    <?php
      $sql = "SELECT B.id_board, C.user_username, C.user_email, C.user_imageurl, B.id_user FROM board AS A, boardprofileassociacao AS B, login_users AS C WHERE A.id_board = '$idBoard' AND B.id_boarduser = '$idBoard' AND A.id_board = B.id_boarduser AND A.id = B.id_board AND B.id_user = C.user_id ORDER BY B.id_board";
      $result = mysqli_query($conn, $sql);
      $dataTarefaAssociation = array();
      $ordemAssociation = array();
      if ($row_cnt = $result->num_rows) {
          while ($row = mysqli_fetch_row($result)) {
              array_push($dataTarefaAssociation, [$row[0], $row[1], $row[2], $row[3]]);
              array_push($ordemAssociation, $row[4]);
          }
      }
      $sql = "SELECT id, id_categoria, id_position, nomeboard, prioridade, descricao FROM `board` WHERE id_board = '$idBoard' ORDER BY id_categoria, id_position";
      $result = mysqli_query($conn, $sql);
      $dataBoard = array();
      $countValue = 1;
      $cancelOpacity = '';
      if ($_SESSION['user_board_perms'][11] == 0) {$cancel = 'ui-state-disabled';$cancelOpacity = 'opacity:0.5';}
      if ($row_cnt = $result->num_rows) {
          while ($row = mysqli_fetch_row($result)) {
              foreach ($row as $value) {
                  array_push($dataBoard, $value);
              }
          }

          $valueData = 0;$countValueMin = 0;$cancel = '';$boardedit = '';$iconshow = '';$apagarboard = '';
          if ($_SESSION['user_board_perms'][8] == 1) {$boardedit = '<button style="background-color:#ebecf0;border:#ebecf0;outline: none;padding: 0!important;"><i class="fas fa-edit opacityFA modalEditBoard" data-toggle="modal" data-target="#modalEditBoard"></i></button>';}
          if ($_SESSION['user_board_perms'][9] == 1) {$iconshow = '<i class="fas fa-play ml-2 playTimeBoard" style="display: flex;justify-content: center;align-items: center;margin-top: 2px;color: #696969;"></i>';}
          if ($_SESSION['user_board_perms'][10] == 1) {$apagarboard = '<button class="ml-1" style="background-color:#ebecf0;border:#ebecf0;outline: none;padding: 0 !important;"><i class="fas fa-trash opacityFA apagarBoard"></i></button>';}
          if ($_SESSION['user_board_perms'][11] == 0) {$cancel = 'ui-state-disabled';$cancelOpacity = 'opacity:0.5';}

          $sql = "SELECT nomeCategoria, countBoard, id FROM `boardcategoria` WHERE id_boarduser = '$idBoard'";
          $result = mysqli_query($conn, $sql);
          if ($row_cnt = $result->num_rows) {
              while ($row = mysqli_fetch_row($result)) {
                  echo '
                        <div class="list">
                        <div class="style_boards">
                            <div class="editBoardClick selectDesactive" data-board-categoria="' . $countValue . '" data-index="' . $row[2] . '">
                                <input class="inputEditNameBoard" value="' . $row[0] . '" maxlength="20" style="background-color: #ebecf0;width: 70%;margin-left: 6px;border: 0px solid #ebecf0;' . $cancelOpacity . '">
                                <button class="btnEditBoard" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-h"></i></button>
                                <div class="dropdown-menu" style="margin-top: -2px;">
                                <a class="dropdown-item AddBoardColuna" href="#"><i class="fas fa-plus spaceMenuFA"></i>Adicionar tarefa</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item alterarNomeColuna" href="#"><i class="fas fa-edit spaceMenuFA"></i>Alterar o nome da coluna</a>
                                <a class="dropdown-item apagarColuna" href="#"><i class="fas fa-trash spaceMenuFA"></i>Apagar</a>
                                </div>
                            </div>
                            <div id="sortable' . $countValue . '" class="droptrue" data-categoria="' . $row[2] . '">';
                  for ($n = 0; $n < $row[1]; $n++) {
                      echo '
                                <div class="ui-state-default selectDesactive ' . $cancel . '" data-index="' . $dataBoard[$valueData] . '" data-categoria="' . $dataBoard[$valueData + 1] . '" data-position="' . $dataBoard[$valueData + 2] . '" style="' . ((!empty($dataBoard[$valueData + 4])) ? 'border-left: solid 6px ' . $dataBoard[$valueData + 4] . ';' : '') . 'border-radius: 7px 7px 7px 7px;">
                                  <divs style="display: block;">
                                      <div class="clickActiveBoardEdit" style="display:inline-flex;">
                                          <span style="margin-left: 6px;" class="boardTakeName">' . $dataBoard[$valueData + 3] . '</span>
                                      </div>
                                      <div style="display: inline-flex;padding: 0;float: right;margin-right: 10px;margin-top: 8px;">
                                      ' . $boardedit . '
                                      ' . $apagarboard . '
                                      ' . $iconshow . '
                                      </div>
                                  </divs>';

                      $perfiltarefaboard = '';
                      for ($x = 0; $x < sizeof($dataTarefaAssociation); $x++) {
                          if (in_array($dataBoard[$valueData], $dataTarefaAssociation[$x])) {
                              $perfiltarefaboard = $perfiltarefaboard . '<img src="' . $dataTarefaAssociation[$x][3] . '" class="imgPerfilTarefa ml-1" data-index="' . $ordemAssociation[$x] . '" title="Utilizador: ' . $dataTarefaAssociation[$x][1] . ' | Email: ' . $dataTarefaAssociation[$x][2] . '" alt="Pedimos desculpa pelo o erro">';
                          }
                      }

                      if ($dataBoard[$valueData + 5] != '' || $dataBoard[$valueData + 5] != null) {
                          $first = 'flex';
                          $second = 'block';
                          $terceiro = 'none';
                          $descricao = $dataBoard[$valueData + 5];
                      } else {
                          $first = 'none';
                          $second = 'none !important';
                          $terceiro = 'none';
                          $descricao = '';
                      }

                      if ($perfiltarefaboard != '') {$first = 'flex';$terceiro = 'block';}
                      if ($second == 'none !important' && $terceiro == 'block') {$col = 'col-md-12';} else {$col = 'col-md-11';}

                      echo '
                          <div class="row imgBoardEditAddPerfils" data-index="' . $dataBoard[$valueData] . '" style="margin: 0;padding-top: 0;display:' . $first . ';">
                              <div class="col-md-1 estiloTarefaPerfilAndPlus clickActiveDescricaoBoard" style="margin: 0;padding-top: 0;display:' . $second . ';">
                                  <img class="imgPlusMinusBoard" src="img/board/descricao/plus.png">
                              </div>
                              <div class="' . $col . ' estiloTarefaPerfilAndPlus d-inline-flex justify-content-end" style="margin: 0;padding-top: 0;display:' . $terceiro . ';">
                                  ' . $perfiltarefaboard . '      
                              </div>
                          </div>
                          <div class="clickActiveDescricaoBoardAumentar mt-0" data-index="' . $dataBoard[$valueData] . '" style="font-size: 14px;margin: 0;display:none">
                              <a>' . $descricao . '</a>
                          </div>
                      </div>';
                      $valueData += 6;
                  }
                  echo '</div>
                          <div class="input-group addBoardColuna" data-categoria="' . $countValue . '" style="display: none;background-color:#224768;z-index: 100;">
                          <input type="text" name="enterAddBoardInColuna" maxlength="25" class="form-control">
                          <span class="input-group-btn">
                                  <button class="btn btn-success addBoardInColuna" style="margin-left:6px" type="button">Adicionar</button>
                          </span>
                          </div>
                        </div>
                        </div>
                        ';
                  $countValue += 1;
              } 
              echo '<div class="list">   
                      <div class="style_boards selectDesactive" style="padding: 6px;">
                          <div class="colunaStyle">
                              <span class="placeholder"><i class="fas fa-plus opacityFA"></i><span style="margin-left:3px;color:black" id="colunaName">Adicionar coluna</span></span>
                              <div class="input-group addNewColunaOpen" style="display: none;margin: 0;">
                                  <input type="text" name="addNewColunaOpenEnter" class="form-control">
                                  <span class="input-group-btn">
                                      <button class="btn btn-success addColuna" style="margin-left:6px" type="button">Adicionar</button>
                                  </span>
                              </div>
                          </div>
                      </div>
                  </div>';
          }
      } else { //se não apresenta só esta menssagem
          $sql = "SELECT nomeCategoria, countBoard, id FROM `boardcategoria` WHERE id_boarduser = '$idBoard'";
          $result = mysqli_query($conn, $sql);
          if ($row_cnt = $result->num_rows) {
              while ($row = mysqli_fetch_row($result)) {
                  echo '
                        <div class="list">
                          <div class="style_boards">
                              <div class="editBoardClick selectDesactive" data-board-categoria="' . $countValue . '" data-index="' . $row[2] . '">
                                  <input class="inputEditNameBoard" value="' . $row[0] . '" style="background-color: #ebecf0;border: solid #ebecf0;' . $cancelOpacity . '">
                                  <button class="btnEditBoard" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-h"></i></button>
                                  <div class="dropdown-menu" style="margin-top: -2px;">
                                  <a class="dropdown-item AddBoardColuna" href="#"><i class="fas fa-plus spaceMenuFA"></i>Adicionar tarefa</a>
                                  <div class="dropdown-divider"></div>
                                  <a class="dropdown-item alterarNomeColuna" href="#"><i class="fas fa-edit spaceMenuFA"></i>Alterar o nome da coluna</a>
                                  <a class="dropdown-item apagarColuna" href="#"><i class="fas fa-trash spaceMenuFA"></i>Apagar</a>
                                  <!--<div class="dropdown-divider"></div>
                                  <a class="dropdown-item" href="#">Separated link</a>-->
                                  </div>
                              </div>
                              <div id="sortable' . $countValue . '" class="droptrue" data-categoria="' . $row[2] . '"></div>
                              <div class="input-group addBoardColuna" data-categoria="' . $countValue . '" style="display: none;background-color:#224768;z-index: 100;">
                                  <input type="text" name="enterAddBoardInColuna" class="form-control">
                                  <span class="input-group-btn">
                                          <button class="btn btn-success addBoardInColuna" style="margin-left:6px" type="button">Adicionar</button>
                                  </span>
                              </div>
                          </div>
                        </div>
                        ';
                  $countValue += 1;
              }
          }
          echo '<div class="list">   
                  <div class="style_boards" style="padding: 6px;">
                  <div class="colunaStyle">
                      <span class="placeholder"><i class="fas fa-plus opacityFA"></i><span style="margin-left:3px;color:black" id="colunaName">Adicionar coluna</span></span>
                      <div class="input-group addNewColunaOpen" style="display: none;margin: 0;">
                      <input type="text" name="addNewColunaOpenEnter" class="form-control">
                      <span class="input-group-btn">
                              <button class="btn btn-success addColuna" style="margin-left:6px" type="button">Adicionar</button>
                      </span>
                      </div>
                  </div>
                  </div>
              </div>';
      }
      ?>
    </div>
  </div>

  <div id="definitionDIV" style="display: none;">

  </div>
  </div>

  <!-- Modal Add Sub-tarefa -->
  <div class="modal fade in bd-example-modal-lg" id="modalAddtarefa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content body-class <?= $darkmode ?>">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Adicionar Sub-tarefa</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="btnClose" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="task_title" class="form-control-label">Nome: *</label>
            <input name="tarefa_title" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="task_description" class="form-control-label">Descrição:</label>
            <textarea name="tarefa_description" class="form-control" maxlength="1200"></textarea>
          </div>
          <div class="form-group">
            <label for="task_vencimento" class="form-control-label">Data de Vencimento:</label>
            <div class="input-group mb-3">
              <input type='date' name="task_vencimento" class="form-control" />
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2"><i class="far fa-calendar-alt"></i></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5 form-group">
              <label for="tarefa_time_estimate" class="form-control-label">Tempo estimado (hh:mm):</label>
              <input name="tarefa_time_estimate" type="text" class="form-control" value="00:00">
            </div>

            <div class="col-md-2 form-group">
              <label for="task_color" class="form-control-label" style="display: flex;justify-content: center;align-items: center;">Prioridade:</label>
              <span class="btn-colorselector" id="colorselector" title="Escolha a cor/prioridade" data-toggle="modal" data-target="#modalColor" style="cursor: pointer;display: flex;width: 20px;height: 20px;  background-color: #DDD;vertical-align: middle;border-radius: 50%;margin-left: auto;margin-right: auto;"></span>
            </div>

            <div class="form-group col-md-5">
              <label for="inputState">Atribuir tarefa:</label>
              <select id="atribuirBoard" class="form-control">
              </select>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary" id="addTarefaModal">Adicionar</button>
        </div>
      </div>
    </div>
  </div>

<!-- Modal Edit tarefa -->
<div class="modal fade in bd-example-modal-lg" id="modalEdittarefa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content body-class <?= $darkmode ?>">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Editar Sub-tarefa</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="btnClose" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

        <input id="task_container" name="task_container" type="hidden" value="1">
          <div class="form-group">
            <label class="form-control-label">Nome: *</label>
            <input name="tarefa_title_edit" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="task_description" class="form-control-label">Descrição:</label>
            <textarea id="task_description_edit" name="tarefa_description" class="form-control" maxlength="1200"></textarea>
          </div>
          <div class="form-group">
            <label for="task_time_spent_edit" class="form-control-label">Data de Vencimento:</label>
            <div class="input-group mb-3">
              <input type='date' class="form-control" id="datepickerEDIT" />
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2"><i class="far fa-calendar-alt"></i></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5 form-group">
              <label for="tarefa_time_estimate" class="form-control-label">Tempo estimado (hh:mm):</label>
              <input name="tarefa_time_estimate_edit" type="text" class="task_time_estimate form-control" value="00:00">
            </div>

            <div class="col-md-2 form-group">
              <label for="task_color" class="form-control-label" style="display: flex;justify-content: center;align-items: center;">Prioridade:</label>
              <span class="btn-colorselector colorselectorEDIT" id="colorselector" title="Escolha a cor/prioridade" data-toggle="modal" data-target="#modalColor" style="cursor: pointer;display: flex;width: 20px;height: 20px;  background-color: #DDD;vertical-align: middle;border-radius: 50%;margin-left: auto;margin-right: auto;"></span>
            </div>

            <div class="form-group col-md-5">
              <label for="inputState">Tarefa atribuída:</label>
              <select id="atribuirBoardEdit" class="form-control">
              </select>
            </div>
          </div>

          <input type="hidden" name="indexTarefa">


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary" id="editTarefaModal">Guardar</button>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal Edit Board -->
  <div class="modal fade bd-example-modal-lg" id="modalEditBoard" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content body-class <?= $darkmode ?>">
        <div class="modal-header">
          <div class="row" style="width: 100%;">

            <div class="modal-title" style="width: auto;margin-left: 1pc;"><input class="form-control form-control moddal-title body-class <?= $darkmode ?>" id="addBoardName" maxlength="25" style="background-color: #fff;border: solid #fff;font-weight: bold;font-size: larger;"></div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="font-size: 2pc">&times;</span>
            </button>

            <div class="colunaEditBoard col-md-12 body-class <?= $darkmode ?>">está na coluna <a></a></div>
            <div class="atribuicaoEditBoard col-md-12 body-class <?= $darkmode ?>">tarefa criada por <a class="body-class <?= $darkmode ?>"></a></div>
          </div>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col-md-12 modaleditboard_menu">

            </div>
          </div>

          <input type="hidden" name="editBoardID">
          <input type="hidden" name="editBoardColunaID">
          <input type="hidden" name="editBoardColuna">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-danger" id="removerTarefaEditTarefa" data-dismiss="modal">Apagar tarefa</button>
          <button type="button" class="btn btn-primary" id="dataEncerramentoEditTarefa">Terminar tarefa</button>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal Add Board Membro -->
  <div class="modal fade" id="modalAddBoardMembro" tabindex="-1" role="dialog" aria-labelledby="modalAddBoardMembro" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content body-class <?= $darkmode ?>">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal Color -->
  <div class="modal fade" id="modalColor">
    <div class="modal-dialog modal-sm" style="margin-top: 15%;">
      <div class="modal-content body-class <?= $darkmode ?>" style="width: 80% !important;">
        <div class="modal-header">
          <h5 class="modal-title">Cor/prioridade</h5>
          <button id="closeCor" type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="popover-body">
            <span class="btn-colorselector-escolha color-red" title="Emergente"></span>
            <span class="btn-colorselector-escolha color-orange" title="Urgente"></span>
            <span class="btn-colorselector-escolha color-amarelo" title="Pouco Urgente"></span>
            <span class="btn-colorselector-escolha color-verde" title="Normal"></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal PDF VIEW -->
  <div class="modal fade" id="pdfmodal" tabindex="-1" role="dialog" aria-labelledby="pdfmodal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content body-class <?= $darkmode ?>">
        <div class="modal-header">
          <h5 class="modal-title" id="pdfmodaltitle">Gestor de PDF</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div id="pdfmodalVIEW" style="display:flex;justify-content:center;align-items:center"></div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeMODALpdf">Fechar</button>
          <a id="pdfmodalPDFtransferir" download><button class="btn btn-primary" style="width:100%;"><i class="fa fa-download mr-1"></i>Transferir</button></a>
          <button type="button" class="btn btn-danger" id="pdfmodalPDFdelete">Apagar PDF</button>
        </div>
      </div>
    </div>
  </div>

  <input type="hidden" name="darkmode" value="<?= $_SESSION['estado_darkmode']; ?>">
  <input type="hidden" name="modoajuda" value="<?= (isset($_SESSION['estado_modoajuda'])) ? $_SESSION['estado_modoajuda'] : '0'; ?>">

</body>

</html>