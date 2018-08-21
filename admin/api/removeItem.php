<?php
/* GET collection, id
 */
require(__DIR__."/config.php");

$collection = $_GET['collection'] ? $_GET['collection'] : false;
$id         = $_GET['id']         ? $_GET['id']         : false;
$file       = __DIR__."/../../store/".$collection.".json";

if(!$collection)        die('{"error":"no collection defined"}');
if(!file_exists($file)) die('{"error":"No such collection '.$collection.'"}');

$data = json_decode( file_get_contents($file), true );

forEach($data AS $i=>$row){
	if($row['id']==$id) {
		unset($data[$i]);
	}
}

file_put_contents($file, json_encode(array_values($data), JSON_ENCODE_PARAMS));

echo '{"ok":1,"id":"'.$id.'"}';

?>
