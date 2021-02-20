import "./App.css";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Container, makeStyles, Box } from "@material-ui/core";
const { Language } = require("@google-cloud/language");

const styles = makeStyles({
    button: {
        marginTop: "17px",
    },
});

const submitHandler = async (text, setScore, setMagnitude) => {
    fetch("http://localhost:5000/textanalysis", {
        method: "POST",
        body: JSON.stringify({
            text: text,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            setScore(Math.floor(data.score * 100) / 100);
            setMagnitude(Math.floor(data.magnitude * 100) / 100);
            console.log(data);
        });
};

export default function TextView() {
    const classes = styles();
    const [text, setText] = useState(""); //Initial state is blank
    const [score, setScore] = useState("");
    const [magnitude, setMagnitude] = useState("");

    return (
        <div>
            <Container>
                <Grid container alignItems="flex-end" justify="center">
                    <Grid item xs={6}>
                        <h1>VIBE ✔</h1>
                        <Box boxShadow={4} alignItems="center" justify="center">
                            <TextField
                                fullWidth={true}
                                id="standard-basic"
                                label="Enter your text here"
                                inputProps={{
                                    min: 0,
                                    style: { textAlign: "center" },
                                }}
                                margin="dense"
                                multiline
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                            />
                        </Box>

                        <Box m={2}>
                            <Button
                                // classes={{ root: classes.button }}
                                className="button"
                                onClick={() => {
                                    submitHandler(text, setScore, setMagnitude);
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                    <Grid>
                        <Box m={2}>
                            <p>
                                {score > 0 && (
                                    <h1>
                                        This message is
                                        {magnitude > 0.5 && <span> very </span>}
                                        {magnitude < 0.5 && (
                                            <span> slightly </span>
                                        )}
                                        {magnitude === 0.5 && <span> </span>}
                                        positive! It has a score of {score}.
                                        Vibe ✅
                                    </h1>
                                )}

                                {score < 0 && (
                                    <h1>
                                        This message is
                                        {magnitude > 0.5 && <span> very </span>}
                                        {magnitude < 0.5 && (
                                            <span> slightly </span>
                                        )}
                                        {magnitude === 0.5 && <span> </span>}
                                        negative... It has a score of {score}.
                                        Vibe ❌
                                    </h1>
                                )}

                                {score === 0 && (
                                    <h1>
                                        This message is neutral. It has a score
                                        of {score}.
                                    </h1>
                                )}
                            </p>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
