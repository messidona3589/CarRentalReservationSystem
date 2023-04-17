<?php
    $conn = mysqli_connect('localhost:3306', 'root', '', 'carrentalreservationsystem');
    
    $data = json_decode(file_get_contents("php://input"));
    $value = $data -> value;
    $type = $data -> type;

    switch($type){
      case "LOGIN":
        $username = $value -> username;
        $password = $value -> password;
        $sql = "SELECT * FROM staff WHERE username='".$username."' AND password='".$password."'";
        $result = mysqli_query($conn, $sql);    

        $nums = mysqli_num_rows($result);
        $rows=mysqli_fetch_array($result);
        if ($nums>=1) {
          http_response_code(200);
          $output = "";
          $output .= '{"username":"' . $rows["username"] . '",';
          $output .= '"password":"' . $rows["password"] . '",';
          $output .= '"fullName":"' . $rows["fullName"] . '",';
          $output .= '"Status":"200"}';
          echo  $output;
        }
        else {
          http_response_code(202);
        }
        break;

      case "GET":
        $sql = "SELECT * FROM staff WHERE fullName='" . $value . "'";
        $result = mysqli_query($conn, $sql);
        $rows=mysqli_fetch_array($result);
      
        $output = "";
        $output .= '{"_id":"' . $rows["_id"] . '",';
        $output .= '"username":"' . $rows["username"] . '",';
        $output .= '"password":"' . $rows["password"] . '",';
        $output .= '"fullName":"' . $rows["fullName"] . '",';
        $output .= '"email":"' . $rows["email"] . '",';
        $output .= '"contact":"' . $rows["contact"] . '"}';
        echo  $output;
        
        break;

      case "ADD":
        //Before inserting the information on the database, the company has to verify the staff
        $datas = "('$value->_id', '$value->username', '$value->fullName ','$value->password','$value->contact','$value->email')";
        if ($datas) echo "Verification in Process...";
        else echo "Data Invalid";
        break;
    }

?>