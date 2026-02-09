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
                    <p className="text-center"> Common type of injection attacks</p>
                </div>
                <h2> Code Injection </h2>
                <p></p>
                <h2> SQL Injection </h2>
                <p></p>
                <h2> Command Injection </h2>
                <p></p>
                <h2> Cross-site scripting </h2>

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
            </div>
        </div>
    )
}