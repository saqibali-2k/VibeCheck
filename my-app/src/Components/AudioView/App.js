import React from "react";
import { ReactMic } from "react-mic";
import MicRecorder from "mic-recorder-to-mp3";
import {
    Container,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export class AudioView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            blob: { blobURL: "xd" },
            blobURL: "",
        };

        this.onStop = this.onStop.bind(this);
        this.onFileSelected = this.onFileSelected.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    startRecording = () => {
        Mp3Recorder.start()
            .then(() => {
                this.setState({ record: true });
            })
            .catch((e) => console.error(e));
    };

    stopRecording = () => {
        Mp3Recorder.stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob);
                this.setState({ blobURL, record: false, recordedBlob: blob });
                console.log(blob);
            })
            .catch((e) => console.log(e));
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

    onSubmit() {
        var reader = new FileReader();
        //   reader.readAsDataURL(this.state.blob.blob);
        //    var superBuffer = new Blob([this.state.blob], {type: this.state.blob.options.mimeType});
        //    reader.readAsDataURL(new Blob(this.state.blob, {type: 'video/webm'}));
        reader.readAsDataURL(this.state.recordedBlob);
        reader.onloadend = function () {
            var base64data = reader.result.split(",")[1];
            console.log(base64data);
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <button onClick={this.startRecording} type="button">
                        Start
                    </button>
                    <button onClick={this.stopRecording} type="button">
                        Stop
                    </button>
                    <Button
                        onClick={() => {
                            this.onSubmit();
                        }}
                    >
                        Submit
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
                    <audio controls src={this.state.blobURL} />
                </Container>
            </div>
        );
    }
}
