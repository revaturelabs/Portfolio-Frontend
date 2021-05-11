import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

// TODO: read markdown from file to render to page
// TODO: convert markdown to json to render to page
function HelloWorld() {

    const [markdown, setMarkdown] = useState("");
    const markdown2 = "# TEST";

  return (
        <div>
            <ReactMarkdown>{markdown}</ReactMarkdown>
            <button onClick={()=>setMarkdown("# test")}>generate markdown</button>
            <ReactMarkdown>{markdown2}</ReactMarkdown>
        </div>
    )
}

export default HelloWorld;
