<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		function rgb_to_hex( string $rgba ) : string {
	        if ( strpos( $rgba, '#' ) === 0 ) {
	            return $rgba;
	        }

	        preg_match( '/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i', $rgba, $by_color );

	        return sprintf( '#%02x%02x%02x', $by_color[1], $by_color[2], $by_color[3] );
	    }

		session_start();

		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];
		//$atribudo = $_SESSION['estilo_img'];
		$id_board = $_SESSION['user_board'];
		$nameTar = $_POST['nameTar'];
		$descricao = $_POST['descricao'];
		$data = $_POST['data'];
		$tempoEstimado = $_POST['tempoEstimado'];
		$boardid = $_POST['boardid'];
		$cor = rgb_to_hex($_POST['cor']);
		$dataCriacao = date('d-m-Y H:i:s');
		
		$max = 0;
		
		$sql = "SELECT MAX(position)+1 FROM listatarefas WHERE id_board = '$id_board'";
		$result=mysqli_query($conn,$sql);

        if($row_cnt = $result->num_rows){
            while($row=mysqli_fetch_row($result)){
                if($row[0] != 0){
					$max = $row[0];
				} else {
					$max = 1;
				}
            }
        }

		$conn->query("INSERT INTO listatarefas (id_listatarefas, id_user, id_board, id_boardtarefas, position, nomeTarefa, dataCriacao, dataVencimento, tempoEstimado, prioridade, descricao) 
					VALUES (NULL, '$id', '$id_board', '$boardid', '$max', '$nameTar', '$dataCriacao', '$data', '$tempoEstimado', '$cor', '$descricao')");
		$last_id = $conn->insert_id;
		mysqli_set_charset($conn,"utf8");

		$origem = array($last_id, $max, $cor);
		echo json_encode($origem);

	} else {
		header('location: ../assets/logout.php');
	}
?>