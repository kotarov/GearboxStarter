<?php
/* GET collection, id
 * POST {{json_data}}
 */
require(__DIR__."/config.php");

$collection = $_GET['collection'] ? $_GET['collection'] : false;
$id         = $_GET['id']         ? $_GET['id']         : false;
$file       = __DIR__."/../../store/".$collection.".json";

if(!$collection)        die('{"error":"No collection defined"}');
if(!$id)				die('{"error":"No id defined"}');
if(!file_exists($file)) die('{"error":"No such collection '.$collection.'"}');
if(sizeof($_POST) < 1)  die('{"error":"No POST data"}');

$data = json_decode( file_get_contents($file), true );

forEach($data AS $i=>$row){
	if($row['id']==$id) {
		forEach($_POST AS $key=>$val){
			$data[$i][$key] = $val;
		}
	}
}

file_put_contents($file, json_encode($data, JSON_ENCODE_PARAMS));

echo '{"ok":1}';

?>
