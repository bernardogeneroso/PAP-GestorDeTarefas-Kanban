<?php
session_start();
include_once('../../bd/bd.php');
$idBoard = $_SESSION['user_board'];
$id = $_SESSION['user_id'];
$darkmode = '';
if ($_SESSION['estado_darkmode'] != 1) {
  $darkmode = '';
} else {
  $darkmode = 'darkmode';
}
empty($_SESSION['user_board_perms']);
unset($_SESSION['user_board_perms']);
$sql = "SELECT B.boardop1, B.boardop2, B.boardop3, B.boardop4, B.boardop5, B.boardop6, B.boardop7, B.boardop8, B.boardop9, B.boardop10, B.boardop11, B.boardop12, B.boardop13, B.boardop14, B.boardop15, B.boardop16, B.boardop17 FROM boardpermissoesusers AS A, boardpermissoes AS B WHERE A.id_boarduser = '$idBoard' AND A.id_user = '$id' AND A.id_boardpermissiao = B.id";
$result = mysqli_query($conn, $sql);

if ($row_cnt = $result->num_rows) {
    while ($row = mysqli_fetch_row($result)) {
        $perms = array($row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7], $row[8], $row[9], $row[10], $row[11], $row[12], $row[13], $row[14], $row[15], $row[16]);
        $_SESSION['user_board_perms'] = $perms;
    }
}
if($_SESSION['user_board_perms'][13] == 1){$editmodalshow='data-toggle="modal" data-target="#modalEdittarefa"';$editmodaladd='data-toggle="modal" data-target="#modalAddtarefa"';}else{$editmodalshow='';$editmodaladd='';}
?>
<script>
  function saveNewPositions() {
    var positions = [];
    $('.updated').each(function() {
      positions.push([$(this).attr('data-index'), $(this).attr('data-position')]);
      $(this).removeClass('updated');
    });

    $.ajax({
      url: 'ajax/listatarefa',
      method: 'POST',
      dataType: 'text',
      data: {
        update: 1,
        positions: positions
      },
      success: function(data) {
        if (data == 0) {
          toastr["error"]('Não tem permissão para alterar a posição da sub-tarefa', "Error - Permissão");
        }
      }
    });
  }
  $('.addtarefa').sortable({
    cancel: ".ui-state-disabled",
    update: function(event, ui) {
      $(this).children().each(function(index) {
        if ($(this).attr('data-position') != (index + 1)) {
          $(this).attr('data-position', (index + 1)).addClass('updated');
        }
      });

      saveNewPositions();
    }
  });
  $('[data-toggle="popover"]').popover();
  //Prioridade
	$('#dropdownMenuButton').dblclick(function () {
		$('.color1class').filter('.color1class').css('display', 'table-row');
		$('.color2class').filter('.color2class').css('display', 'table-row');
		$('.color3class').filter('.color3class').css('display', 'table-row');
		$('.color4class').filter('.color4class').css('display', 'table-row');

		$('#color1classID').css('background-color', 'white');
		$('#color2classID').css('background-color', 'white');
		$('#color3classID').css('background-color', 'white');
		$('#color4classID').css('background-color', 'white');
	});

	$('#color1classID').click(function () {
		$(this).css('background-color', 'lightgray');
		$('#color2classID').css('background-color', 'white');
		$('#color3classID').css('background-color', 'white');
		$('#color4classID').css('background-color', 'white');

		$('.color2class').filter('.color2class').css('display', 'none');
		$('.color3class').filter('.color3class').css('display', 'none');
		$('.color4class').filter('.color4class').css('display', 'none');

		$('.color1class').filter('.color1class').css('display', 'table-row');
	});
	$('#color2classID').click(function () {
		$(this).css('background-color', 'lightgray');
		$('#color1classID').css('background-color', 'white');
		$('#color3classID').css('background-color', 'white');
		$('#color4classID').css('background-color', 'white');

		$('.color1class').filter('.color1class').css('display', 'none');
		$('.color3class').filter('.color3class').css('display', 'none');
		$('.color4class').filter('.color4class').css('display', 'none');

		$('.color2class').filter('.color2class').css('display', 'table-row');
	});
	$('#color3classID').click(function () {
		$(this).css('background-color', 'lightgray');
		$('#color1classID').css('background-color', 'white');
		$('#color2classID').css('background-color', 'white');
		$('#color4classID').css('background-color', 'white');

		$('.color1class').filter('.color1class').css('display', 'none');
		$('.color2class').filter('.color2class').css('display', 'none');
		$('.color4class').filter('.color4class').css('display', 'none');

		$('.color3class').filter('.color3class').css('display', 'table-row');
	});
	$('#color4classID').click(function () {
		$(this).css('background-color', 'lightgray');
		$('#color1classID').css('background-color', 'white');
		$('#color2classID').css('background-color', 'white');
		$('#color3classID').css('background-color', 'white');

		$('.color1class').filter('.color1class').css('display', 'none');
		$('.color2class').filter('.color2class').css('display', 'none');
		$('.color3class').filter('.color3class').css('display', 'none');

		$('.color4class').filter('.color4class').css('display', 'table-row');
	});
  //
  $('#table-call').DataTable({
    "order": [],
    "stateSave": false,
    "processing": true,
    "orderFixed": true,
    "bSortable": false,
    "autoWidth": true,
    "columnDefs": [{
      "targets": 'no-sort',
      "orderable": false
    }],
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Portuguese-Brasil.json'
    }
  });
  $("[aria-controls='table-call']").addClass('form-control');

  if($('input[name="modoajuda"]').val()==1){
    $('#clickAddTarefa').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode criar uma sub-tarefa, com várias tipos de opções').fadeOut("slow").fadeIn("slow");
		$('#descricaoEdit').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode ver a descrição da sub-tarefa').fadeOut("slow").fadeIn("slow");
		$('.modalEdittarefa').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode editar a sub-tarefa').fadeOut("slow").fadeIn("slow");
    $('.removeTarefa').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode apagar a sub-tarefa').fadeOut("slow").fadeIn("slow");
    $('.tableCharge').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode mover a sub-tarefa, para possição desejada').fadeOut("slow").fadeIn("slow");
  }
