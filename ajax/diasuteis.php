<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $idboard = $_SESSION['user_board'];
        $data1 = $_POST['data1'];
        $date2 = $_POST['date2'];
        $feriados = $_POST['feriados'];
        
        function number_of_working_days($startDate, $endDate) //https://stackoverflow.com/questions/23444968/how-can-i-calculate-the-number-of-working-days-between-two-dates
        { //Faisal  
            $workingDays = 0;
            $startTimestamp = strtotime($startDate);
            $endTimestamp = strtotime($endDate);
            for ($i = $startTimestamp; $i <= $endTimestamp; $i = $i + (60 * 60 * 24)) {
                if (date("N", $i) <= 5) $workingDays = $workingDays + 1;
            }
            return $workingDays;
        }

        $workingDays = number_of_working_days($data1, $date2);
        $valorfinal = intval($workingDays) - intval($feriados);

        $conn->query("UPDATE boarduser SET igestaosalario='$data1', fgestaosalario='$date2', fer='$feriados', duteis='$valorfinal' WHERE id_boarduser='$idboard'");

        if($valorfinal<=0){echo 0;}else{echo$valorfinal;}  
    } else {
		header('location: ../assets/logout.php');
	}
?>