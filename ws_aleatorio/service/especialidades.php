<?php
	include '../util/conexion.php';
	include '../util/utilitario.php';
	//http://localhost/ws_aleatorio/service/especialidades.php
	$dbConn = new Conexion();
	header('Access-Control-Allow-Origin: *');
	if($_SERVER['REQUEST_METHOD'] == 'GET'){	
			$statement = $dbConn->prepare("SELECT cod_tipo_contratacion as codigo, descripcion
			as descripcion FROM tipo_contratacion
			WHERE estado = 1");			
			$statement->execute();
			$statement->setFetchMode(PDO::FETCH_ASSOC);
			header("HTTP/1.1 200 hay datos");
			echo json_encode($statement->fetchAll());
			exit;		
		
	}
	
	
	header("HTTP/1.1 400 Bad Request");
?>