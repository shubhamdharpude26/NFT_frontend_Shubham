import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import { Container, Box, Grid, Button, Typography } from "@mui/material";
import Image from "./img/eth.png";
import "./Hero.css";
import swal from 'sweetalert';
import { withStyles } from "@material-ui/core/styles";

const CustomButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})((props) => <Button {...props} />);

export default function Hero() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setfeedback] = useState("May be it's your lucky day!");
  const [claimingNft, setClamingNft] = useState(false);

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

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  })
 
  function onSuccess() {
    console.log(blockchain);
    swal('Success', " ", "success");
  }

  function onError() {
    swal("Error", "Connect to rinkeby network only!", "error");
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
                <Box sx={{ fontSize: "2.8rem", fontWeight: "bold", margin: 0,lineHeight: "47px" }}>
                  Connect to the Ethereum Network
                </Box>
                <Box sx={{ fontSize: "18px", margin: "0  0 1.4rem 0" }}>
                  Rinkeby Test Network
                </Box>
              </Typography>
              <Box sx={{marginTop: "10px"}}>
                <CustomButton
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                  }}
                >
                  Connect
                </CustomButton>
              </Box>
            </Grid>
            <Grid item xs={5} className="img">
              <img src={Image} alt="Ethereum"/>
            </Grid>
          </Grid>
          {blockchain.errorMsg !== "" ? (
            onError()
          ) : null}
        </Box>
    </Container>
  );
}
