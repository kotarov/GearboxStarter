<?php
/* GET collection, id
 * POST {{json_data}}
 */
require(__DIR__."/config.php");

$collection = $_GET['collection'] ? $_GET['collection'] : false;
$dir        = realpath(__DIR__."/../../store");
$file       = $dir."/".$collection.".json";
$data       = array();

if(!$collection)        die('{"error":"no collection defined"}');

if( !file_exists($dir) )  @mkdir($dir,007,true);
if( file_exists($file) )  $data = json_decode( file_get_contents($file), true );
if( !$_POST['id']      )  $_POST['id'] = time();

array_push($data, $_POST);
file_put_contents($file, json_encode($data, JSON_ENCODE_PARAMS));

echo '{"ok":1,"id":"'.$_POST['id'].'"}';

?>
