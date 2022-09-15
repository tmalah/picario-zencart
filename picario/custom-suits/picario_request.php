<?php
//echo '!<pre>'; print_r($_POST); echo '</pre>'; //exit();
if (isset($_GET['action']) && in_array($_GET['action'], array('post', 'get'))) {
    
    
    $ch = curl_init();
 
    curl_setopt($ch, CURLOPT_URL, $_POST['url'] . "?api_key=2d5efe1d41694b0cb792b895bcf1b8a3");  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        
    if ($_GET['action'] == 'post') {
        
        $data = $_POST;
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        
    } elseif ($_GET['action'] == 'get') {
        
        
        
    }
        
    //$header = array('Contect-Type:application/xml', 'Accept:application/xml'); 
    $header = array('Contect-Type:application/json', 'Accept:application/json');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    
    curl_setopt($ch, CURLOPT_FAILONERROR,1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);

        // $output contains the output string 
        $output = curl_exec($ch); 
//echo '!!<pre>'; print_r($output); echo '</pre>'; //exit();
        // close curl resource to free up system resources 
        curl_close($ch);    
        
        echo $output;  
    
}

?>