<?php
	class Conexion extends PDO
	{
		private $hostBd = '64.227.13.153';
		private $nombreBd = 'prueba_prueba';
		private $usuarioBd = 'prueba_prueba';
		private $passwordBd = 'Minimo12**';
		
		public function __construct()
		{
			try{
				parent::__construct('mysql:host=' . $this->hostBd . ';dbname=' . $this->nombreBd . ';charset=utf8', $this->usuarioBd, $this->passwordBd, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
				
				} catch(PDOException $e){
				echo 'Error: ' . $e->getMessage();
				exit;
			}
		}
	}
?>