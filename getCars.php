<?php
    $conn = mysqli_connect('localhost:3306', 'root', '', 'carrentalreservationsystem');

    $data = json_decode(file_get_contents('php://input'));
    $value = $data -> value;
    $type = $data -> type;
    
    switch($type){
      case "GET":
        $sql = "SELECT * FROM cars";
        $result = mysqli_query($conn, $sql);
        $output = '[';
        
        while ($rows = mysqli_fetch_array($result)){
          $output .= '{"_id":"' . $rows["_id"] . '",';
          $output .= '"model":"' . $rows["model"] . '",';
          $output .= '"type":"' . $rows["type"] . '",';
          $output .= '"color":"' . $rows["color"] . '",';
          $output .= '"cost":"' . $rows["cost"] . '",';
          $output .= '"unit":"' . $rows["unit"] .'"} ,';
        }
        $output = substr($output , 0, -1);
        $output .="]";

        echo $output;
        break;

      case "ADD":
        $sql = "INSERT INTO cars ".
        "( _id, model, type, color, cost, unit) ".
        "VALUES"."('$value->_id','$value->model','$value->type','$value->color','$value->cost','$value->unit')";
        $result = mysqli_query($conn, $sql);
        if ($result) echo "Insert Success";
        else echo "Insert Failure";
        break;

      case "REMOVE":
        $sql = 'DELETE FROM cars WHERE _id='.$value;
        $result = mysqli_query($conn, $sql);
        if ($result) echo "Delete Success";
        else echo "Delete Failure";
        break;

      case "EDIT":
        $newCar = $value->newCar;
        $sql = "UPDATE cars SET ".
        "_id='$newCar->_id', model='$newCar->model', type='$newCar->type', 
        color='$newCar->color', cost='$newCar->cost', unit='$newCar->unit' WHERE _id='$newCar->_id'";
        $result = mysqli_query($conn, $sql);
        if ($result) echo "Edit Success";
        else echo "Edit Failure";
        break;
    }

?>