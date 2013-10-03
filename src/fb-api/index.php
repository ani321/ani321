<?php
require_once("../fb-sdk/facebook.php");

$config = array();
$config['appId'] = '150361001840537';
$config['secret'] = 'db327f41ac8f629c5a5a464b1ec93acc';

$facebook = new Facebook($config);

?>
<!DOCTYPE html>
<html>
  <head>
    <title>Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="../../assets/js/html5shiv.js"></script>
      <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="//code.jquery.com/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/funciones.js"></script>
  </body>
</html>
