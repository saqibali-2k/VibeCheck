import "./App.css";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Container, makeStyles } from "@material-ui/core";
const { Language } = require("@google-cloud/language");

const styles = makeStyles({
    button: {
        marginTop: "17px",
    },
});

const submitHandler = async (text) => {
    console.log(text);
    fetch('http://localhost:5000/textanalysis', {
      method: 'POST',
      body: JSON.stringify({
        text: text
      })
    }).then(res => res.json()).then(data => {
      console.log(data)
    });
};

export default function TextView() {
    const classes = styles();
    const [text, setText] = useState(""); //Initial state is blank

    return (
        <div>
            <Container>
                <Button>Go back</Button>
                <Grid container alignItems="flex-end" justify="center">
                    <Grid>
                        <h1>VIBE ✔</h1>
                        <TextField
                            id="standard-basic"
                            label="Enter your text here"
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                        />
                        <Button
                            classes={{ root: classes.button }}
                            onClick={() => {
                                submitHandler(text);
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
