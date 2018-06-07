<?
/* GET name
 * FILES content
 * 
 * $_FILES => [ 
 *     { path: { name:"", type:"", tmp_name:"", error:0, size:000 } } 
 * ]
 */

require(__DIR__."/config.php");

$dir    = realpath(__DIR__."/../../store/");
$error  = array();

forEach( array_keys($_FILES) AS $key ){
    $path = $key;
    $path = $dir.DIRECTORY_SEPARATOR.$path;

    $file = $path.DIRECTORY_SEPARATOR.basename($_FILES[$key]["name"]);
    $type = pathinfo($file, PATHINFO_EXTENSION);
    $size = filesize($_FILES[$key]["tmp_name"]);

    if( !file_exists($path) ) @mkdir($path, 007, true);
    if(  file_exists($file) ) unlink($file);
    
    move_uploaded_file( $_FILES[$key]["tmp_name"], $file );
}


if(sizeof($error) > 0){
    echo '{"error":"Errors"}';
} else {
    echo '{"ok":1}';
}




/*
Array
(
    [name] => Array
        (
            [0] => foo.txt
            [1] => bar.txt
        )

    [type] => Array
        (
            [0] => text/plain
            [1] => text/plain
        )

    [tmp_name] => Array
        (
            [0] => /tmp/phpYzdqkD
            [1] => /tmp/phpeEwEWG
        )

    [error] => Array
        (
            [0] => 0
            [1] => 0
        )

    [size] => Array
        (
            [0] => 123
            [1] => 456
        )
)
*/