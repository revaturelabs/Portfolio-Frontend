import React from 'react';
import ReactMarkdown from 'react-markdown';
import { render } from 'react-dom';

function HelloWorld() {

    return(
        <ReactMarkdown>
            # Hello, *world*!
        </ReactMarkdown>
    )

}

export default HelloWorld