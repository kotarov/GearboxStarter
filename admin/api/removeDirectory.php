<?php
/* GET directory
 */
require(__DIR__."/config.php");

$directory = $_GET['directory'] ? $_GET['directory'] : false;
//$directory = str_replace("/", DIRECTORY_SEPARATOR, $directory);
$dir       = realpath(__DIR__."/../../store/".$directory."/");

if(!$directory)        die('{"error":"no directory defined"}');

array_map(function($d){@unlink($d);}, glob("$dir/*.*"));
@rmdir($dir);

echo '{"ok":1,"directory":"'.$directory.'"}';

?>
