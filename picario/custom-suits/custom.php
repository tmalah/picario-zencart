<?php

if (isset($_GET['id']) && $_GET['id'] != '') { 
    
    include_once('../includes/configure.php');

    $link = mysql_connect(DB_SERVER, DB_SERVER_USERNAME, DB_SERVER_PASSWORD)
            or die('Can\'t connect to database: ' . mysql_error());
    mysql_select_db(DB_DATABASE, $link) or die('Can\'t select database');
    
        $currency = 'USD';
    
        $query = "select value from " . DB_PREFIX . "sessions
                  where sesskey = '" . $_GET['id'] . "'
                  and expiry > '" . time() . "'";
        //echo $query; exit();
        $result = mysql_query($query) or die('Query error: ' . mysql_error());
        if (mysql_numrows($result) > 0) {
            $line = mysql_fetch_array($result, MYSQL_ASSOC);
            $session = base64_decode($line['value']);        
            $sess_array = explode(';', $session);
            foreach ($sess_array as $sess_item) {
                $sess1_array = explode('|', $sess_item);
                $sess1_array[0] = str_replace('a:0:{}}', '', $sess1_array[0]);
                if ($sess1_array[0] == 'currency') {
                    //$sess1_array[1] = str_replace('"', '', $sess1_array[1]);
                    $sess1_array[1] = str_replace('s:3:', '', $sess1_array[1]);
                    $currency = $sess1_array[1];
                }
            }
        }
        
        //echo $currency; exit();
        $encoded = base64_decode($line['value']);
        $new_value = str_replace($currency, '"'.$_GET['curr'].'"', $encoded);
        //echo $new_value; exit();
        $query = "UPDATE " . DB_PREFIX . "sessions
                  SET value = '".base64_encode($new_value)."'
                  where sesskey = '" . $_GET['id'] . "'";
        //echo $query; exit();
        $result = mysql_query($query) or die('Query error: ' . mysql_error());
        
    echo 'SET '.$_GET['curr'];
} 


?>