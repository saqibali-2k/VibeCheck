import logo from "./logo.svg";
import "./App.css";
import ImageView from "./Components/ImageView";
import { AudioView } from "./Components/AudioView/App";
import TextView from "./Components/TextView/App";
import { Grid, Button, makeStyles } from "@material-ui/core";
import React from "react";

const styles = makeStyles({
    root: {
        fontSize: "20px",
        fontFamily: ["Open Sans", "sans-serif"].join(","),
    },
});

const goBack = (setter, setShowLanding) => {
    setter(false);
    setShowLanding(true);
};

const goTo = (setter, setShowLanding) => {
    setter(true);
    setShowLanding(false);
};

function App() {
    const classes = styles();
    const [showLanding, setShowLanding] = React.useState(true);
    const [showImage, setShowImage] = React.useState(false);
    const [showText, setShowText] = React.useState(false);

    return (
        <div className="App">
            {showText && (
                <div>
                    <Button onClick={() => goBack(setShowText, setShowLanding)}>
                        Go Back
                    </Button>
                    <TextView />
                </div>
            )}
            {showImage && (
                <div>
                    <Button
                        onClick={() => goBack(setShowImage, setShowLanding)}
                    >
                        Go Back
                    </Button>
                    <ImageView />
                </div>
            )}
            {showLanding && (
                <div>
                    <h1>Vibe ✔</h1>
                    <Button onClick={() => goTo(setShowImage, setShowLanding)}>
                        Image Analysis
                    </Button>
                    <Button onClick={() => goTo(setShowText, setShowLanding)}>
                        Text Analysis
                    </Button>
                </div>
            )}
        </div>
    );
}

export default App;
