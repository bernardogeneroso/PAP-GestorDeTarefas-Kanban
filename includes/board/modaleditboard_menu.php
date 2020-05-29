<?php
session_start();
include_once('../../bd/bd.php');
$id = $_SESSION['user_id'];
$idBoard = $_SESSION['user_board'];
$darkmode = '';
if ($_SESSION['estado_darkmode'] != 1) {
    $darkmode = '';
} else {
    $darkmode = 'darkmode';
}
$sql = "SELECT user_username, user_email, user_imageurl FROM login_users WHERE user_id='$id'";
$result = mysqli_query($conn, $sql);
if ($row_cnt = $result->num_rows) {
    while ($row = mysqli_fetch_row($result)) {
        $imgurlperfil = $row[2];
        $usernameperfil = $row[0];
        $emailperfil = $row[1];
    }
}
?>
<script>
   
    var files = $("#files");

    $("#fileupload").fileupload({
        url: "ajax/uploaddropzonetarefas.php",
        dropZone: '#dropZone',
        dataType: 'json',
        autoUpload: false
    }).on('fileuploadadd', function (e, data) {
        /*var fileTypeAllowed = /.\.(gif|jpg|png|jpeg|docx|pptx|pdf|txt|zip|rar|7z|xlsx)$/i;
        var fileName = data.originalFiles[0]['name'];
        var fileSize = data.originalFiles[0]['size'];

        if (!fileTypeAllowed.test(fileName))
            console.log('ERROR TYPE')
        else if (fileSize > 5000000)
            console.log('ERROR BIG SIZE')
        else {*/
        data.submit();
        //}
    }).on('fileuploaddone', function (e, data) {
        var status = data.jqXHR.responseJSON.status;
        var msg = data.jqXHR.responseJSON.msg;

        if (status == 1) {
            var typePermitImage = ['jpg', 'jpeg', 'png', 'gif'];
            var path = data.jqXHR.responseJSON.path;
            var id = data.jqXHR.responseJSON.id;
            var tipo = data.jqXHR.responseJSON.tipo;
            var filename = data.jqXHR.responseJSON.filename

            /*if($(".ficheirosOFgalaria:eq(1)").length == 0){
                $(".ficheirosOFgalaria:eq(0)").after('<hr class="hr" style="border: 1.2px dashed #0088cc;">')
            }*/

            if ($.inArray(tipo, typePermitImage) >= 0) {
                $('.filesDesignEstrutura').css('display', 'block')
            }

            if ($.inArray(tipo, typePermitImage) != -1) {
                $(".ficheirosOFgalaria:eq(0)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><img style="width: 8pc; height: 8pc;border-top-right-radius: 6px;border-top-left-radius: 6px;" class="modalIMG" src="' + path + '" /><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
            } else if (tipo == 'docx') {
                $(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-word text-secondary" data-download-file="' + path + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
            } else if (tipo == 'pdf') {
                $(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-pdf text-secondary" data-download-file="' + path + '" data-index-pdf="' + id + '" data-toggle="modal" data-target="#pdfmodal"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a></div></div>');
            } else if (tipo == 'pptx') {
                $(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-powerpoint text-secondary" data-download-file="' + path + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
            } else if (tipo == 'xlsx') {
                $(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-excel text-secondary" data-download-file="' + path + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
            } else if (tipo == 'zip' || tipo == 'rar' || tipo == '7z') {
                $(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-archive text-secondary" data-download-file="' + path + '"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
            } else {
                $(".ficheirosOFgalaria:eq(1)").fadeIn().append('<div class="col-auto mb-4"><div class="divIMGestilo"><i style="width: 8pc; height: 8pc;font-size: 7pc;display: flex;justify-content: center;align-items: center;" class="far fa-file-alt text-secondary"></i><a class="text-center" style="white-space: normal;word-break: break-all;">' + filename + '</a><a href="' + path + '" download><button class="btn btn-primary" style="width:100%;display:none"><i class="fa fa-download mr-1"></i>Transferir</button></a><button class="btn btn-danger mt-2 apagarIMGbtn" data-index-imagem="' + id + '" style="display:none">Apagar</button></div></div>');
            }
        } else {
            toastr["error"](msg, "Error - Permissão");
        }
    });
	

    if($('input[name="modoajuda"]').val()==1){
        $('.addPerfilInBoardShow').parent().find('label').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode associar membros a tarefa').fadeOut("slow").fadeIn("slow");  
        $('.prioridadeColor').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode escolher a cor/prioridade na sua tarefa').fadeOut("slow").fadeIn("slow");
        $('textarea[name="task_descricao"]').parent().find('label').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação tire o focus da descrição e é guardada').fadeOut("slow").fadeIn("slow");
        $('#criarComentarioInBoard').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode criar sub-tarefas, para cada tarefa').fadeOut("slow").fadeIn("slow");
        $('#dropZone').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode mover os ficheiros que pretente para este espaço, que serão apresentados em baixo, dividios por ficheiros e imagens').fadeOut("slow").fadeIn("slow");
        $('.ficheirosOFgalaria:eq(0)').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação ao clicar, irá mostrar opões para descarregar imagem ou até mesmo apagar').fadeOut("slow").fadeIn("slow");
        $('.ficheirosOFgalaria:eq(1)').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação ao clicar, irá mostrar opões para descarregar os ficheiros ou até mesmo apagar, se for um PDF será representado no modelo de leitura do mesmo').fadeOut("slow").fadeIn("slow");
        $('.add_pagamento').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação ao clicar, irá ser adicionado um pagamento que será feitos os calcúlos no "Falta pagar"').fadeOut("slow").fadeIn("slow");
        $('#addBoardName').fadeOut("slow").fadeIn("slow").attr('title', 'Neste ação pode editar o nome da tarefa').fadeOut("slow").fadeIn("slow");
    }
    $("#tabs").tabs();
</script>
<div id="tabs" class="body-class <?= $darkmode ?>">
    <ul class="body-class <?= $darkmode ?>">
        <?php if ($_SESSION['user_board_perms'][4] == 1) {
            echo '<li><a href="#tabs-1" id="tab1click" class="body-class ' . $darkmode . '">Editar tarefa</a></li>';
        } ?>
        <?php if ($_SESSION['user_board_perms'][5] == 1) {
            echo '<li><a href="#tabs-2" id="tab2click" class="body-class ' . $darkmode . '">Arquivos</a></li>';
        } ?>
        <?php if ($_SESSION['user_board_perms'][6] == 1) {
            echo '<li><a href="#tabs-3" id="tab3click" class="body-class ' . $darkmode . '">Períodos de trabalho</a></li>';
        } ?>
        <?php if ($_SESSION['user_board_perms'][7] == 1) {
            echo '<li><a href="#tabs-4" id="tab4click" class="body-class ' . $darkmode . '">Pagamentos</a></li>';
        } ?>
    </ul>
    <?php if ($_SESSION['user_board_perms'][4] == 1) { ?>
        <div id="tabs-1" class="mt-2 body-class <?= $darkmode ?>">
            <!-- Associar membros na tarefa -->
            <div class="row">
                <div class="col-md-6 flexBox">
                    <label>Associar membros na tarefa:</label>
                    <div class="container row mb-2 addPerfilInBoardShow">
                        <?php
                        //$sql = "SELECT B.user_username, B.user_email, B.user_imageurl, B.user_id FROM boardusers AS A, login_users AS B WHERE A.id_board = '$idBoard' AND A.id_user = B.user_id";
                        $sql = "SELECT DISTINCT C.user_username, C.user_email, C.user_imageurl, C.user_id, A.id_boardpermissiao FROM boardpermissoesusers AS A, login_users AS C WHERE A.id_boarduser = '$idBoard' AND A.id_user = C.user_id";
                        $result = mysqli_query($conn, $sql);

                        if ($row_cnt = $result->num_rows) {
                            while ($row = mysqli_fetch_row($result)) {
                                if (!empty($row[2])) {
                                    echo '<div class="col-auto px-0" style="margin-right:6px"><img src="' . $row[2] . '" class="checkBoardAddEditTarefas" style="opacity: 1" data-index="' . $row[3] . '" data-ativo="0" title="Utilizador: ' . $row[0] . ' | Email: ' . $row[1] . '" alt="Pedimos desculpa pelo o erro"><span><i class="fas fa-check" style="display:none"></i></span></div>';
                                } else {
                                    echo '<div class="col-auto px-0" style="margin-right:6px"><img src="img/boardsettings/defaultboard.jpg" class="checkBoardAddEditTarefas" style="opacity: 1" data-index="' . $row[3] . '" data-ativo="0" title="Utilizador: ' . $row[0] . ' | Email: ' . $row[1] . '" alt="Pedimos desculpa pelo o erro"><span><i class="fas fa-check" style="display:none"></i></span></div>';
                                }
                            }
                        }
                        ?>
                    </div>
                </div>
                <div class="col-md-6">
                    <label>Prioridades/cores:</label>
                    <div class="container row mb-2">
                        <div class="col-auto px-0 prioridadeColor" data-cor-tarefa="1" style="margin-right:6px;width:30px;height:30px;background-color:#519839;border-radius:6px"></div>
                        <div class="col-auto px-0 prioridadeColor" data-cor-tarefa="2" style="margin-right:6px;width:30px;height:30px;background-color:#f2d600;border-radius:6px"></div>
                        <div class="col-auto px-0 prioridadeColor" data-cor-tarefa="3" style="margin-right:6px;width:30px;height:30px;background-color:#ff9f1a;border-radius:6px"></div>
                        <div class="col-auto px-0 prioridadeColor" data-cor-tarefa="4" style="margin-right:6px;width:30px;height:30px;background-color:#eb5a46;border-radius:6px"></div>
                    </div>
                    Estado: <a>Sem prioridade</a>
                </div>
            </div>

            <!-- Descrição -->
            <div class="form-group">
                <label>Descrição:</label>
                <textarea class="form-control body-class <?= $darkmode ?>" name="task_descricao" rows="3"></textarea>
            </div>

            <!-- Comentários -->
            <label>Sub-tarefas:</label>
            <div class="comentarios"></div>
            <div class="container" style="display: flex;align-items:center;">
                <img id="imgEstiloConta" src="<?= $imgurlperfil; ?>" title="Utilizador: <?= $usernameperfil ?> | Email: <?= $emailperfil ?>" alt="Pedimos desculpa pelo o erro" class="mr-2">
                <input type="text" name="comentarioINPUT" class="form-control body-class <?= $darkmode ?>" placeholder="Sub-tarefa...">
                <button class="btn btn-success ml-2" id="criarComentarioInBoard">Criar</button>
            </div>
        </div>
    <?php } ?>
    <?php if ($_SESSION['user_board_perms'][5] == 1) { ?>
        <div id="tabs-2" class="body-class <?= $darkmode ?>">
            <div id="dropZone">
                <h1>Arraste e deixe os ficheiros...</h1>
                <input type="file" id="fileupload" name="attachments[]" multiple>
            </div>
            <div class="container">
                <div class="row ficheirosOFgalaria">

                </div>
                <hr class="hr filesDesignEstrutura" style="border: 1.2px dashed #0088cc;display:none;">
                <div class="row ficheirosOFgalaria">

                </div>
                <hr class="hr" style="border: 0.8px dashed #0088cc;display:block;">
                <div>
                    <p>Formato aceites: jpg | jpeg | png | gif | docx | pptx | xlsx | pdf | txt | zip | rar | 7z</p>
                </div>
            </div>
        </div>
    <?php } ?>
    <?php if ($_SESSION['user_board_perms'][6] == 1) { ?>
        <div id="tabs-3" class="body-class <?= $darkmode ?>">

            <div class="row mt-2">
                <div class="col-md-6 text-center periodosDeTrabalhoEditBoard">
                    <h3>Data de criação</h3>
                    <h4><span class="badge badge-success dataCriacaoEditBoard"></span></h4>
                </div>
                <div class="col-md-4 text-center periodosDeTrabalhoEditBoard" style="display: none">
                    <h3>Data de encerramento</h3>
                    <h4><span class="badge badge-danger"></span></h4>
                </div>
                <div class="col-md-6 text-center periodosDeTrabalhoEditBoard">
                    <h3>Tempo despendido</h3>
                    <h4><span class="badge badge-info tempoDespendidoEditBoard"></span></h4>
                </div>
            </div>

            <table class="table mt-3 tableTimeEditBoardCSS body-class <?= $darkmode ?>">
                <thead>
                    <tr>
                        <th scope="col">Membro</th>
                        <th scope="col">Início</th>
                        <th scope="col">Finalizou</th>
                        <th scope="col">Tempo total</th>
                    </tr>
                </thead>
                <tbody class="tableTimeEditBoard body-class <?= $darkmode ?>">
                </tbody>
            </table>

        </div>
    <?php } ?>
    <?php if ($_SESSION['user_board_perms'][7] == 1) { ?>
        <div id="tabs-4" class="mt-3 body-class <?= $darkmode ?>">
            <form>
                <div class="form-row">
                    <div class="col-md-4">
                        <label>Prazo de entraga:</label>
                        <input type='date' name='edit_prazo_entraga' class='form-control'>
                    </div>
                    <div class="col-md-3">
                        <label>Fatura:</label>
                        <input type="text" name='edit_fatura' onkeypress='return event.charCode >= 48 && event.charCode <= 57' class="form-control">
                    </div>
                    <div class="col-md-2">
                        <label>Falta pagar:</label>
                        <input type="text" name='edit_falta_pagar' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44' class="form-control" value="0€" disabled>
                    </div>
                    <div class="col-md-3">
                        <label>Valor pago:</label>
                        <input type="text" name='edit_valor_pago' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44' class="form-control" value="0€" disabled>
                    </div>
                    <div class="col-md-4 mt-2">
                        <label>Preço total:</label>
                        <input type="text" name="edit_precototal" onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44' class="form-control" value="0€">
                        <i class="far fa-question-circle infoPagamentosScreenUm" title="Exemplo: 0.00 | Para separar os cêntimos"></i>
                    </div>

                    <div class="col-md-4 mt-2">
                        <label>Despesas:</label>
                        <input type="text" name="edit_despessas" onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44' class="form-control" value="0€">
                        <i class="far fa-question-circle infoPagamentosScreenDois" title="Exemplo: 0.00 | Para separar os cêntimos"></i>
                    </div>

                    <div class="col-md-4 mt-2">
                        <label>Lucro:</label>
                        <input type="text" name='edit_lucro' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44' class="form-control" value="0€" disabled>
                    </div>
                </div>
            </form>

            <hr class="hr" style="border: 0.7px dashed rgb(0, 136, 204)">


            <div class="row">
                <div class="col-md-4">
                    <label>Data:</label>
                    <input type='date' name="edit_pagamento_data" class='form-control' disabled>
                </div>
                <div class="col-md-4">
                    <label>Método de pagamento:</label>
                    <select class='form-control' name="edit_pagamento_metodo" disabled>
                        <option value='numerario'>Dinheiro</option>
                        <option value='transferencia'>Transferência</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label>Tipo de pagamento:</label>
                    <select class='form-control' name="edit_pagamento_tipo" disabled>
                        <option value='adjudication'>Adjudicação</option>
                        <option value='parcial'>Pagamento parcial</option>
                        <option value='final'>Pagamento final</option>
                    </select>
                </div>
                <div class="col-md-4 mt-2">
                    <label>Valor a pagar:</label>
                    <input type='text' name="edit_pagamento_valor" step='0.01' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44' class='form-control' disabled>
                </div>
                <div class="col-md-8 mt-2">
                    <label>Observações:</label>
                    <textarea name="edit_pagamento_observacao" class='form-control' disabled></textarea>
                </div>
                <div class="container mt-3 d-flex flex-row-reverse">
                    <button class="btn btn-success ml-2 add_pagamento" disabled>Adicionar</button>
                    <button class="btn btn-primary limpar_pagamento" disabled>Limpar Campos</button>
                </div>
            </div>

            <hr class="hr pagamento_tabela_inicio" style="border: 0.7px dashed rgb(0, 136, 204);display:none;">

            <div class="pagamento_tabela_inicio body-class <?= $darkmode ?>" style="margin-top:20px;display:none;">
                <div class="text-break">
                    <table class="table body-class <?= $darkmode ?>">
                        <thead>
                            <tr>
                                <th style="word-break: normal;">Atribuído</th>
                                <th style="word-break: normal;">Data</th>
                                <th style="word-break: normal;">Método de pagamento</th>
                                <th style="word-break: normal;">Tipo de pagamento</th>
                                <th style="word-break: normal;">Pago</th>
                                <th style="word-break: normal;">Observações</th>
                                <th style="word-break: normal;">Apagar</th>
                            </tr>
                        </thead>
                        <tbody class="pagamento_tabela body-class <?= $darkmode ?>">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    <?php } ?>
</div>