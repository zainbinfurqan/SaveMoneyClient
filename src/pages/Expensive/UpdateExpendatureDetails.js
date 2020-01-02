import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import "./updateexpen.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    width: 100
  }
}));

function UpdateExpendatureDetails(props) {
  const classes = useStyles();

  const [State_, setValue] = React.useState({
    updatePanelFlag: false,
    name: "",
    money: ""
  });

  useEffect(() => {
    if (State_.updatePanelFlag !== props.open) {
      setValue({ ...State_, updatePanelFlag: props.open });
    }
  }, []);

  function cancleUpdateHandle() {
    setValue({ ...State_, updatePanelFlag: false });
    props.close();
  }

  return (
    <div>
      <Dialog
        open={State_.updatePanelFlag}
        TransitionComponent={Transition}
        keepMounted
        className="update-main"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className="update-subdiv"></div>
          <div>
            <Button
              variant="contained"
              color="primary"
                className={classes.button}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="primary"
                className={classes.button}
              onClick={cancleUpdateHandle}
            >
              CanCle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default UpdateExpendatureDetails;
