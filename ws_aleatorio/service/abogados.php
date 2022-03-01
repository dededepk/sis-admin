<?php
	include '../util/conexion.php';
	include '../util/utilitario.php';
	//http://localhost/ws_aleatorio/service/abogados.php?in_especialidad=1
	$dbConn = new Conexion();
	header('Access-Control-Allow-Origin: *');
	if($_SERVER['REQUEST_METHOD'] == 'GET'){	
			$input = $_GET;
			$statement = $dbConn->prepare
            ("SELECT 
            a.IdArbitro AS cod_abogado,
            CONCAT(a.NomArbitro, ' ', a.ApaArbitro, ' ', a.ApmArbitro) AS nombre,
            a.foto,
            a.CalArbitro AS cal,
            CASE a.CarArbitro 
			when  2  then 'Árb. Único/Presidente'
			when  3 then  'Árb. Parte'
			when  1 then 'Sin cargo'
			END AS tipo,
			CASE a.rnaosce when 0 then '' ELSE 'RNA-OSCE' END AS certificado
            FROM arbitro_tipo_contratacion atc
            INNER JOIN arbitros a
            ON a.IdArbitro = atc.cod_arbitro
            WHERE atc.cod_tipo_contratacion = :in_especialidad
            AND a.Estado = 0
            AND atc.estado = 1
            AND 
			(SELECT COUNT(ac.idArbitro)
            FROM arbirtrocaso ac
            WHERE ac.estado = 1
            AND ac.idArbitro = a.IdArbitro) = 0
            ORDER BY 2");			
            bindAllValues($statement, $input);
			$statement->execute();
            header("HTTP/1.1 200 hay datos");    
            $statement->setFetchMode(PDO::FETCH_ASSOC);   
            $data=$statement -> fetchAll();         
            if($data){
                $datos = array();
                foreach ($data as $obj) {                    
                    $cod_abogado = (int) $obj['cod_abogado'];
                    $query = $dbConn->prepare(
                        "SELECT e.idEspecialidad AS codigo,
                        e.NomEspecialidad AS nombre
                        FROM arbitroespecialidad ae
                        INNER JOIN especialidad e
                        ON ae.idEspecialidad = e.idEspecialidad
                        WHERE ae.idArbitro = $cod_abogado"
                    );
                    $query->execute();
                    $query->setFetchMode(PDO::FETCH_ASSOC); 
                    $obj+=array('especialidades'=> $query->fetchAll());
                    array_push($datos, $obj);

                }
                echo json_encode($datos);
            }
            else{
               echo json_encode($data);
            }exit;		
		
	}
	
	
	header("HTTP/1.1 400 Bad Request");
?>