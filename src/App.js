import React, { Component } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import "./App.css";

const copy = require("clipboard-copy");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends Component {
  state = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
    tooltipOpen: false,
  };

  generateCss = () => {
    return `border-radius: ${this.state.topLeft}px ${this.state.topRight}px ${this.state.bottomRight}px ${this.state.bottomLeft}px`;
  };

  copyCssClick = () => {
    copy(this.generateCss());
    this.setState({ tooltipOpen: true });
  };

  handleCloseTooltip = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ tooltipOpen: false });
  };

  handleChange = (event) => {
    let borderRadius = Number.parseInt(event.target.value);

    if (event.target.id === "topLeft") {
      this.setState({ topLeft: borderRadius });
    } else if (event.target.id === "topRight") {
      this.setState({ topRight: borderRadius });
    } else if (event.target.id === "bottomLeft") {
      this.setState({ bottomLeft: borderRadius });
    } else if (event.target.id === "bottomRight") {
      this.setState({ bottomRight: borderRadius });
    }
  };

  render() {
    return (
      <div className="App">
        <Paper className="Background" elevation={3}>
          <Typography variant="h4" gutterBottom>
            Border Radius Previewer
          </Typography>

          <div className="border-input-wrapper-top">
            <TextField
              id="topLeft"
              type="number"
              value={this.state.topLeft}
              className="border-input"
              onChange={this.handleChange}
            />

            <TextField
              id="topRight"
              type="number"
              value={this.state.topRight}
              className="border-input"
              onChange={this.handleChange}
            />
          </div>
          <div
            id="box"
            className="border-radius-box"
            style={{
              borderTopLeftRadius: this.state.topLeft,
              borderTopRightRadius: this.state.topRight,
              borderBottomLeftRadius: this.state.bottomLeft,
              borderBottomRightRadius: this.state.bottomRight,
            }}
          ></div>
          <div className="border-input-wrapper-bottom">
            <TextField
              id="bottomLeft"
              type="number"
              value={this.state.bottomLeft}
              className="border-input"
              onChange={this.handleChange}
            />

            <TextField
              id="bottomRight"
              type="number"
              value={this.state.bottomRight}
              className="border-input"
              onChange={this.handleChange}
            />
          </div>

          <Button
            onClick={() => this.copyCssClick()}
            size="medium"
            className="copy-css-button"
          >
            Copy CSS
          </Button>
        </Paper>

        <Snackbar
          open={this.state.tooltipOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseTooltip}
        >
          <Alert onClose={this.handleCloseTooltip} severity="success">
            Copied!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default App;