</script>
<div>
  <table class="table body-class <?= $darkmode ?>" id="table-call">
    <thead class="thead-inverse">
      <tr class="alignCenter">
        <th class="nomeTarefaStyle">Sub-tarefa</th>
        <th class="no-sort">Atribuiu</th>
        <th>Data de Vencimento</th>
        <th class="no-sort">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Prioridade
            </button>
            <div class="cssdropdownmenu dropdown-menu" id="cssdropdownmenu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" id="color1classID">
                <i class="fas fa-circle" style="color: #eb5a46;width: 100%;text-align: center;" title="Emergente"></i></a>
              <a class="dropdown-item" id="color2classID">
                <i class="fas fa-circle" style="color: #ff9f1a;width: 100%;text-align: center;" title="Urgente"></i></a>
              <a class="dropdown-item" id="color3classID">
                <i class="fas fa-circle" style="color: #f2d600;width: 100%;text-align: center;" title="Pouco urgente"></i></a>
              <a class="dropdown-item" id="color4classID">
                <i class="fas fa-circle" style="color: #519839;width: 100%;text-align: center;" title="Normal"></i></a>
            </div>
          </div>
        </th>
        <th class="nomeAcoesStyle no-sort">Ações</th>
      </tr>
    </thead>
    <tbody class="addtarefa">
      <?php

      if ($_SESSION['user_board_perms'][12] == 1) {
        $sql = "SELECT A.id_listatarefas, A.position, A.nomeTarefa, A.dataVencimento, A.prioridade, A.descricao, B.user_username, B.user_email,  B.user_imageurl FROM listatarefas AS A, login_users AS B WHERE A.id_board = '$idBoard' AND A.id_user = B.user_id ORDER BY position";

        $result = mysqli_query($conn, $sql);

        if ($row_cnt = $result->num_rows) {
          while ($row = mysqli_fetch_row($result)) {
            if ($row[4] == '#eb5a46') {
              $colorClass = 'color1class';
            } else if ($row[4] == '#ff9f1a') {
              $colorClass = 'color2class';
            } else if ($row[4] == '#f2d600') {
              $colorClass = 'color3class';
            } else if ($row[4] == '#519839') {
              $colorClass = 'color4class';
            } else {
              $colorClass = 'Sem cor';
            }

            ($row[3] == '') ? $dataVencimento = 'Sem dados' : $dataVencimento = $row[3];
            ($row[4] == '') ? $cor = 'rgb(221, 221, 221)' : $cor = $row[4];
            ($row[5] == '') ? $descricao = 'Sem descrição' : $descricao = $row[5];
            ($_SESSION['user_board_perms'][15] != 1) ? $cancel = 'ui-state-disabled' : $cancel = '';

            echo '
                          <tr data-index="' . $row[0] . '" data-position="' . $row[1] . '" data-order="' . $row[1] . '" class="' . $cancel . ' tableCharge ' . $colorClass . '">
                            <td><a id="nomeEdit">' . $row[2] . '</a></td>
                            <td><img id="imgEstiloConta" src="' . $row[8] . '" title="Utilizador: ' . $row[6] . ' | Email: ' . $row[7] . '" alt="Pedimos desculpa pelo o erro"></td>
                            <td style="text-align: center;" id="dataVencimentoEdit">' . $dataVencimento . '</td>
                            <td><i class="fas fa-circle" id="corEdit" style="color: ' . $cor . ';width: 100%;text-align: center;"></i></td>
                            <td class="justify-content-center align-items-center">
                                <div class="row">
                                  <a data-toggle="popover" id="descricaoEdit" data-trigger="hover" data-content="' . $descricao . '">
                                    <i class="far fa-eye fa-lg opacityFA mr-1 body-class ' . $darkmode . '"></i>
                                  </a>
                                  <i class="far fa-edit fa-lg opacityFA mr-1 modalEdittarefa body-class ' . $darkmode . '" '.$editmodalshow.'></i>
                                  <i class="far fa-trash-alt fa-lg opacityFA removeTarefa body-class ' . $darkmode . '"></i>
                                </div>
                            </td>
                        </tr>
                    ';
          }
        } else { //se não apresenta só esta menssagem
          echo '<tr>
                            <td>Sem dados</td>
                        </tr>';
        }
      } else {
        echo '<tr>
                          <td>Sem permissões para visualizar</td>
                      </tr>';
      }
      ?>
    </tbody>
  </table>
  <div>
    <button type="button" class="btn btn-primary btn-lg btn-block mt-2 mb-2" id="clickAddTarefa" <?= $editmodaladd ?> >Adicionar Sub-tarefa</button>
  </div>
</div>