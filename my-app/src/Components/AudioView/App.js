import React from "react";
import { ReactMic } from "react-mic";
import {
    Container,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

export class AudioView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            blob: { blobURL: "xd" },
        };

        this.onStop = this.onStop.bind(this);
        this.onFileSelected = this.onFileSelected.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    startRecording = () => {
        this.setState({ record: true });
    };

    stopRecording = () => {
        this.setState({ record: false });
    };

    onData(recordedBlob) {
        console.log("chunk of real-time data is: ", recordedBlob);
    }

    onStop(recordedBlob) {
        console.log("recordedBlob is: ", recordedBlob);
        this.setState({ blob: recordedBlob });
    }

    onFileSelected(e) {
        if (e.target.files.length > 0) {
            let reader = new FileReader();

            const callback = (url) => {
                this.setState({
                    scrnshot: url,
                });
            };
            reader.onloadend = function () {
                const dataUrl = reader.result;
                // const image = new Image();
                // image.src = dataUrl;
                callback(dataUrl);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    onSubmit(){

       var reader = new FileReader();
    //   reader.readAsDataURL(this.state.blob.blob); 
       var superBuffer = new Blob([this.state.blob], {type: this.state.blob.options.mimeType});
    //    reader.readAsDataURL(new Blob(this.state.blob, {type: 'video/webm'}));
       reader.readAsDataURL(superBuffer);
       reader.onloadend = function() {
           var base64data = reader.result.split(",")[1];                
           console.log(base64data);
       }
    }

    render() {
        return (
            <div>
                <Container>
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    onStop={this.onStop}
                    onData={this.onData}
                    strokeColor="#000000"
                    backgroundColor="#FF4081"
                />
                <button onClick={this.startRecording} type="button">
                    Start
                </button>
                <button onClick={this.stopRecording} type="button">
                    Stop
                </button>
                <Button onClick={() => {
                                this.onSubmit();
                            }}>Submit
                </Button>
                <Button variant="outlined" color="dark" component="label">
                        Browse PC
                        <input
                            type="file"
                            onChange={this.onFileSelected}
                            accept="image/*"
                            hidden
                        />
                </Button>
                <audio controls src={this.state.blob.blobURL} />
                </Container>
            </div>
        );
    }
}
