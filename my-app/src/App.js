import logo from "./logo.svg";
import "./App.css";
import ImageView from "./Components/ImageView";
import { AudioView } from "./Components/AudioView/App";
import TextView from "./Components/TextView/App";
import { Grid, Button } from "@material-ui/core";
import React from "react";

const goBack = (setter, setShowLanding) => {
    setter(false);
    setShowLanding(true);
};

const goTo = (setter, setShowLanding) => {
    setter(true);
    setShowLanding(false);
};

function App() {
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
                    <Button onClick={() => goTo(setShowText, setShowLanding)}>
                        Image Analysis
                    </Button>
                    <Button onClick={() => goTo(setShowImage, setShowLanding)}>
                        Text Analysis
                    </Button>
                </div>
            )}
        </div>
    );
}

export default App;
