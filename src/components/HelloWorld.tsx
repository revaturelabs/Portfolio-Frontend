import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import marked from "marked";

function HelloWorld() {

    const [markdown, setMarkdown] = useState("");

    useEffect(()=>{
        document.title='markdown: ${markdown}';
    })

  return (
        <div>
            <ReactMarkdown>{markdown}</ReactMarkdown>
            <button onClick={()=>setMarkdown("# test")}>generate markdown</button>
        </div>
    )
}

export default HelloWorld;
