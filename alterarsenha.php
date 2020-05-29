<?php 
if(!empty($_GET['h'])){
    $iduserGET = $_GET['h'];
    $iduser = '';
    date_default_timezone_set("Europe/Lisbon");
	$hora = date_create();
    $horatual = $hora->format('d-m-Y H:i');
    $datatual = $hora->format('d-m-Y');
    include_once('bd/bd.php');

    $sql = "SELECT user_id, user_statushoralimite FROM login_users WHERE SHA2(user_id, 512)='$iduserGET'";
    $result = mysqli_query($conn, $sql);
    if ($row_cnt = $result->num_rows) {
        while ($row = mysqli_fetch_row($result)) {
            $iduser = $row[0];
            $horaLimite = $row[1];
        }
        $horaLimiteData = substr($horaLimite,0,10);
        if($horaLimite == ''){
            header('location: login');
        } else if($horaLimite < $horatual){
            header('location: login');
        } else if($horaLimiteData != $datatual){
            header('location: login');
        }
    } else {
        header('location: login');
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
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
    <script src="assets/script/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <title>Alterar senha - Work4theNoob</title>
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
        .topNome {
            text-align:center;
            margin-top:11%;
            font-size:2pc;
        }
        .container-perns {
            text-align:center;
            font-size:2pc;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
    <script>
        var iduser = "<?php echo $iduserGET ?>";
        $(document).on('click', '.alterarPassword', function() { 
            var um = $('input[name="passwordatual"]').val()
            var dois = $('input[name="novapassword"]').val()
            var tres = $('input[name="repetirnovapassword"]').val()
            var umlength = $('input[name="passwordatual"]').val().length
            var doislength = $('input[name="novapassword"]').val().length
            var treslength = $('input[name="repetirnovapassword"]').val().length

            if(um==''||dois==''||tres==''){
                $('#mensagens').html('<p style="color: #FF7274">Existem campos vazios</p>')
            } else if(umlength < 6 || doislength < 6 ||  treslength < 6){
                $('#mensagens').html('<p style="color: #FF7274">A palavra-passe tem que ter pelo menos 6 caracteres</p>')
            } else if(dois !== tres) {
                $('#mensagens').html('<p style="color: #FF7274">A nova palavra-passe não concide com a repetição da mesma</p>')
            } else {
                $('#mensagens').html('<p style="color: green">A verificar!</p>')
                $.ajax({ //chama o ajax
                    url: 'ajax/alterarsenhapagina', //link para redirecionamento dá página
                    method: 'POST', //o método
                    dataType: 'text',
                    data: { //os dados que passar pelo POST
                        update: 1,
                        iduser: iduser,
                        um: um,
                        tres: tres
                    }, success: function(data){ //se tudo correr bem onde foi direcionado irá entrar nesta linha, com a resposta como um argumento
                        if(data == 2){
                            $('#mensagens').html('<p style="color: green">Palavra-passe alterada. Será redirecionado para a página de Login em 5 segundos</p>')
                            setTimeout(function(){ window.location.href = 'login' }, 5000);
                        } else if(data == 1){
                            $('#mensagens').html('<p style="color: #FF7274">A palavra-passe atual não é válida, tente novamente.</p>')
                        } else {
                            $('#mensagens').html('<p style="color: #FF7274">Aconteceu um erro. Será redirecionado para a página de Login em 5 segundos</p>')
                            setTimeout(function(){ window.location.href = 'login' }, 5000);
                        }
                    }
                });
            }
        });
    </script>
</head>
<body>
    <div>
        <div class="topNome"> 
            <h1>Work4thenoob</h1>
        <div>
        <div class="container-perns"> 
            <div class="w-50">
                <div class="input-group mb-3">
                    <input type="password" minlength="6" class="form-control" name="passwordatual" placeholder="Palavra-passe atual">
                    <div class="input-group-append">
                        <span class="input-group-text"><img src="https://img.icons8.com/metro/52/000000/lock.png" style="height: 16px"/></span>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="password" minlength="6" class="form-control" name="novapassword" placeholder="Nova palavra-passe">
                    <div class="input-group-append">
                        <span class="input-group-text"><img src="https://img.icons8.com/metro/52/000000/lock.png" style="height: 16px"/></span>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="password" minlength="6" class="form-control" name="repetirnovapassword" placeholder="Repetir nova palavra-passe">
                    <div class="input-group-append">
                        <span class="input-group-text"><img src="https://img.icons8.com/metro/52/000000/lock.png" style="height: 16px"/></span>
                    </div>
                </div>
                <span id="mensagens"></span>
                <div>
                    <a href="login"><button class="btn btn-primary btn-lg">Voltar ao login</button></a>
                    <button class="btn btn-success btn-lg alterarPassword">Alterar palavra-passe</button>
                </div>
                
            </div>
        </div>
    </div>
</body>
</html>