<?

include __DIR__."/config.php";

$from = $_GET['from'] ? $_GET['from'] : false;
$to   = $_GET['to']   ? $_GET['to']   : false;

$src  = realpath(__DIR__."/../../store/".$from);
$dest = __DIR__."/../../store/".$to;

//print_r($src);print_r("\n");print_r($dest);exit;

//if(!$src)    die('{"error":"no such file"}');


if(file_exists($src)) {
	rename($src,$dest);
} 

echo '{"ok":1}';