<?php namespace MYNT;

class Database{

  public static $data_dir = '../data/';

  public static function get_database_path($database_name = null){
    return self::$data_dir . $database_name .'.sql';
  }

  // Databases
  public static function get_databases(){
    if(!is_dir(self::$data_dir)){return [];}
    $lists = [];
    $files = scandir(self::$data_dir);
    for($i=0,$c=count($files); $i<$c; $i++){
      if(preg_match('/^(.+?)\.sql/', $files[$i] , $match)){
        array_push($lists , ['Database'=>$match[1]]);
      }
    }
    return $lists;
  }

  // Tables
  public static function get_tables($database_name=''){
    if(!$database_name){return;}
    $path = self::get_database_path($database_name);
    $datas = [];
    $select = 'SELECT * FROM sqlite_master WHERE type="table"';
    $sql = new \SQLite3($path);
    $res = $sql->query($select);
    while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
      array_push($datas , $row);
    }
    $sql->close();
    return $datas;
  }

  // Columns
  public static function get_columns($database_name='' , $table_name=''){
    if(!$database_name || !$table_name){return;}
    $path = self::get_database_path($database_name);
    $datas = [];
    $select = 'SELECT * FROM sqlite_master WHERE type="table" AND name="'. $table_name .'"';
    $db = new \SQLite3($path);
    $res = $db->query($select);
    $datas = $res->fetchArray(SQLITE3_ASSOC);
    $db->close();
    $sql = isset($datas['sql']) ? $datas['sql'] : null;
    if($sql && preg_match('/\((.+?)\)$/iums' , trim($sql) , $match)){
      $sql = str_replace("\r",'',$match[1]);
      $sp1 = explode(",\n" , $sql);
      $res2 = [];
      for($i=0,$c=count($sp1); $i<$c; $i++){
        if(!$sp1[$i]){continue;}
        $str = trim($sp1[$i]);
        $sp1[$i] = str_replace("\n",'', $str);
        $sp2 = explode(' ', $sp1[$i]);
        array_push($res2 , [
          'name' => $sp2[0],
          'type' => $sp2[1],
          'content' => implode(' ',array_slice($sp2 , 2)),
          'memo' => $sp1[$i],
        ]);
      }
      return $res2;
    }
    else{
      return null;
    }
  }
  
  public static function only_object_keys($data=[]){
    $new_datas = [];
    foreach($data as $key => $val){
      if(preg_match('/^\d+?$/' , $key)){continue;}
      $new_datas[$key] = mb_convert_encoding($val , 'UTF-8' , 'EUC-JP');
    }
    return $new_datas;
  }

  // Datas
  public static function get_datas($database_name , $sql_text=''){
    if(!$sql_text){return;}
    $path = self::get_database_path($database_name);
    $datas = [];
    $sql = new \SQLite3($path);
    $res = $sql->query($sql_text);
    while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
      array_push($datas , $row);
    }
    $sql->close();
    return $datas;
  }

}