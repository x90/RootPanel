<?php

/**
*   该文件包含 lpHander 的类定义.
*
*   @package LightPHP
*/

abstract class lpHandler
{
    static public function callAction($action, $args)
    {
        ob_start();

        $handler = get_called_class();

        if(!$action)
            $action = "__invoke";

        $reflection = new ReflectionMethod($handler, $action);
        if(!$reflection->isPublic())
            throw new Exception("{$handler}::{$action} is not a public function");

        return $reflection->invokeArgs(new $handler, $args);
    }

    static protected function isPost()
    {
        return $_SERVER["REQUEST_METHOD"] == "POST";
    }

    public function __construct()
    {

    }
}

abstract class lpJSONHandler extends lpHandler
{
    static public function callAction($action, $args)
    {
        $result = parent::callAction($action, $args);
        if($result)
            print json_encode($result);
        return $result;
    }
}
