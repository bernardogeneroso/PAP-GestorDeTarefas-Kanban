<?php
if (isset($_POST['update']) && $_POST['update'] == 1) {
  session_start();

  include_once('../bd/bd.php');

  if ($_SESSION['user_board_perms'][9] == 1) {
    $iduser = $_SESSION['user_id'];
    $idboard = $_SESSION['user_board'];
    $id = $_POST['id'];
    $editBoardID = $_POST['editBoardID'];
    $novo_falta_pagar = $_POST['novo_falta_pagar'];
    $novo_valor_pago = $_POST['novo_valor_pago'];

    $conn->query("DELETE FROM pagamentos WHERE id='$id' AND id_board='$editBoardID' AND id_boarduser='$idboard'");
    $conn->query("UPDATE board SET falta_pagar= '$novo_falta_pagar', valor_pago='$novo_valor_pago' WHERE id='$editBoardID' AND id_board='$idboard'");
    echo 1;
  } else {
    echo 0;
  }
} else {
  header('location: ../assets/logout.php');
}
