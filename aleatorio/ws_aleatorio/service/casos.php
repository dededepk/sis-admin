<?php
	include '../util/conexion.php';
	include '../util/utilitario.php';
	
	//http://localhost/ws_aleatorio/service/casos.php
	$dbConn = new Conexion();
	header('Access-Control-Allow-Origin: *');
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
			$input = $_POST;
			$in_caso = $input['in_caso'];
			$in_abogado = $input['in_abogado'];		
			$sql_caso = "INSERT INTO caso
			SELECT (MAX(id) + 1),'$in_caso',0,NOW(),NOW()
			FROM caso";
			$statement = $dbConn->prepare($sql_caso);
			$statement->execute();
			$sql_caso_id = 
			"SELECT MAX(id) as id
			FROM caso WHERE nombre = '$in_caso'";
			$exec_obtener_id = $dbConn->prepare($sql_caso_id);
			$exec_obtener_id->execute();
			$exec_obtener_id->setFetchMode(PDO::FETCH_ASSOC);
			header("HTTP/1.1 200 hay datos");
			$data = $exec_obtener_id -> fetchAll();         
            if($data){
                foreach ($data as $obj) 
				{ 
				$cod_caso =  $obj['id'];
				$lista_abogado = explode(",",$in_abogado);
				foreach($lista_abogado as $id_abogado)
					{
					$sql_caso_abogado = 
					"INSERT INTO arbirtrocaso
					SELECT (MAX(id) + 1),$id_abogado,$cod_caso,NOW(),1
					FROM arbirtrocaso";					
					$exec_caso_abogado = $dbConn->prepare($sql_caso_abogado);
					$exec_caso_abogado->execute();
					$exec_caso_abogado->setFetchMode(PDO::FETCH_ASSOC);
					}	
				}		
				$respuesta = array('codigo'=> 1);
				$respuesta += array('mensaje'=> "Se registro correctamente");
				echo json_encode($respuesta);
			}
			else
			{
				$respuesta = array('codigo'=> 0);
				$respuesta += array('mensaje'=> "Problemas, no se logró registrar");
				echo json_encode($respuesta);
			}
			exit;	
		
	}
	
	
	header("HTTP/1.1 400 Bad Request");
?>