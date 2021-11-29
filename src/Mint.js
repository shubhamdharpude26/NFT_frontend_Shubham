import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "./img/astronaut.png";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
// import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import { alpha, styled } from "@mui/material/styles";
import { fetchData } from "./redux/data/dataActions";
import "animate.css";
import "./Mint.css";

const CustomButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #00B4D8 30%, #9C59F0 90%)",
    borderRadius: 3,
    border: 0,
    color: "#fff",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})((props) => <Button {...props} />);

function Mint() {
  const blockchain = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();
  const [feedback, setfeedback] = useState("May be it's your lucky day!");
  // const [input, setInput] = useState(0);
  const [claimingNft, setClamingNft] = useState(false);
  var tmp2;

  const claimNfts = (_amount) => {
    setClamingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        from: blockchain.account,
        value: blockchain.web3.utils.toWei(
          (0.02 * _amount).toString(),
          "ether"
        ),
      })
      .once("error", (err) => {
        console.log(err);
        setfeedback("Error");
        setClamingNft(false);
      })
      .then((receipt) => {
        setfeedback("Success");
        setClamingNft(false);
      });
  };

  function onSuccess() {
    console.log(blockchain);
    swal("Success", " ", "success");
  }

  // useEffect(() => {
  //   if (blockchain.account !== "" && blockchain.smartContract !== null) {
  //     dispatch(fetchData(blockchain.account));
  //   }
  // }, [blockchain.smartContract, dispatch]);

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#00B4D8",
    },
    "& label.Mui": {
      color: "#fff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#00B4D8",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#00B4D8",
      },
      "&:hover fieldset": {
        borderColor: "#FFE68F",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFE68F",
      },
    },
  });

  function save() {
    var tmp = document.getElementById("custom-css-outlined-input");
    tmp2 = tmp.value;
    // alert(tmp1);
    // setInput(tmp1);
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography component="div">
              <Box
                sx={{
                  fontSize: "2.8rem",
                  fontWeight: "bold",
                  margin: 0,
                  lineHeight: "55px",
                }}
              >
                Grab a _NFT_ for{" "}
                <span style={{ color: "#FFE68F" }}>0.02 ETH </span>
                before they are gone!
              </Box>
              <Box
                sx={{
                  fontSize: "18px",
                  margin: "0  0 1.4rem 0",
                  color: "#FFE68F",
                }}
              >
                {feedback}
              </Box>
            </Typography>
            <Box
              sx={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                margin: "0 0 20px 0",
                width: "50%",
              }}
            >
              <CssTextField
                label="Enter the number of NFTs to be deployed"
                id="custom-css-outlined-input"
              />
            </Box>
            <Box>
              <CustomButton
                type="submit"
                disabled={claimingNft ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  save();
                  // alert(tmp2);
                  claimNfts(tmp2);
                }}
              >
                {claimingNft ? "Busy Claiming" : "Claim NFT"}
              </CustomButton>
            </Box>
          </Grid>
          <Grid item xs={5} className="img">
            <img class="object" src={Image} alt="Astronaut" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Mint;
