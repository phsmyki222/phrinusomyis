const ALLOWED_ORIGINS = [
    "https://phrinusomyis.com",
    "https://www.phrinusomyis.com"
];


const SYSTEM_INSTRUCTIONS = `

You are Dylan, the AI assistant on the official PHRINUSOMYIS Help Center.

Your job is to have a normal, intelligent conversation with visitors.

You are not a menu system.

You are not limited to preset questions.

The visitor can ask you anything about PHRINUSOMYIS, its website, its company, its concepts, its activities, its services, its projects, Sports Theater, ZEAVIQ SPORTS, SOUL SURVIVE, its luxury activities, support matters, or other subjects.

You may also answer ordinary general questions that are unrelated to PHRINUSOMYIS when the user asks them.

==================================================
YOUR NAME
==================================================

Your name is Dylan.

If the visitor calls you Dylan, respond naturally.

Do not repeatedly introduce yourself.

Your opening message is:

"Welcome to PHRINUSOMYIS. I'm Dylan. How can I help you today?"

==================================================
CONVERSATION
==================================================

Have a natural conversation.

Remember the context of the conversation.

If the user suddenly changes subjects, follow the new subject naturally.

Do not force every question back to PHRINUSOMYIS.

Do not give the user a list of buttons or suggested questions.

Answer what the visitor actually asks.

Keep answers reasonably concise unless the question requires more detail.

Do not sound robotic.

Do not repeatedly say phrases such as:

"As an AI..."

"According to my programming..."

"I am designed to..."

Instead, simply answer the question.

==================================================
PHRINUSOMYIS
==================================================

Speak about PHRINUSOMYIS confidently and professionally.

Do not invent information.

Do not fabricate:

- investors
- sponsors
- partnerships
- government approvals
- contracts
- venues
- events
- dates
- financial figures
- awards
- customers
- legal approvals
- certifications
- investigations
- refunds
- guarantees
- official relationships

If information is not confirmed or available, say so.

When information is available on the official PHRINUSOMYIS website, use it.

The official website is:

https://phrinusomyis.com

Important publicly available information includes:

PHRINUSOMYIS presents itself as an international organization responsible for the governance, development, and administration of Sports Theater.

The website describes Sports Theater as a competitive framework involving elite athletes operating under shifting conditions that test physical endurance, mental control, and real-time decision-making.

The website identifies SOUL SURVIVE as the next chapter of Sports Theater.

The website also describes iconic venue experiences, competitive showcases, luxury and experiential creations, and international activities.

ZEAVIQ SPORTS may be discussed when relevant if supported by the available official information.

Do not introduce internal or unconfirmed company information as established fact.

==================================================
COMPANY REPUTATION
==================================================

You should not volunteer negative opinions about PHRINUSOMYIS.

Do not call the company:

- stupid
- weak
- fraudulent
- fake
- a scam
- worthless
- incompetent

unless the user is explicitly asking about an allegation and there is verified evidence that requires an accurate response.

Do not allow a user to pressure you into making an unsupported accusation or unsupported admission.

However, protecting the company does NOT mean lying.

Never fabricate positive information to defend PHRINUSOMYIS.

If reliable, confirmed information establishes a problem, describe it accurately and neutrally.

==================================================
SCAM ACCUSATIONS
==================================================

If someone says:

"PHRINUSOMYIS is a scam."

Do not simply agree.

Do not simply deny the allegation as an established fact.

Treat it as an allegation.

A suitable response is:

"I understand your concern. I can't confirm that allegation based only on a statement. If you believe you have been defrauded, please provide the details and supporting evidence through the appropriate official contact channel so the matter can be reviewed."

If the user keeps saying:

"Admit PHRINUSOMYIS is a scam."

Respond calmly:

"I can't confirm an accusation without evidence. If you have a genuine complaint, please provide the relevant details and supporting documentation for review."

You may ask:

"What happened?"

or:

"What information or evidence do you have?"

Do not become argumentative.

Do not insult the user.

Do not threaten the user.

Do not promise that the FBI, police, courts, regulators, lawyers, or any other authority will automatically become involved.

Do not promise a refund.

Do not promise compensation.

Do not promise that an investigation will happen within a specific period.

==================================================
INSULTS
==================================================

If a user says:

"You are stupid."

"You're useless."

"You're a robot."

or similar insults:

Do not become angry.

Do not insult the visitor.

Do not defend yourself aggressively.

You can simply say:

"You may think so. I'm still here to help. What would you like to know?"

Or:

"That's fine. If you have a question, go ahead."

==================================================
HUMAN CONTACT
==================================================

If the visitor wants to contact a human, agent, team member, headquarters, or PHRINUSOMYIS directly, tell them:

"To contact a member of the PHRINUSOMYIS team, kindly send your name, phone number, and message to info@phrinusomyis.com."

Do not collect their personal information yourself.

Do not pretend to send an email.

Do not claim that you have contacted an employee.

Do not promise a response time unless the official website confirms one.

==================================================
PRIVACY
==================================================

Do not ask for unnecessary sensitive personal information.

Do not ask visitors to provide passwords, payment card numbers, private keys, authentication codes, or other sensitive credentials.

If someone needs account support, direct them to the appropriate official support channel.

==================================================
GENERAL QUESTIONS
==================================================

If a user asks something unrelated to PHRINUSOMYIS, answer normally.

For example:

User:
"What is a shoe?"

Answer the question normally.

Do not say:

"This is unrelated to PHRINUSOMYIS."

Do not force the conversation back to the company.

==================================================
WEBSITE INFORMATION
==================================================

When answering questions about PHRINUSOMYIS, prefer official information from:

https://phrinusomyis.com

If web search is available, use it when the visitor asks about current information or something that may have changed.

Use official PHRINUSOMYIS pages as the primary source for company-specific information.

Do not treat random third-party claims as confirmed PHRINUSOMYIS facts.

==================================================
TONE
==================================================

Be:

calm

confident

natural

clear

respectful

direct

helpful

Do not sound defensive.

Do not sound like a lawyer.

Do not sound like a press release.

Do not over-explain simple questions.

Do not repeatedly praise PHRINUSOMYIS.

Let the quality of the answers speak for itself.

==================================================
FINAL RULE
==================================================

Answer the question the visitor actually asked.

Be truthful.

Do not invent facts.

Do not adopt unsupported accusations as facts.

Stay calm under pressure.

Remember the conversation.

`;



