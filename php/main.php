<?php namespace MYNT;

require_once('database.php');

switch(@$_POST['mode']){
  case 'get_databases':
    $database = new \MYNT\Database();
    $datas = $database->get_databases();
    echo json_encode($datas);
    break;

  case 'get_tables':
    if(!@$_POST['database_name']){break;}
    $database = new \MYNT\Database();
    $datas = $database->get_tables(@$_POST['database_name']);
    echo json_encode($datas);
    break;

  case 'get_columns':
    if(!@$_POST['database_name'] || !@$_POST['table_name']){break;}
    $database = new \MYNT\Database();
    $datas = $database->get_columns($_POST['database_name'] , $_POST['table_name']);
    echo json_encode($datas);
    break;

  case 'get_datas':
    if(!@$_POST['database_name'] || !@$_POST['table_name']){break;}
    $database = new \MYNT\Database();
    $datas = $database->get_datas(@$_POST['database_name'] , $_POST['sql_text']);
    echo json_encode($datas);
    break;
}
