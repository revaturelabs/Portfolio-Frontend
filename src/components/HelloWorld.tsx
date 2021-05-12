import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import MarkDown from 'markdown-to-jsx';

/**
 * TODO:
 * - [ ] share feature with team lead/team
 * - [ ] identiy next step for implementation into project component
 */

function HelloWorld() {

    const [markdown, setMarkdown] = useState("");
    const markdown2 = "# TEST";
    const file_name = 'testparsemd.md';

    
    const [md, setMd] = useState('');
    
    useEffect(()=>{
        var md2json = require('md-2-json');
        console.log(md2json.parse('This is markdown content'));
        import(`./${file_name}`)
            .then(res=>{
                fetch(res.default)
                    .then(res=>res.text())
                    .then(res=>setMd(res))
            })
            .catch(err=>console.log(err))
    });

  return (
        <div>
            <ReactMarkdown>{markdown}</ReactMarkdown>
            <button onClick={()=>setMarkdown("# test")}>generate markdown</button>
            <ReactMarkdown>{markdown2}</ReactMarkdown>
            <MarkDown>{md}</MarkDown>
        </div>
    )
}

export default HelloWorld;
