import React from "react";

//Content class exported
export class Content extends React.Component {
    render() {
        return (
            //HTML Code
            <div className="App">
                <h1>Hello World!</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
    }
}