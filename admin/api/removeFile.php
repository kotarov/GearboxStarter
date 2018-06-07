<?
/* GET directory, file
 */
require(__DIR__."/config.php");

$directory = $_GET['directory'] ? $_GET['directory'] : false;
$fileName  = $_GET['file']   ? $_GET['file']      : false;
$file      = realpath(__DIR__."/../../store/".$directory."/".$fileName);

if(!$directory)        die('{"error":"no directory defined"}');

try{
	if(file_exists($file)) {
		@unlink($file);
	}

	echo '{"ok":1,"file":"'.$fileName.'"}';
} catch( Exception $e ){
	echo '{"error":"Directory is opened - '.$e.getMEssage().'"}';
}