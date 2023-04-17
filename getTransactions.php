<?php
    $conn = mysqli_connect('localhost:3306', 'root', '', 'carrentalreservationsystem');

    $data = json_decode(file_get_contents('php://input'));
    $type = $data -> type;
    $value = $data -> value;
    
    switch($type){
      case "GET":
        $sql = "SELECT * FROM transaction";
        $result = mysqli_query($conn, $sql);
        $output = '[';
        
        while ($rows = mysqli_fetch_array($result)){
          $output .= '{"transactionNo":"' . $rows["transactionNo"] . '",';
          $output .= '"customer":"' . $rows["customer"] . '",';
          $output .= '"car":"' . $rows["car"] . '",';
          $output .= '"carType":"' . $rows["carType"] . '",';
          $output .= '"borrowDate":"' . $rows["borrowDate"] . '",';
          $output .= '"returnDate":"' . $rows["returnDate"] . '",';
          $output .= '"price":' . $rows["price"] . ',';
          $output .= '"status":"' . $rows["status"] . '"} ,';
        }
        $output = substr($output , 0, -1);
        $output .="]";

        echo $output;
        break;

      case "ADD":
        $sql = "INSERT INTO transaction ".
        "( transactionNo, customer, car, carType, borrowDate, returnDate, price, status) ".
        "VALUES"."('$value->transactionNo','$value->customer', '$value->car','$value->carType','$value->borrowDate','$value->returnDate', 
        '$value->price','$value->status')";
        $result = mysqli_query($conn, $sql);
        if ($result) echo "Insert Success";
        else echo "Insert Failure";
        break;

      case "REMOVE":
        $sql = 'DELETE FROM transaction WHERE transactionNo='.$value;
        $result = mysqli_query($conn, $sql);
        if ($result) echo "Delete Success";
        else echo "Delete Failure";
        break;

      case "EDIT":
        $newTrans = $value->newTrans;
        $sql = "UPDATE transaction SET ".
        "transactionNo='$newTrans->transactionNo', customer='$newTrans->customer', car='$newTrans->car', 
        carType='$newTrans->carType', borrowDate='$newTrans->borrowDate', returnDate='$newTrans->returnDate', price='$newTrans->price',
        status='$newTrans->status' WHERE transactionNo='$value->id'";
        $result = mysqli_query($conn, $sql);
        if ($result) echo "Edit Success";
        else echo "Edit Failure";
        break;
    }

?>