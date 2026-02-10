export default function research() {

    return (
        <div className="flex align-center justify-center mt-5">
            <div className="flex flex-col items-center gap-5 max-w-2xl">
                <div className="flex flex-col text-center">
                    <h1> Research: </h1>
                    <h1> OWASP A05:2025</h1>
                    <h2> Injection </h2>
                </div>

                <div className="flex flex-col text-left gap-4">
                    <p className="text-center"> What is injection?</p>
                    <p> Injection is an application flaw that allows user input to be sent to, interpreted and executed by a program.
                    </p>
                    <p>Any application that accepts external input or data has the potentional to be exploited via injection.</p>
                    <p> With the rise of large language models (LLMS), a new form of injection has become popular, refered to as "prompt injection"</p>
                </div>
                <div className="flex flex-col text-left gap-4">
                    <p className="text-center"> Common types of injection attacks</p>
                </div>
                <h2> Code Injection </h2>
                <p>When user inputs are executed by the program without any sanitization</p>
                <h2> SQL Injection </h2>
                <p>When SQL query strings are exploited to extract data, insert malicious database entries, drop important data, bypass authentication, etc</p>
                <h2> Command Injection </h2>
                <p>When a user provides a malicious command to a program or system, causing it behave in unintended ways</p>
                <h2> Cross-site scripting (XSS)</h2>
                <p>When a website accepts user input (like comments, or usernames, or bios, etc), a user submits a script in one of these inputs, and the site displays that input on the page as HTML, causing it to be executed.</p>

                <div className="flex flex-col text-left gap-4">
                    <p className="text-center"> What makes an app vulnerable to injection?</p>
                    <p> An application is vulnerable to an injection attack when:</p>
                    <ul>
                        <li>User input isn't validated</li>
                        <li>Queries or calls are interpreted without context aware escaping (more on this later)</li>
                        <li>Unsanitized data is used in ORM parameters (more on this later too)</li>
                        <li>User input is directly used or concatenated inside the app.</li>
                    </ul>
                </div>

                <div>Notable attacks</div>

                <p>Heartland Payment Systems - 2008</p>
                <p>This was one of the largest SQL injection attacks in history. It resulted in 130 million credit/debit card numbers being exposed</p>

                <p>Sony Picture - 2011</p>
                <p>Sony was hit with a SQL Injection attack that exposed 77 million PSN accounts. This costed Sony an estimated $170 million in damages.(but you could get little big planet for free after the services came back so, it's all good)</p>

                <p>Twitter XSS Attack - 2014</p>
                <p>A twitter user posted a tweet with a html element that contained a "onMouseOver" script which caused a self propograting tweet. This quickly led to people abusing it further, often spamming pornography.</p>

                <p>Prompt Injection - Ongoing</p>
                <p>Attackers have been caught hiding malicious prompts in emails. When the users LLM summarizes the email for them, it will execute the hidden command. Depending on how much control this LLM has over the users device, it could do anything from respond to the email with personal data, delete files, download files, etc</p>


                <a href="https://softwarelab.org/blog/sql-injection-examples/">https://softwarelab.org/blog/sql-injection-examples/</a>

                <a href="https://www.darkreading.com/cyberattacks-data-breaches/twitter-attack-an-xss-wake-up-call">https://www.darkreading.com/cyberattacks-data-breaches/twitter-attack-an-xss-wake-up-call</a>

                <a href="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmybroadband.co.za%2Fnews%2Fwp-content%2Fuploads%2F2014%2F06%2FTweetdeck-XSS-attack-retweeting-a-heart.jpg&f=1&nofb=1&ipt=f4bdb829cd3ca26fe9d9859127f41f07f8728c32336b72210d3974bc3bd7c65c">tweetdeck xss 2014 (not the 2010 twitter xss)</a>

                <a href="https://www.forbes.com/sites/bernardmarr/2026/01/28/when-ai-agents-turn-against-you-the-prompt-injection-threat-every-business-leader-must-understand/">https://www.forbes.com/sites/bernardmarr/2026/01/28/when-ai-agents-turn-against-you-the-prompt-injection-threat-every-business-leader-must-understand/</a>
            </div>
        </div>
    )
}