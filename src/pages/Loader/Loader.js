import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loader(props) {
  let [States_, setStates] = useState({
    openLoginLoddingPanel: false,
    loading: false
  });
  useEffect(() => {
    if (
      props.openLoaderPanel !== States_.openLoginLoddingPanel &&
      props.openLoader !== States_.loading
    ) {
      if (props.openLoaderPanel === false) {
          setStates({ openLoginLoddingPanel: false, loading: false });
      } else {
          setStates({ openLoginLoddingPanel: true, loading: true });
      }
    }
  });

  return (
    <Dialog
      open={States_.openLoginLoddingPanel}
      className="loder-main"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={States_.loading}
            // loading={true}
          />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
export default Loader;
