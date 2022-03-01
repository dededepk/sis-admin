<?php
	include '../util/conexion.php';
	include '../util/utilitario.php';
	
	//http://localhost/ws_aleatorio/service/credenciales.php
	$dbConn = new Conexion();
	header('Access-Control-Allow-Origin: *');
	if($_SERVER['REQUEST_METHOD'] == 'POST'){	
			$input = $_POST;
			$statement = $dbConn->prepare("SELECT codigo, usuario FROM usuario WHERE usuario = :in_usuario AND clave = :in_clave");
			bindAllValues($statement, $input);
			$statement->execute();
			$statement->setFetchMode(PDO::FETCH_ASSOC);
			header("HTTP/1.1 200 hay datos");
			echo json_encode($statement->fetchAll());
			exit;	
		
	}
	
	
	header("HTTP/1.1 400 Bad Request");
?>