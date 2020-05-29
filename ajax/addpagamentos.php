<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

      if($_SESSION['user_board_perms'][9] == 1){
        $iduser = $_SESSION['user_id'];
        $idboard = $_SESSION['user_board'];
        $idboarduser = $_POST['idboardatual'];
        $data = $_POST['data'];
        $metodo_pagamento = $_POST['metodo_pagamento'];
        $tipo_pagamento = $_POST['tipo_pagamento'];
        $valor = $_POST['valor'];
        $observacao = $_POST['observacao'];
        $pago = $_POST['pago'];
        $falta_pagar = $_POST['falta_pagar'];

        $conn->query("UPDATE board SET valor_pago='$pago', falta_pagar='$falta_pagar' WHERE id='$idboarduser' AND id_board='$idboard'");
        $conn->query("INSERT INTO pagamentos (id, id_board, id_boarduser, id_user, dataCriacao, metodoPagamento, tipoPagamento, valor, observacao) VALUES (NULL, '$idboarduser', '$idboard', '$iduser', '$data', '$metodo_pagamento', '$tipo_pagamento', '$valor', '$observacao')");
    
        echo $conn->insert_id;
      } else {
        echo 0;
      }
    } else {
		header('location: ../assets/logout.php');
	}
?>