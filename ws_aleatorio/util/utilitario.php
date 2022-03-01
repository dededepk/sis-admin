<?php
    function bindAllValues($statement, $params)
    {
        foreach($params as $param => $value)
    {
                $statement->bindValue(':'.$param, $value);
        }
        return $statement;
    }
    function bindAllValuesPosicion($statement, $params, $posicion)
    {
        $veces = 0;
        foreach($params as $param => $value)
        {           
            if($veces == $posicion)
            {
                $statement->bindValue(':'.$param, $value);
            }
            $veces = $veces + 1 ;                
        }
        return $statement;
    }
?>