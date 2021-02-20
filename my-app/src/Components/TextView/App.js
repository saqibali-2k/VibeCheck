import "./App.css";
import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class TextView extends React.Component {
    render() {
        return (
            <div>
                <Button>Go back</Button>
                <h1>VIBE ✔</h1>
                <TextField id="standard-basic" label="Enter your text here" />
                <Button>Submit</Button>
            </div>
        );
    }
}