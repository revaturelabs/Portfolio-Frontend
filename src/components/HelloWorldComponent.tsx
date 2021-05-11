import marked from 'marked';
import React, { Component } from 'react'
import ReactMarkdown from "react-markdown";

export class HelloWorldComponent extends Component {

    componentDidMount() {
        const readmePath = require("./testparsemd.md");

        fetch(readmePath)
            .then(response=>{
                return response.text()
            })
            .then(text=>{
                this.setState({
                    markdown: marked(text)
                })
            })
    }

    // FIXME: markdown const issue
    render() {
        const { markdown } = this.state;
        return (
            <div>
                <article dangerouslySetInnerHTML={{__html: markdown}}></article>
            </div>
        )
    }
}

export default HelloWorldComponent
