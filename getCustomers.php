<?php
    $conn = mysqli_connect('localhost:3306', 'root', '', 'carrentalreservationsystem');

    $data = json_decode(file_get_contents('php://input'));
    $value = $data -> value;
    $type = $data -> type;

    switch ($type) {
      case "GET":
        $sql = "SELECT * FROM customer";
        $result = mysqli_query($conn, $sql);
        $output = '[';
        
        while ($rows = mysqli_fetch_array($result)){
          $output .= '{"_id":"' . $rows["_id"] . '",';
          $output .= '"fullName":"' . $rows["fullName"] . '",';
          $output .= '"gender":"' . $rows["gender"] . '",';
          $output .= '"contact":"' . $rows["contact"] . '",';
          $output .= '"idCard":"' . $rows["idCard"] . '",';
          $output .= '"address":"' . $rows["address"] . '"} ,';
        }
        $output = substr($output , 0, -1);
        $output .="]";

        echo $output;
        break;

      case "ADD":
        $sql = "INSERT INTO customer ".
        "( _id, fullName, gender, contact, idCard, address) ".
        "VALUES"."('$value->_id','$value->fullName', '$value->gender ','$value->contact','$value->idCard','$value->address')";
        $result = mysqli_query($conn, $sql);
        if ($result) echo "Insert Success";
        else echo "Insert Failure";
        break;

      case "REMOVE":
        $sql = 'DELETE FROM customer WHERE _id='.$value;
        $result = mysqli_query($conn, $sql);
        if ($result) echo "Delete Success";
        else echo "Delete Failure";
        break;

      case "EDIT":
        $newCustomer = $value->newCustomer;
        $sql = "UPDATE customer SET ".
        "_id='$newCustomer->_id', fullName='$newCustomer->fullName', gender='$newCustomer->gender', 
        contact='$newCustomer->contact', idCard='$newCustomer->idCard', address='$newCustomer->address' WHERE _id='$value->id'";
        $result = mysqli_query($conn, $sql);
        if ($result) echo "Edit Success";
        else echo "Edit Failure";
        break;
    }
    
    

    
    /*

    $nums = mysqli_num_rows($result);
    $rows=mysqli_fetch_array($result);
    if ($nums>=1) {
      http_response_code(200);
      $output = "";
      $output .= '{"username":"' . $rows["username"] . '",';
      $output .= '"password":"' . $rows["password"] . '",';
      $output .= '"Status":"200"}';
      echo  $output;
    }
    else {
      http_response_code(202);
    }*/

?>