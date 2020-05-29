<?php
session_start();
include_once('../../bd/bd.php');
$id = $_SESSION['user_id'];
$idBoard = $_SESSION['user_board'];
$nomeboard = '';
$darkmode = '';
if ($_SESSION['estado_darkmode'] != 1) {
  $darkmode = '';
} else {
  $darkmode = 'darkmode';
}
unset($_SESSION['user_board_perms']);
$sql = "SELECT B.boardop1, B.boardop2, B.boardop3, B.boardop4, B.boardop5, B.boardop6, B.boardop7, B.boardop8, B.boardop9, B.boardop10, B.boardop11, B.boardop12, B.boardop13, B.boardop14, B.boardop15, B.boardop16, B.boardop17 FROM boardpermissoesusers AS A, boardpermissoes AS B WHERE A.id_boarduser = '$idBoard' AND A.id_user = '$id' AND A.id_boardpermissiao = B.id";
$result = mysqli_query($conn, $sql);
if ($row_cnt = $result->num_rows) {
  while ($row = mysqli_fetch_row($result)) {
    $perms = array($row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7], $row[8], $row[9], $row[10], $row[11], $row[12], $row[13], $row[14], $row[15], $row[16]);
    $_SESSION['user_board_perms'] = $perms;
  }
}
$sql = "SELECT A.nomeboard, B.corOrdem FROM boarduser AS A, boardusers AS B WHERE A.id_boarduser = B.id_board AND B.id_board = '$idBoard' AND B.id_user = '$id'";
$result = mysqli_query($conn, $sql);
if ($row_cnt = $result->num_rows) {
  while ($row = mysqli_fetch_row($result)) {
    $corOrdem = $row[1];
    $nomeboard = $row[0];
  }
}
?>
<script>
  var corOrdem = "<?php echo $corOrdem ?>";
  if (corOrdem != '') {
    $('.estiloColor:eq(' + (corOrdem - 1) + ')').css({
      height: '80px',
      width: '80px',
      opacity: '0.8'
    });
  } else {
    $('.estiloColor:eq(0)').css({
      height: '80px',
      width: '80px',
      opacity: '0.8'
    });
  }

  ////// Permissões

  $(document).on('click', '.criarPermissao', function() {
    var nomep = $('input[name="nomeparapermissao"]').val()
    var permchange = $('#permissaoPerm option:last').data("permorder")

    var checkBoxPerm = [];

    for (var x = 0; x < 17; x++) {
      if ($('#checkBoxPerm' + (x + 1)).is(':checked') == false) {
        checkBoxPerm.push('0')
      } else {
        checkBoxPerm.push('1')
      }
    }
    
    $.ajax({
      url: 'ajax/criarpermissao',
      method: 'POST',
      dataType: 'JSON',
      data: {
        update: 1,
        nomep: nomep,
        checkBoxPerm: checkBoxPerm,
        permchange: permchange
      },
      success: function(data) {
        if (data[0] == 1) {
          $('#permissaoPerm')
            .append($('<option>', {
                "value": data[1],
                "data-permorder": data[2]
              })
              .text(nomep));
          $('input[name="nomeparapermissao"]').val('')
          for (var x = 0; x < 17; x++) {
            $('#checkBoxPerm' + (x + 1)).prop('checked', false)
          }
          $('#definition').click()
        } else {
          toastr["error"]('O nome da permissão já existe!', "Error");
          $('input[name="nomeparapermissao"]').val('').focus()
        }
      }
    });
  })


  $(document).on('click', '.atribuirPermissao', function() {
    var perm = $('#permissaoPerm').val()
    var permchange = $('#permissaoPerm option:selected').data("permorder")
    var permorder = $('#membrosPerm option:selected').data("permorder")
    var permName = $('#permissaoPerm option:selected').text()
    var membro = $('#membrosPerm').val()

    $.ajax({
      url: 'ajax/atribuirpermissao',
      method: 'POST',
      dataType: 'JSON',
      data: {
        update: 1,
        perm: perm,
        membro: membro,
        permorder: permorder
      },
      success: function(data) {
        if (data == 0) {
          toastr["info"]('Já se encontra com a permissão ' + permName, "Informação - Permissão");
        } else if (data == 2) {
          toastr["error"]('Não pode alterar o Admin principal', "Error - Permissão");
        } else if(data == 3) {
          toastr["error"]('Não se encontra com permissão', "Error - Permissão");
        } else if(data == 1) {
          toastr["success"]('Permissão alterada com successo', "Sucesso");
          $('.permissoesTable[data-id="' + membro + '"]  td:eq(1)').text(permName)
          $('#membrosPerm option:selected').attr('data-permorder', permchange)
        }
      }
    })
  })

  $(document).on('click', '.checkboxEditPerm', function() {
    var permorder = $(this).parent().parent().parent().data('order-perm')
    var position = $(this).data('position')
    var index = $(this).parent().parent().parent().data('index')

    var op = 0
    if ($(this).prop('checked')) {
      op = 1
    }

    if (permorder != 1) {
      $.ajax({
        url: 'ajax/alterarpermissaocheckbox',
        method: 'POST',
        dataType: 'text',
        data: {
          update: 1,
          permorder: permorder,
          position: position,
          index: index,
          op: op
        },
        success: function(data) {
          if (data == 0) {
            toastr['error']('Não tem permissão para recorrer esta ação', 'Error - Permissões')
          }
        }
      })
    } else {
      toastr['error']('Não tem permissão para recorrer esta ação', 'Error - Permissões')
    }

  })

  $(document).on('click', '.removerAtribuicaoPerm', function() {
    var permorder = $(this).parent().parent().data('order-perm')
    var index = $(this).parent().parent().data('index')

    if (confirm('Deseja apagar a permissão?')) {
      if (permorder != 1) {
        $.ajax({
          url: 'ajax/removerpermissaogeral',
          method: 'POST',
          dataType: 'text',
          data: {
            update: 1,
            index: index,
            permorder: permorder
          },
          success: function(data) {
            if (data == 0) {
              toastr['error']('Não tem permissão para recorrer esta ação', 'Error - Permissões')
            } else {
              $('.permissoesTable[data-index="' + index + '"]').remove()
              $('.permShowEdit[data-index="' + index + '"]').remove()
            }
          }
        })
      } else {
        toastr['error']('Não tem permissão para recorrer esta ação', 'Error - Permissões')
      }
    }

  })

  $(document).on('click', '.removerInBoardUser', function() {
    var index = $(this).parent().parent().data('index')
    var orderpem = $(this).parent().parent().data('idboardperm')
    var id = $(this).parent().parent().data('id')

    var result = confirm('Deseja apagar membro da Board?')
    if (result) {
      $.ajax({
        url: 'ajax/removermembroinboard',
        method: 'POST',
        dataType: 'text',
        data: {
          update: 1,
          index: index,
          orderpem: orderpem,
          id: id
        },
        success: function(data) {
          if (data == 0) {
            toastr['error']('Não tem permissão para apagar o membro', 'Error - Permissões')
          } else {
            $('.permissoesTable[data-index="' + index + '"]').remove()
            $('.topMenuImgUsers[data-id-user-top="' + id + '"]').remove()
          }
        }
      })
    }
  })

  // Estilo Cor - Definições
  var corAtualDefintion = ''
  var colorDefintion = 1
  $(document).on('click', '.estiloColor', function() {
    var idcoluna = $('input[name="editBoardColuna"]').attr('data-board-coluna')
    if (colorDefintion == 0) {
      $(this).css({
        'height': '80px',
        'width': '80px',
        'opacity': '0.8'
      });
      colorDefintion = 1
      corAtualDefintion = $(this).css('background-color')

      //var idcoluna = $('input[name="editBoardColunaID"]').attr('data-id-coluna')


      //Travis J   https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
      var rgb2hex = str => "#" + str.split(',').map(s => (s.replace(/\D/g, '') | 0).toString(16)).map(s => s.length < 2 ? "0" + s : s).join('');
      //
      var corAtualSend = rgb2hex(corAtualDefintion)

      $.ajax({
        url: 'ajax/list-color-update',
        method: 'POST',
        dataType: 'text',
        data: {
          update: 1,
          corAtual: corAtualSend
        }
      });
    } else if (colorDefintion == 1 && $(this).css('height') == '80px') {
      $(this).css('opacity', '1');
      colorDefintion = 0
      corAtualDefintion = ''
      $.ajax({
        url: 'ajax/list-color-update',
        method: 'POST',
        dataType: 'text',
        data: {
          update: 1,
          corAtual: corAtualDefintion
        }
      });

    }
  })
  $(document).on('mouseover', '.estiloColor', function() {
    if (colorDefintion != 1) {
      $(this).animate({
        'height': '80px',
        'width': '80px'
      });
    }
  })
  $(document).on('mouseout', '.estiloColor', function() {
    if (colorDefintion != 1) {
      $(this).animate({
        'height': '60px',
        'width': '60px'
      });
    }
  });

  if($('input[name="modoajuda"]').val()==1){
    $('#darkmodeID').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode ativar o modo escuro').fadeOut("slow").fadeIn("slow");
		$('.estiloColor').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode escolher cor para o background das tarefas').fadeOut("slow").fadeIn("slow");
		$('.criarPermissao').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode criar várias permissões a sua medida').fadeOut("slow").fadeIn("slow");
		$('.atribuirPermissao').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode atribuir a permissão aos membros').fadeOut("slow").fadeIn("slow");
		$('.checkmark').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode editar a permissão com esta regra').fadeOut("slow").fadeIn("slow");
		$('.edittrabalhador').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode ativar a gestão de salário do membro escolhido').fadeOut("slow").fadeIn("slow");
		$('.edittrabalhadorClean').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode desativar a gestão de salário do membro, e limpar os seus dados').fadeOut("slow").fadeIn("slow");
		$('input[name="iniciogestaosalarios"]').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação tem que mostrar ao programa o dia que irá começar a gestão dos salários').fadeOut("slow").fadeIn("slow");
		$('input[name="fimgestaosalarios"]').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação tem que mostrar ao programa o dia que irá finalizar a gestão dos salários').fadeOut("slow").fadeIn("slow");
		$('input[name="feriadosgestaosalarios"]').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação tem que nos apresentar os feriados que existem até ao primeiro dia escolhido até ao dia final escolhido').fadeOut("slow").fadeIn("slow");
		$('.reiniciarSalarios').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação reiniciará toda a gestão de salários').fadeOut("slow").fadeIn("slow");
    $('.removerInBoardUser').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode apagar o membro associado ao board/projeto').fadeOut("slow").fadeIn("slow");
  }

  setInterval(function() {
      var currentTime = new Date ();
      var currentYear = currentTime.getFullYear();
      var currentMonth= ("0" + (currentTime.getMonth() + 1)).slice(-2)
      var currentDay = currentTime.getDate()
      var currentHours = currentTime.getHours();   
      var currentMinutes = currentTime.getMinutes();   
      currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;     
      var currentDia =  currentDay + "/" + currentMonth + "/" + currentYear;
      var currentHora = currentHours + ":" + currentMinutes;
      $('#dia').text(currentDia)
      $('#horas').text(currentHora)
  }, 1000);
