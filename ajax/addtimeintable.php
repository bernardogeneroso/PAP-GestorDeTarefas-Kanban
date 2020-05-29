<?php
if (isset($_POST['update']) && $_POST['update'] == 1) {
  session_start();

  include_once('../bd/bd.php');

  function decimalHours($time)
  {
    $hms = explode(":", $time);
    return ($hms[0] + ($hms[1] / 60) + ($hms[2] / 3600));
  }

  $iduser = $_SESSION['user_id'];
  $idboard = $_SESSION['user_board'];
  $tipotrabalho = $_SESSION['user_tipotrabalho'];
  $idtarefa = $_POST['idtarefa'];
  $timeAtual = $_POST['timeAtual'];
  $imageUrl = $_POST['imageUrl'];
  $currentDe = $_POST['currentDe'];
  $currentPara = $_POST['currentPara'];
  
  date_default_timezone_set("Europe/Lisbon");
  $hora = date_create();
  $horatual = $hora->format('d-m-Y');
  $dataRegisto = '';
  $diasTrabalho = '';
  $tempoTrabalho = '';
  $tempoTrabalhoDias = '';
  $salario = '';

  $conn->query("INSERT INTO boardperiodotrabalho (id, id_board, id_boarduser, id_user, atribuito, de, para, tempoTotal) VALUES (NULL, '$idtarefa', '$idboard', '$iduser', '$imageUrl', '$currentDe', '$currentPara', '$timeAtual')");

  if ($tipotrabalho >= 1) {

    if ($tipotrabalho == 1) {
      $salario = 'salario_mensal';
    } else if ($tipotrabalho == 2) {
      $salario = 'salario_semanal';
    }

    $sql = "SELECT dataRegisto, dias_semanais_trabalho, tempo_trabalho_horas, tempo_trabalho_dias, $salario FROM boardgestorsalario WHERE id_boarduser='$idboard' AND id_user='$iduser'";
    $result = mysqli_query($conn, $sql);
    if ($row_cnt = $result->num_rows) {
      while ($row = mysqli_fetch_row($result)) {
        $dataRegisto = $row[0];
        $diasTrabalho = $row[1];
        $tempoTrabalho = $row[2];
        $tempoTrabalhoDias = $row[3];
        $salario = $row[4];
      }
    }

    if ($horatual != $dataRegisto) {
      $diasTrabalho = $diasTrabalho + 1;
      $conn->query("UPDATE boardgestorsalario SET dataRegisto='$horatual', dias_semanais_trabalho='$diasTrabalho' WHERE id_boarduser='$idboard' AND id_user='$iduser'");
      if ($tipotrabalho == 1) {
        $calculo = (floatval($salario) / floatval($tempoTrabalhoDias)) * intval($diasTrabalho);
        $conn->query("UPDATE boardgestorsalario SET receita_final='$calculo' WHERE id_boarduser='$idboard' AND id_user='$iduser'");
      }
    }

    if ($tipotrabalho == 2) {
      if ($tempoTrabalho == '' || $tempoTrabalho == null) {
        $time2 = '00:00:00';
      } else {
        $time2 = $tempoTrabalho;
      }
      $timearray = explode(":", $time2);
      $cenvertedTime = date('H:i:s', strtotime('+' . $timearray[0] . ' hour +' . $timearray[1] . ' minutes +' . $timearray[2] . ' seconds', strtotime($timeAtual)));
      $horastodeciaml = decimalHours($cenvertedTime);
      $calculo = (floatval($salario) * floatval($horastodeciaml)) * intval($diasTrabalho);
      $conn->query("UPDATE boardgestorsalario SET tempo_trabalho_horas='$cenvertedTime', receita_final='$calculo' WHERE id_boarduser='$idboard' AND id_user='$iduser'");
    }
  }
} else {
  header('location: ../assets/logout.php');
}
