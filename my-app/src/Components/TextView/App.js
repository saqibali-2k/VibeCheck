import "./App.css";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Container, makeStyles } from "@material-ui/core";

const styles = makeStyles({
    button: {
        marginTop: "17px",
    },
});

export default function TextView() {
    const classes = styles();

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
                        />
                        <Button classes={{ root: classes.button }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
