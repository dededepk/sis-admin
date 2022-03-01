<?php
	include '../util/conexion.php';
	include '../util/utilitario.php';
	//http://localhost/ws_aleatorio/service/usuarios.php?in_codigo=2
	$dbConn = new Conexion();
	header('Access-Control-Allow-Origin: *');
	if($_SERVER['REQUEST_METHOD'] == 'GET'){	
            $input = $_GET;
			$statement = $dbConn->prepare("SELECT codigo, usuario FROM usuario WHERE codigo = :in_codigo");		
            bindAllValues($statement, $input);	
			$statement->execute();
			$statement->setFetchMode(PDO::FETCH_ASSOC);
			header("HTTP/1.1 200 hay datos");
			echo json_encode($statement->fetchAll());
			exit;
		
	}
	
	
	header("HTTP/1.1 400 Bad Request");
?>