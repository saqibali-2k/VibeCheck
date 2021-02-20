import React from "react";
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Slide from '@material-ui/core/Slide';
import Webcam from "react-webcam";

class ImageButton extends React.Component {
    constructor(props) {
        super(props);
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webcamRef: {
                current: null,
            },
            show: false,
            scrnshot: null,
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleScreenShot = this.handleScreenShot.bind(this);
        this.onFileSelected = this.onFileSelected.bind(this);
    }

    handleShow() {
        this.setState({
            show: true,
        })
    }

    handleClose() {
        this.setState({
            show: false,
        })
    }

    handleScreenShot() {
        const imgSrc = this.state.webcamRef.current.getScreenshot();
        // const img = new Image();
        // img.src = imgSrc;
        this.setState({
            scrnshot: imgSrc
        })
        this.handleClose();
    }

    onFileSelected(e) {
        if (e.target.files.length > 0) {
            let reader = new FileReader();

            const callback = (url) => {
              this.setState({
                scrnshot: url
              }) 
            }
            reader.onloadend = function () {
                const dataUrl = reader.result;
                // const image = new Image();
                // image.src = dataUrl;
                callback(dataUrl);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    render() {

        console.log(this.state.scrnshot);
    return (
        <div>
            <div id="buttons">
                <Button variant="outlined" color="dark" onClick={this.handleShow}>
                    Use Camera
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
            </div>
            <Dialog
                open={this.state.show}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}>
                <DialogTitle >
                    Camera View
                </DialogTitle>
                <DialogContent>
                    <Webcam
                    audio={false}
                    mirrored={true}
                    ref={this.state.webcamRef}
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                    screenshotFormat="image/jpeg"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleScreenShot}>
                        Screenshot
                    </Button>
                    <Button onClick={this.handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <img src={this.state.scrnshot}/>
        </div>
        );
    }
}

export default ImageView;