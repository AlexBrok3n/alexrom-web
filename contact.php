<?php
// Guardar los datos recibidos en variables:
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
// Definir el correo de destino:
$dest = "alexrom.las@gmail.com"; 
 
// Estas son cabeceras que se usan para evitar que el correo llegue a SPAM:
$headers = "From: $name $email\r\n";
$headers .= "X-Mailer: PHP5\n";
$headers .= 'MIME-Version: 1.0' . "\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
// Aqui definimos el asunto y armamos el cuerpo del mensaje
$asunto = "Contacto";
$cuerpo = "<strong>Nombre:</strong> ".$name."<br>";
$cuerpo .= "<strong>Email:</strong> ".$email."<br>";
$cuerpo .= "<strong>Mensaje:</strong> ".$message;
 
// Esta es una pequena validación, que solo envie el correo si todas las variables tiene algo de contenido:
if($name != '' && $email != '' && $message != ''){
    mail($dest,$asunto,$cuerpo,$headers); //ENVIAR!
}
?>