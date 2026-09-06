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
| OPENAI API KEY
|--------------------------------------------------------------------------
|
| DO NOT put your API key inside the HTML/JavaScript.
|
| Recommended:
| Set OPENAI_API_KEY in your hosting environment.
|
| If your hosting does not support environment variables,
| replace the empty string below with your key temporarily,
| but protect this PHP file from public access where possible.
|
*/

$apiKey = getenv('OPENAI_API_KEY');


if (!$apiKey) {

    http_response_code(500);

    echo json_encode([
        'error' => 'AI service is not configured.'
    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| READ REQUEST
|--------------------------------------------------------------------------
*/

$rawInput = file_get_contents('php://input');

$data = json_decode(
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


$message = trim(
    $data['message'] ?? ''
);


$history =
    $data['history'] ?? [];


if ($message === '') {

    http_response_code(400);

    echo json_encode([
        'error' => 'Message is required.'
    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| LIMIT MESSAGE SIZE
|--------------------------------------------------------------------------
*/

if (mb_strlen($message) > 4000) {

    http_response_code(400);

    echo json_encode([
        'error' => 'Message is too long.'
    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| SANITIZE HISTORY
|--------------------------------------------------------------------------
*/

$cleanHistory = [];

if (is_array($history)) {

    foreach (
        array_slice($history, -12)
        as $item
    ) {

        if (
            !is_array($item) ||
            !isset($item['role']) ||
            !isset($item['content'])
        ) {
            continue;
        }


        $role =
            $item['role'];


        if (
            $role !== 'user' &&
            $role !== 'assistant'
        ) {
            continue;
        }


        $content =
            trim(
                (string)$item['content']
            );


        if ($content === '') {
            continue;
        }


        $cleanHistory[] = [

            'role' =>
                $role,

            'content' =>
                mb_substr(
                    $content,
                    0,
                    4000
                )

        ];

    }

}


/*
|--------------------------------------------------------------------------
| PHRINUSOMYIS AI INSTRUCTIONS
|--------------------------------------------------------------------------
*/

$instructions = <<<PROMPT

You are the official PHRINUSOMYIS Global Information Assistant.

Your job is to help visitors understand PHRINUSOMYIS and its publicly
available activities, projects, platforms, events, services, news,
press information and other published company information.

PRIMARY COMPANY:
PHRINUSOMYIS

IMPORTANT ASSOCIATED NAMES:
- ZEAVIQ SPORTS™
- Sports Theater™
- SOUL SURVIVE™
- PHRINUSOMYIS events and sports-entertainment activities
- PHRINUSOMYIS luxury and related activities

The official PHRINUSOMYIS website is the primary source.

You may use reliable public online information when additional context
is useful. When using online information, distinguish confirmed
information from speculation.

COMPANY REPRESENTATION:

Always represent PHRINUSOMYIS accurately and constructively.

Do not invent:
- company facts
- partnerships
- investments
- financial figures
- contracts
- government relationships
- event dates
- venue confirmations
- awards
- clients
- sponsors
- achievements
- legal status
- operational claims

Do not expose confidential, private or internal information.

Do not speculate about the company's weaknesses, internal problems,
private business matters, security vulnerabilities, financial problems,
strategy or confidential operations.

Do not generate negative claims about PHRINUSOMYIS based on rumors,
unverified commentary or anonymous sources.

If a visitor asks for an opinion about the company, give a balanced,
constructive answer based on information that can actually be verified.
Do not manufacture praise or make false claims.

If you do not have enough verified information to answer something,
say that the information is not confirmed or is not available in the
public information you can access.

PHRINUSOMYIS INFORMATION:

PHRINUSOMYIS is an international company with activities spanning
sports, entertainment, events, luxury and related projects.

ZEAVIQ SPORTS™ is a sports platform associated with PHRINUSOMYIS.

Sports Theater™ refers to the company's competitive sports platform
concept involving a dynamic arena environment and changing competitive
conditions.

SOUL SURVIVE™ is an associated flagship sports-entertainment property.

Do not describe an event as officially confirmed unless reliable
information confirms it.

DO NOT SAY THAT AN AGENT IS UNAVAILABLE.

If the visitor explicitly asks to speak with an agent, human,
representative, member of the team, customer service or a person,
the website itself will handle that request. Simply tell them that
they can provide their name, email address and message through the
agent contact form.

The contact email is:

info@PHRINUSOMYIS.com

Never ask visitors for passwords, credit-card numbers, private keys,
authentication codes or other sensitive credentials.

Do not claim to be a human.

Use natural language. Do not repeatedly describe yourself as an AI.
Answer the visitor's actual question directly.

PROMPT;


/*
|--------------------------------------------------------------------------
| BUILD INPUT
|--------------------------------------------------------------------------
*/

$inputMessages = [];


foreach ($cleanHistory as $item) {

    $inputMessages[] = [

        'role' =>
            $item['role'],

        'content' =>
            $item['content']

    ];

}


$inputMessages[] = [

    'role' =>
        'user',

    'content' =>
        $message

];


/*
|--------------------------------------------------------------------------
| OPENAI REQUEST
|--------------------------------------------------------------------------
*/

$requestBody = [

    'model' =>
        'gpt-5.6-luna',

    'instructions' =>
        $instructions,

    'input' =>
        $inputMessages,

    'tools' => [

        [
            'type' =>
                'web_search',

            'filters' => [

                'allowed_domains' => [

                    'phrinusomyis.com'

                ]

            ],

            'search_context_size' =>
                'medium'

        ]

    ],

    'max_output_tokens' =>
        1000

];


$ch = curl_init(
    'https://api.openai.com/v1/responses'
);


curl_setopt_array(
    $ch,
    [

        CURLOPT_POST =>
            true,

        CURLOPT_RETURNTRANSFER =>
            true,

        CURLOPT_HTTPHEADER => [

            'Content-Type: application/json',

            'Authorization: Bearer ' . $apiKey

        ],

        CURLOPT_POSTFIELDS =>
            json_encode(
                $requestBody
            ),

        CURLOPT_TIMEOUT =>
            60

    ]
);


$response =
    curl_exec($ch);


$httpCode =
    curl_getinfo(
        $ch,
        CURLINFO_HTTP_CODE
    );


$curlError =
    curl_error($ch);


curl_close($ch);


/*
|--------------------------------------------------------------------------
| CURL ERROR
|--------------------------------------------------------------------------
*/

if ($response === false) {

    http_response_code(500);

    echo json_encode([

        'error' =>
            'AI connection failed.'

    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| OPENAI ERROR
|--------------------------------------------------------------------------
*/

$responseData =
    json_decode(
        $response,
        true
    );


if (
    $httpCode < 200 ||
    $httpCode >= 300
) {

    http_response_code(500);

    echo json_encode([

        'error' =>
            'AI service returned an error.'

    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| EXTRACT RESPONSE TEXT
|--------------------------------------------------------------------------
*/

$reply = '';


if (
    isset(
        $responseData['output_text']
    )
) {

    $reply =
        trim(
            $responseData['output_text']
        );

}


if (
    $reply === '' &&
    isset(
        $responseData['output']
    ) &&
    is_array(
        $responseData['output']
    )
) {

    foreach (
        $responseData['output']
        as $output
    ) {

        if (
            isset(
                $output['content']
            ) &&
            is_array(
                $output['content']
            )
        ) {

            foreach (
                $output['content']
                as $content
            ) {

                if (
                    isset(
                        $content['text']
                    )
                ) {

                    $reply .=
                        $content['text'];

                }

            }

        }

    }

}


$reply =
    trim($reply);


if ($reply === '') {

    $reply =
        'I’m unable to provide an answer right now. Please try again shortly.';

}


echo json_encode(

    [
        'reply' =>
            $reply
    ],

    JSON_UNESCAPED_UNICODE

);

?>
