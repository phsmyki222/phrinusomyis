<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://phrinusomyis.com');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


/*
|--------------------------------------------------------------------------
| CONFIGURATION
|--------------------------------------------------------------------------
*/

$recipient =
    'info@PHRINUSOMYIS.com';


/*
|--------------------------------------------------------------------------
| READ REQUEST
|--------------------------------------------------------------------------
*/

$rawInput =
    file_get_contents(
        'php://input'
    );


$data =
    json_decode(
        $rawInput,
        true
    );


if (!is_array($data)) {

    http_response_code(400);

    echo json_encode([
        'error' => 'Invalid request.'
    ]);

    exit;

}


$name =
    trim(
        $data['name'] ?? ''
    );


$email =
    trim(
        $data['email'] ?? ''
    );


$message =
    trim(
        $data['message'] ?? ''
    );


/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/

if ($name === '') {

    http_response_code(400);

    echo json_encode([
        'error' => 'Name is required.'
    ]);

    exit;

}


if (
    $email === '' ||
    !filter_var(
        $email,
        FILTER_VALIDATE_EMAIL
    )
) {

    http_response_code(400);

    echo json_encode([
        'error' => 'A valid email address is required.'
    ]);

    exit;

}


if ($message === '') {

    http_response_code(400);

    echo json_encode([
        'error' => 'Message is required.'
    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| LIMIT INPUT
|--------------------------------------------------------------------------
*/

$name =
    mb_substr(
        $name,
        0,
        150
    );


$email =
    mb_substr(
        $email,
        0,
        250
    );


$message =
    mb_substr(
        $message,
        0,
        5000
    );


/*
|--------------------------------------------------------------------------
| EMAIL
|--------------------------------------------------------------------------
*/

$subject =
    'PHRINUSOMYIS Website — Support Request';


$emailBody =

"PHRINUSOMYIS WEBSITE SUPPORT REQUEST\n\n" .

"Name:\n" .
$name .
"\n\n" .

"Email:\n" .
$email .
"\n\n" .

"Message:\n" .
$message .
"\n\n" .

"Sent from:\n" .
"https://phrinusomyiS.com/help\n";


$headers = [

    'From: PHRINUSOMYIS Website <' .
    $recipient .
    '>',

    'Reply-To: ' .
    $email,

    'Content-Type: text/plain; charset=UTF-8'

];


$sent =
    mail(

        $recipient,

        $subject,

        $emailBody,

        implode(
            "\r\n",
            $headers
        )

    );


/*
|--------------------------------------------------------------------------
| RESULT
|--------------------------------------------------------------------------
*/

if (!$sent) {

    http_response_code(500);

    echo json_encode([

        'success' =>
            false,

        'error' =>
            'Email could not be sent.'

    ]);

    exit;

}


echo json_encode([

    'success' =>
        true

]);

?>