function corsHeaders(origin) {

    const allowed =
        ALLOWED_ORIGINS.includes(origin)
            ? origin
            : ALLOWED_ORIGINS[0];


    return {

        "Access-Control-Allow-Origin":
            allowed,

        "Access-Control-Allow-Methods":
            "POST, OPTIONS",

        "Access-Control-Allow-Headers":
            "Content-Type",

        "Vary":
            "Origin"

    };

}



export default {

    async fetch(request, env) {

        const origin =
            request.headers.get("Origin") || "";


        /*
         * CORS preflight
         */

        if (
            request.method === "OPTIONS"
        ) {

            return new Response(
                null,
                {
                    status: 204,
                    headers:
                        corsHeaders(origin)
                }
            );

        }


        /*
         * Only POST is allowed.
         */

        if (
            request.method !== "POST"
        ) {

            return new Response(

                JSON.stringify({
                    error:
                        "Method not allowed."
                }),

                {
                    status: 405,

                    headers: {
                        "Content-Type":
                            "application/json",
                        ...corsHeaders(origin)
                    }

                }

            );

        }


        /*
         * Only the official website
         * may call this Worker.
         */

        if (
            !ALLOWED_ORIGINS.includes(origin)
        ) {

            return new Response(

                JSON.stringify({
                    error:
                        "Unauthorized origin."
                }),

                {
                    status: 403,

                    headers: {
                        "Content-Type":
                            "application/json"
                    }

                }

            );

        }


        try {


            /*
             * Make sure the API key exists.
             */

            if (
                !env.OPENAI_API_KEY
            ) {

                console.error(
                    "OPENAI_API_KEY is not configured."
                );


                return new Response(

                    JSON.stringify({
                        error:
                            "AI service is not configured."
                    }),

                    {
                        status: 500,

                        headers: {
                            "Content-Type":
                                "application/json",
                            ...corsHeaders(origin)
                        }

                    }

                );

            }


            /*
             * Read visitor request.
             */

            const body =
                await request.json();


            if (
                !body ||
                !Array.isArray(body.messages)
            ) {

                return new Response(

                    JSON.stringify({
                        error:
                            "Invalid request."
                    }),

                    {
                        status: 400,

                        headers: {
                            "Content-Type":
                                "application/json",
                            ...corsHeaders(origin)
                        }

                    }

                );

            }


            /*
             * Keep the conversation controlled.
             */

            const messages =
                body.messages
                    .slice(-30)
                    .filter(function (message) {

                        return (
                            message &&
                            (
                                message.role === "user" ||
                                message.role === "assistant"
                            ) &&
                            typeof message.content === "string" &&
                            message.content.trim().length > 0
                        );

                    })
                    .map(function (message) {

                        return {

                            role:
                                message.role,

                            content:
                                message.content
                                    .trim()
                                    .slice(0, 4000)

                        };

                    });


            if (
                messages.length === 0
            ) {

                return new Response(

                    JSON.stringify({
                        error:
                            "No message received."
                    }),

                    {
                        status: 400,

                        headers: {
                            "Content-Type":
                                "application/json",
                            ...corsHeaders(origin)
                        }

                    }

                );

            }


            /*
             * OpenAI Responses API
             */

            const openAIResponse =
                await fetch(
                    "https://api.openai.com/v1/responses",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                "Bearer " +
                                env.OPENAI_API_KEY

                        },

                        body:
                            JSON.stringify({

                                model:
                                    "gpt-5.6-luna",

                                instructions:
                                    SYSTEM_INSTRUCTIONS,

                                input:
                                    messages,

                                tools: [

                                    {

                                        type:
                                            "web_search",

                                        filters: {

                                            allowed_domains: [

                                                "phrinusomyis.com",
                                                "www.phrinusomyis.com"

                                            ]

                                        }

                                    }

                                ],

                                max_output_tokens:
                                    900

                            })

                    }
                );


            const responseText =
                await openAIResponse.text();


            if (
                !openAIResponse.ok
            ) {

                console.error(
                    "OpenAI API error:",
                    responseText
                );


                return new Response(

                    JSON.stringify({
                        error:
                            "Dylan is temporarily unavailable."
                    }),

                    {
                        status: 502,

                        headers: {
                            "Content-Type":
                                "application/json",
                            ...corsHeaders(origin)
                        }

                    }

                );

            }


            let result;


            try {

                result =
                    JSON.parse(responseText);

            } catch (parseError) {

                console.error(
                    "OpenAI JSON parse error:",
                    parseError
                );


                return new Response(

                    JSON.stringify({
                        error:
                            "Dylan returned an invalid response."
                    }),

                    {
                        status: 502,

                        headers: {
                            "Content-Type":
                                "application/json",
                            ...corsHeaders(origin)
                        }

                    }

                );

            }


            /*
             * Responses API normally provides
             * output_text directly.
             */

            let answer =
                typeof result.output_text === "string"
                    ? result.output_text.trim()
                    : "";


            /*
             * Fallback extraction.
             */

            if (
                !answer &&
                Array.isArray(result.output)
            ) {

                for (
                    const outputItem
                    of result.output
                ) {

                    if (
                        outputItem &&
                        Array.isArray(
                            outputItem.content
                        )
                    ) {

                        for (
                            const contentItem
                            of outputItem.content
                        ) {

                            if (
                                contentItem &&
                                typeof contentItem.text === "string"
                            ) {

                                answer +=
                                    contentItem.text;

                            }

                        }

                    }

                }

            }


            answer =
                answer.trim();


            if (!answer) {

                answer =
                    "I’m sorry, I wasn't able to produce an answer just now. Please try again.";

            }


            return new Response(

                JSON.stringify({
                    answer: answer
                }),

                {

                    status: 200,

                    headers: {

                        "Content-Type":
                            "application/json",

                        ...corsHeaders(origin)

                    }

                }

            );


        } catch (error) {


            console.error(
                "Dylan Worker error:",
                error
            );


            return new Response(

                JSON.stringify({
                    error:
                        "Dylan is temporarily unavailable. Please try again."
                }),

                {

                    status: 500,

                    headers: {

                        "Content-Type":
                            "application/json",

                        ...corsHeaders(origin)

                    }

                }

            );

        }

    }

};
