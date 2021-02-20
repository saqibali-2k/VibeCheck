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
    // // Imports the Google Cloud client library
    // const language = require("@google-cloud/language");

    // const projectId = "vibecheck-uoftha-1613791768459";
    // const keyFilename =
    //     "../../Downloads/VibeCheck-UoftHacks2021-48ab69008c41.json";

    // // Instantiates a client
    // const client = new language.LanguageServiceClient({
    //     projectId,
    //     keyFilename,
    // });

    // const document = {
    //     content: text,
    //     type: "PLAIN_TEXT",
    // };

    // // Detects the sentiment of the text
    // const [result] = await client.analyzeSentiment({ document: document });
    // const sentiment = result.documentSentiment;

    // console.log(`Text: ${text}`);
    // console.log(`Sentiment score: ${sentiment.score}`);
    // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

    console.log(text);
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
