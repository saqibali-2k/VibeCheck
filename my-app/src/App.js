import logo from "./logo.svg";
import "./App.css";
import ImageView from "./Components/ImageView";
import { AudioView } from "./Components/AudioView/App";
import TextView from "./Components/TextView/App";
import React from 'react';
import Grid from '@material-ui/core'

function App() {
    const showLanding, setShowLanding = react.useState(True)
    const showImage, setShowImage = react.useState(false)
    const showText, setShowText = react.useState(false)

    return (
        <div className="App">
            <ImageView />
        </div>
    );
}

export default App;