</script>
<div class="container mw-70">
  <div class="row">
    <!-- Tarefa Estilo -->
    <div class="col-md-12 mb-4">
      <div class="card card-default mt-2 body-class <?= $darkmode ?> selectDesactive">
        <div class="card-heading main-color-bg px-lg-2" style="background:#008ce3;color: #fff;height: 3pc;border-radius: 2px;padding: 6px;">
          <div>
            <h3>Estilo tarefa/ajuda</h3>
          </div>
        </div>
        <div class="card-body">

          <div class="container row">
            <div class="col-md-6 row d-flex justify-content-center align-items-center">
              <!--<div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="switchesHelpMod">
                        <label title="Ao clicar ativará o modo ajuda" class="custom-control-label" for="switchesHelpMod">Modo ajuda</label>
                      </div>-->
              <div class="col-md-6 d-flex justify-content-center">
                <i class="fas fa-question-circle fa-3x" id="modoajuda" title="Ao clicar ativará o modo ajuda"> </i>
              </div>
              <div class="col-md-6 d-flex justify-content-center">
                <i class="fas fa-adjust fa-3x" id="darkmodeID"> </i>
              </div>
            </div>

            <div class="col-auto px-0 estiloColor mt-2" style="margin-right: 6px; width: 60px; height: 60px;background-color:#224768; border-radius: 6px; opacity: 1;border: 1px solid rgba(0,0,0,.125);"></div>
            <div class="col-auto px-0 estiloColor mt-2" style="margin-right: 6px; width: 60px; height: 60px;background-color:#4950BA; border-radius: 6px; opacity: 1;border: 1px solid rgba(0,0,0,.125);"></div>
            <div class="col-auto px-0 estiloColor mt-2" style="margin-right: 6px; width: 60px; height: 60px;background-color:#A058AE; border-radius: 6px; opacity: 1;border: 1px solid rgba(0,0,0,.125);"></div>
            <div class="col-auto px-0 estiloColor mt-2" style="margin-right: 6px; width: 60px; height: 60px;background-color:#FF824C; border-radius: 6px; opacity: 1;border: 1px solid rgba(0,0,0,.125);"></div>
            <div class="col-auto px-0 estiloColor mt-2" style="margin-right: 6px; width: 60px; height: 60px;background-color:#2095F2; border-radius: 6px; opacity: 1;border: 1px solid rgba(0,0,0,.125);"></div>
            <div class="col-auto px-0 estiloColor mt-2" style="margin-right: 6px; width: 60px; height: 60px;background-color:#FFB600; border-radius: 6px; opacity: 1;border: 1px solid rgba(0,0,0,.125);"></div>
            <div class="col-auto px-0 estiloColor mt-2" style="margin-right: 6px; width: 60px; height: 60px;background-color:#519819; border-radius: 6px; opacity: 1;border: 1px solid rgba(0,0,0,.125);"></div>

          </div>
        </div>
      </div>
    </div>

    <!-- Board Opções
    <div class="col-md-12 mb-4">
      <div class="card card-default mt-2 body-class <?= $darkmode ?> selectDesactive">
        <div class="card-heading main-color-bg px-lg-2" style="background:#008ce3;color: #fff;height: 3pc;border-radius: 2px;padding: 6px;">
          <div>
            <h3>Opções</h3>
          </div>
        </div>
        <div class="card-body">


          <div class="col-md-3">
                      <div class="well dash-box px-lg-2" style="background-color: #63DE27;color: #fff;height: 6pc;border-radius: 6px;padding: 6px;">
                        <h2><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> 12,334</h2>
                        <h4>Visitors</h4>
                      </div>
                    </div>

        </div>
      </div>
    </div>-->

    <?php if ($_SESSION['user_board_perms'][0] == 1 || $_SESSION['user_board_perms'][1] == 1 || $_SESSION['user_board_perms'][3] == 1) { ?>
      <div class="col-md-12 mb-4">
        <!-- Board Permissões -->
        <div class="card card-default body-class <?= $darkmode ?> selectDesactive">
          <div class="card-heading main-color-bg px-lg-2" style="background:#008ce3;color: #fff;height: 3pc;border-radius: 2px;">
            <div>
              <h3 class="mt-2 ml-1">Permissões</h3>
            </div>
          </div>
          <div class="card-body selectDesactive">
            <?php if ($_SESSION['user_board_perms'][0] == 1) { ?>
              <h3>Criar permissões</h3>
              <div class="row">

                <div class="form-group col-md-2">
                  <label for="permNome">Nome permissão</label>
                  <input type="text" name="nomeparapermissao" class="form-control" id="permNome">
                  <div class="d-flex justify-content-center align-items-center mt-3">
                    <button class="btn btn-success criarPermissao">Criar permissão</button>
                  </div>
                </div>

                <div class="col-md-3">
                  <label>Board Geral</label>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm1">
                    <label class="custom-control-label" for="checkBoxPerm1">Criar permissões</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm2">
                    <label class="custom-control-label" for="checkBoxPerm2">Ver membros</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm3">
                    <label class="custom-control-label" for="checkBoxPerm3">Excluír membros</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm4">
                    <label class="custom-control-label" for="checkBoxPerm4">Atribuir e editar permissões</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm17">
                    <label class="custom-control-label" for="checkBoxPerm17">Gestor de salários</label>
                  </div>
                </div>
                <div class="col-md-3">
                  <label>Board Opção 1</label>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm5">
                    <label class="custom-control-label" for="checkBoxPerm5">Editar tarefa</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm6">
                    <label class="custom-control-label" for="checkBoxPerm6">Arquivos</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm7">
                    <label class="custom-control-label" for="checkBoxPerm7">Períodos de trabalho</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm8">
                    <label class="custom-control-label" for="checkBoxPerm8">Pagamentos</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <label>Board Opção 2</label>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm9">
                    <label class="custom-control-label" for="checkBoxPerm9">Ver</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm10">
                    <label class="custom-control-label" for="checkBoxPerm10">Criar/Editar</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm11">
                    <label class="custom-control-label" for="checkBoxPerm11">Apagar</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm12">
                    <label class="custom-control-label" for="checkBoxPerm12">Mover tarefa</label>
                  </div>
                </div>

                <div class="col-md-2">
                  <label>Sub-tarefas</label>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm13">
                    <label class="custom-control-label" for="checkBoxPerm13">Ver</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm14">
                    <label class="custom-control-label" for="checkBoxPerm14">Criar/Editar</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm15">
                    <label class="custom-control-label" for="checkBoxPerm15">Apagar</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="checkBoxPerm16">
                    <label class="custom-control-label" for="checkBoxPerm16">Mover sub-tarefa</label>
                  </div>
                </div>

              </div>
            <?php } ?>


            <div class="row">
              <?php if ($_SESSION['user_board_perms'][3] == 1) { ?>
                <div class="col-md-12">
                  <h3 class="mt-2">Atribuir permissão</h3>
                  <div class="row text-break">
                    <div class="form-group col-md-4">
                      <label for="membrosPerm">Permissão</label>
                      <select class="form-control" id="permissaoPerm">
                        <?php
                        $sql = "SELECT id, nomeperm, permORder FROM boardpermissoes WHERE id_boarduser='$idBoard' ORDER BY permORder ASC";
                        $result = mysqli_query($conn, $sql);

                        if ($row_cnt = $result->num_rows) {
                          while ($row = mysqli_fetch_row($result)) {
                            echo '<option value="' . $row[0] . '" data-permorder="' . $row[2] . '">' . $row[1] . '</option>';
                          }
                        }
                        ?>
                      </select>
                    </div>

                    <div class="form-group col-md-5">
                      <label for="membrosPerm">Membros</label>
                      <select class="form-control" id="membrosPerm">
                        <?php
                        //$sql = "SELECT B.user_username, B.user_email, B.user_id, D.permORder FROM boardusers AS A, login_users AS B, boardpermissoesusers AS C, boardpermissoes AS D WHERE A.id_board = '$idBoard' AND A.id_user = B.user_id AND A.id_user = C.id_user AND C.id_boardpermissiao = D.id ORDER BY A.id_user";
                        $sql = "SELECT E.user_username, E.user_email, E.user_id, D.permORder FROM boarduser AS A, boardusers AS B, boardpermissoesusers AS C, boardpermissoes AS D, login_users AS E WHERE A.id_boarduser = B.id_board AND B.id_user = C.id_user AND C.id_boardpermissiao = D.id AND B.id_board = C.id_boarduser AND A.id_boarduser = '$idBoard' AND E.user_id = B.id_user AND A.id_user <> B.id_user ORDER BY D.permORder";
                        $result = mysqli_query($conn, $sql);

                        if ($row_cnt = $result->num_rows) {

                          while ($row = mysqli_fetch_row($result)) {
                            echo '<option value="' . $row[2] . '" data-permorder="' . $row[3] . '">' . $row[0] . ' | ' . $row[1] . '</option>';
                          }
                        }
                        ?>
                      </select>
                    </div>

                    <div class="col-md-3 d-flex justify-content-center align-items-center">
                      <button class="btn btn-success mt-3 atribuirPermissao">Atribuir permissão</button>
                    </div>
                    <?php
                    $sql = "SELECT id, nomeperm, boardop1, boardop2, boardop3, boardop4, boardop5, boardop6, boardop7, boardop8, boardop9, boardop10, boardop11, boardop12, boardop13, boardop14, boardop15, boardop16, permORder, boardop17 FROM boardpermissoes WHERE id_boarduser = '$idBoard'";
                    $result = mysqli_query($conn, $sql);

                    if ($row_cnt = $result->num_rows) {
                      while ($row = mysqli_fetch_row($result)) {
                        $checkBoxAdd = '';
                        ($row[18] != 1) ? $checkBoxAdd = 'class="checkboxEditPerm"' : $checkBoxAdd = 'disabled';
                        echo '
                                    <div class="col-md-12 row mt-2 permShowEdit" data-index="' . $row[0] . '" data-order-perm="' . $row[18] . '">
                                      <strong class="col-md-12 mt-2">' . $row[1] . '</strong>
                                      <div class="col-md-3 mt-2">
                                        <label>Board Geral</label>
                                        <label class="checkboxcontainer">Criar permissões
                                          <input type="checkbox" data-position="1" ' . $checkBoxAdd . ' ', ($row[2] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Ver membros
                                          <input type="checkbox" data-position="2" ' . $checkBoxAdd . ' ', ($row[3] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Excluír membros
                                          <input type="checkbox" data-position="3" ' . $checkBoxAdd . ' ', ($row[4] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Atribuir e editar permissões
                                          <input type="checkbox" data-position="4" ' . $checkBoxAdd . ' ', ($row[5] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Gestor de salários
                                          <input type="checkbox" data-position="17" ' . $checkBoxAdd . ' ', ($row[19] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                      </div>
                                      <div class="col-md-3 mt-2">
                                        <label>Board Opção 1</label>
                                        <label class="checkboxcontainer">Editar tarefa
                                          <input type="checkbox" data-position="5" ' . $checkBoxAdd . ' ', ($row[6] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Arquivos
                                          <input type="checkbox" data-position="6" ' . $checkBoxAdd . ' ', ($row[7] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Períodos de trabalho
                                          <input type="checkbox" data-position="7" ' . $checkBoxAdd . ' ', ($row[8] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Pagamentos
                                          <input type="checkbox" data-position="8" ' . $checkBoxAdd . ' ', ($row[9] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                      </div>
                                      <div class="col-md-2 mt-2">
                                        <label>Board Opção 2</label>
                                        <label class="checkboxcontainer">Ver
                                          <input type="checkbox" data-position="9" ' . $checkBoxAdd . ' ', ($row[10] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Criar/Editar
                                          <input type="checkbox" data-position="10" ' . $checkBoxAdd . ' ', ($row[11] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Apagar
                                          <input type="checkbox" data-position="11" ' . $checkBoxAdd . ' ', ($row[12] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Mover tarefa
                                          <input type="checkbox" data-position="12" ' . $checkBoxAdd . ' ', ($row[13] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                      </div>
                                      <div class="col-md-2 mt-2">
                                        <label>Sub-tarefas</label>
                                        <label class="checkboxcontainer">Ver
                                          <input type="checkbox" data-position="13" ' . $checkBoxAdd . ' ', ($row[14] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Criar/Editar
                                          <input type="checkbox" data-position="14" ' . $checkBoxAdd . ' ', ($row[15] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Apagar
                                          <input type="checkbox" data-position="15" ' . $checkBoxAdd . ' ', ($row[16] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                        <label class="checkboxcontainer">Mover sub-tarefa
                                          <input type="checkbox" data-position="16" ' . $checkBoxAdd . ' ', ($row[17] != 0) ? 'checked' : '', '>
                                          <span class="checkmark"></span>
                                        </label>
                                      </div>
                                      <div class="col-md-2 mt-2">
                                        ', ($row[18] == 1 || $row[18] == 2) ? 'Não pode remover' : '<i class="far fa-trash-alt fa-lg opacityFA removerAtribuicaoPerm body-class ' . $darkmode . '"></i>',
                          '</div>
                                    </div>';
                      }
                    }
                    ?>
                  </div>


                </div>
              <?php } ?>
              <?php if ($_SESSION['user_board_perms'][1] == 1) { ?>
                <div class="col-md-12">
                  <h3 class="mt-3">Lista de membros associados a board "<?= $nomeboard ?>"</h3>
                  <table class="table body-class <?= $darkmode ?>">
                    <thead>
                      <tr>
                        <th scope="col">Membros</th>
                        <th scope="col">Permissão</th>
                        <?= ($_SESSION['user_board_perms'][2] == 1) ? '<th scope="col">Ações</th>' : '' ?>
                      </tr>
                    </thead>
                    <tbody>
                      <?php
                      $sql = "SELECT A.id, B.nomeperm, C.user_username, C.user_email, C.user_imageurl, B.permORder, C.user_id, A.id_boardpermissiao, B.id_user FROM boardpermissoesusers AS A, boardpermissoes AS B, login_users AS C WHERE A.id_boarduser = '$idBoard' AND A.id_boardpermissiao = B.id AND A.id_user = C.user_id ORDER BY B.permORder, A.id";
                      $result = mysqli_query($conn, $sql);

                      if ($row_cnt = $result->num_rows) {
                        while ($row = mysqli_fetch_row($result)) {
                          echo '<tr class="permissoesTable" data-index="' . $row[0] . '" data-orderpem="' . $row[5] . '" data-id="' . $row[6] . '" data-idboardperm="' . $row[7] . '">
                                        <td><img src="' . $row[4] . '" style="height:40px;width:40px;object-fit: cover;object-fit: cover;border-radius:50%;margin-bottom: 6px;" title="Utilizador: ' . $row[2] . ' | Email: ' . $row[3] . '" alt="Pedimos desculpa pelo o erro"></td>
                                        <td>' . $row[1] . '</td>';
                          if ($_SESSION['user_board_perms'][2] == 1 && $row[8] != $row[6]) {
                            echo '<td></i><i class="far fa-trash-alt fa-lg opacityFA removerInBoardUser body-class ' . $darkmode . '"></i></td>';
                          } elseif ($_SESSION['user_board_perms'][2] == 1 && $row[8] == $row[6]) {
                            echo '<td>Não pode remover</td>';
                          }
                          echo '</tr>';
                        }
                      }
                      ?>
                    </tbody>
                  </table>
                </div>
              <?php } ?>
            </div>
          </div>
        </div>
      </div>
    <?php } ?>
    <?php if ($_SESSION['user_board_perms'][16] == 1) { ?>
    <!-- Board Gestor de salários -->
    <div class="col-md-12 mb-4">
      <div class="card card-default mt-2 body-class <?= $darkmode ?> selectDesactive">
        <div class="card-heading main-color-bg px-lg-2" style="background:#008ce3;color: #fff;height: 3pc;border-radius: 2px;padding: 6px;">
          <div>
            <h3>Gestor de salários</h3>
          </div>
        </div>
        <div class="container row mt-4 mb-3">
            <div class="col-md-6 text-center">
                <h2 id="dia">Sem dados</h2>
            </div>
            <div class="col-md-6 text-center">
                <h2 id="horas">Sem dados</h2>
            </div>
        </div>
        <div class="card-body" style="margin-left: 0pc;margin-right: -1pc;">

          <div class="row text-break">
            <?php
            $sql = "SELECT B.user_id, B.user_username, B.user_email, B.user_imageurl, A.id, A.tipo_trabalhador, A.salario_mensal, A.salario_semanal, A.tempo_trabalho_dias, A.tempo_trabalho_horas, A.dias_semanais_trabalho, A.receita_final FROM boardgestorsalario AS A, login_users AS B WHERE A.id_user = B.user_id AND A.id_boarduser ='$idBoard'";
            $result = mysqli_query($conn, $sql);
            if ($row_cnt = $result->num_rows) {
              while ($row = mysqli_fetch_row($result)) {
                $salarioShow = 'Sem dados';
                $tempoTrabalhoShow = 'Sem dados';
                $diasSemanias = 'Sem dados';
                if ($row[6] != '' && $row[6] !='0') {
                  $salarioShow = $row[6] . '€';
                } else if ($row[7] != '' && $row[7] !='0') {
                  $salarioShow = $row[7] . '€/h';
                }
                if ($row[8] != '' && $row[8] !='0') {
                  if($row[8] == 1){
                    $tempoTrabalhoShow = $row[8] . ' dia';
                  } else {
                    $tempoTrabalhoShow = $row[8] . ' dias';
                  }
                } else if ($row[9] != '' && $row[9] !='0') {
                  $tempoTrabalhoShow = $row[9] . ' horas';
                }
                if ($row[10] != '' && $row[10] !='0') {
                  if($row[10] == 1){
                    $diasSemanias = $row[10] . ' dia';
                  } else {
                    $diasSemanias = $row[10] . ' dias';
                  }
                }

                echo '
                      <div class="row gestorSalario col-md-12" data-index="' . $row[4] . '">
                        <div class="col-auto">
                          <label><strong>Membro</strong></label>
                          <div class="d-flex justify-content-center align-items-center">
                            <img src="' . $row[3] . '" style="height:40px;width:40px;object-fit: cover;border-radius:50%;margin-bottom: 6px;" data-index="' . $row[0] . '" title="Utilizador: ' . $row[1] . ' | Email: ' . $row[2] . '" alt="Pedimos desculpa pelo o erro">
                          </div>
                        </div>
                        <div class="col-md-2">
                          <label><strong>Tipo de trabalhador</strong></label>
                          <label>', ($row[5] != '') ? $row[5] : 'Sem dados', '</label>
                        </div>
                        <div class="col">
                          <label><strong>Salário</strong><i class="far fa-question-circle opacityFA ml-2 body-class ' . $darkmode . '" title="Salário Mensal(€) | Preço hora(€/h) - Semanal"></i></label>
                          <div><label>', $salarioShow, '</label></div>
                        </div>
                        <div class="col-md-2">
                          <label><strong>Tempo de trabalho</strong></label>
                          <div><label>', $tempoTrabalhoShow, '</label></div>
                        </div>
                        <div class="col-md-2">
                          <label><strong>Dias semanais de trabalho</strong></label>
                          <label>', $diasSemanias, '</label>
                        </div>
                        <div class="col-md-2">
                          <label><strong>Receita final</strong><i class="far fa-question-circle opacityFA ml-2 body-class ' . $darkmode . '" title="Contém arrendamento"></i></label>
                          <div><label>', ($row[11] != '') ? round($row[11]).'€' : 'Sem dados', '</label></div>
                        </div>
                        <div class="col">
                          <label><strong>Ações</strong></label>
                          <div>
                            <label>
                              <i class="far fa-edit fa-lg opacityFA edittrabalhador body-class ' . $darkmode . '" data-toggle="modal" data-target="#edittrabalhador"></i>
                              <i class="fas fa-eraser fa-lg opacityFA edittrabalhadorClean body-class ' . $darkmode . '"></i>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12"></div>';
              }
            }

              $sql = "SELECT igestaosalario, fgestaosalario, fer, duteis FROM boarduser WHERE id_boarduser='$idBoard'";
              $result = mysqli_query($conn, $sql);
              if ($row_cnt = $result->num_rows) {
                while ($row = mysqli_fetch_row($result)) {
                  echo '
                  <div class="row col-md-12 mb-4 mt-4">
                    <div class="col-md-4">
                      <label>Início da gestão de salários</label>
                      <input type="date" name="iniciogestaosalarios" class="form-control" value="'.$row[0].'">
                    </div>
                    <div class="col-md-4">
                      <label>Fim da gestão de salários</label>
                      <input type="date" name="fimgestaosalarios" class="form-control" value="'.$row[1].'">
                    </div>
                    <div class="col-md-4">
                      <label>Feriados</label>
                      <input type="number" name="feriadosgestaosalarios" class="form-control" value="'.$row[2].'">
                    </div>
                    <div class="col-md-12 mt-3 d-flex justify-content-center align-items-center">
                      <h3>Dias úteis: <a class="h3 diasuteisshow">',($row[3]=='')?'0':$row[3],'</a></h3>
                    </div>
                  </div>';
                }
              }
            ?>
            

            <button type="button" class="btn btn-primary btn-lg btn-block mt-1 mb-2 reiniciarSalarios" style="width: 94%;margin-left: 1pc;">Reiniciar salários</button>
          </div>
        </div>
      </div>

    </div>
    <?php } ?>
  </div>
</div>
</div>
</div>

<!-- Modal Add Trabalhador -->
<div class="modal fade" id="edittrabalhador" tabindex="-1" role="dialog" aria-labelledby="edittrabalhadorLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content body-class <?= $darkmode ?>">
      <div class="modal-header">
        <h5 class="modal-title" id="edittrabalhadorTitle">Editar salário do trabalhador</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="tipoTrabalhador">Tipo de trabalhador</label>
            <select id="tipoTrabalhador" class="form-control">
              <option selected>Interno</option>
              <option>Externo</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label>Salário (€)</label>
            <input type="text" name="salarioGestorSalario" class="form-control" value="0€">
          </div>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="editActiveCliente">
          <label class="custom-control-label" for="editActiveCliente">Permitir gestão do membro</label>
        </div>
        <div class="mt-2" id="infoGestorSalario"></div>
        <input type="hidden" name="indexgestorsalario">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btnClose" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary" id="gestorSalarioEdit">Guardar</button>
      </div>
    </div>
  </div>
</div>