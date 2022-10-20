import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import configContract from './configContract';
import dispenserIdle from './assets/Idle.gif'
import dispenserActivate from './assets/Activate.gif'
import logo from './assets/PorkersLogo.png'
import info from './assets/info_button01.png'

const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

const Home = ({ web3Handler, account, nft, token }) => {
    const [playing, setPlaying] = useState(false)
    const [showInfo, setShowInfo] = useState(false);
    const [showPrize, setShowPrize] = useState(false);
    const [showRedeem, setShowRedeem] = useState(false);
    const [showCrank, setShowCrank] = useState(false);
    const [redeemTokenId, setRedeemTokenId] = useState(0);
  
    const handleClose = () => { 
        setShowInfo(false);
        setShowPrize(false);
        setShowRedeem(false);
        setShowCrank(false);
    }

    const infoPopup = () => {
        console.log("infoPopup")
        setShowInfo(true);
    }

    const prizePopup = () => {
        console.log("prizePopup")
        setShowPrize(true);
    }

    const redeemPopup = () => {
        console.log("redeemPopup")
        setShowRedeem(true);
    }

    const crankPopup = () => {
        console.log("crankPopup")
        setShowCrank(true);
    }

    const triggerMint = async () => {
        if (account == null) {
            web3Handler();
            return;
        }

        setPlaying(true)
        console.log("play")

        // let price = fromWei(await nft.getPrice())
        // console.log("price is : " + price)
        await(await nft.mint()).wait()
        setPlaying(false)
    }

    const updateRedeemTokenId = event => {
        console.log(event.target.value);
        setRedeemTokenId(event.target.value);
    }

    const triggerRedeem = async () => {
        handleClose()
        console.log("Redeem token " + redeemTokenId)
        await(await nft.redeemAndBurn(redeemTokenId)).wait()
    }

    useEffect(() => {
    }, [])

    return (
        // <div className="flex justify-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <div className="m-0 p-0 container-fluid">
            <Row className="p-0 m-0">
                <Col className="ps-5 pe-0 mx-0 my-4 col-3" style={{backgroundColor: "rgb(1,1,1,0.0)"}}>
                    <Row>
                        <img src={logo} alt="" />
                    </Row>
                    <Row style={{marginTop: "150px"}}>
                        <a href="#">
                            <div class="roseButton my-3" onClick={triggerMint} ><p>CRANK</p></div>
                        </a>
                    </Row>
                    <Row className="m-0 p-0">
                        <a href="#">
                            <div class="pinkButton my-3" onClick={redeemPopup} ><p>REDEEM</p></div>
                        </a>
                    </Row>
                    <Row>
                        <p style={{ fontSize: "25px"}} >HISTORY/WINNING</p>
                    </Row>
                </Col>
                <Col className="m-0 mb-4 px-0 col-12 col-lg-6 col-xl-6" style={{backgroundColor: "rgb(1,1,1,0.0)"}}>
                    {!playing ? (
                        <img src={dispenserIdle} width="100%" height="auto" />
                    ) : (
                        <img src={dispenserActivate} width="100%" height="auto" />
                    )}
                </Col>
                <Col className="mx-auto my-4 col-2" style={{backgroundColor: "rgb(1,1,1,0.0)"}}>
                    <Row>
                        <a href="#">
                            {account ? (
                                <div class="roseButton"><p>{account.slice(0, 6)}...</p></div>
                            ) : (
                                <div class="roseButton" onClick={web3Handler}><p>CONNECT</p></div>
                            )}
                        </a>
                    </Row>
                    <Row style={{marginTop: "150px"}}>
                        <a href="#">
                            <div class="purpleButton my-3" onClick={prizePopup} ><p>PRIZE</p></div>
                        </a>
                    </Row>
                    <Row>
                        <a href="https://app.uniswap.org/#/swap" target="_blank">
                            <div class="purpleButton my-3" style={{ fontSize: "38px"}} >
                                <p>GET $PORK</p>
                            </div>
                        </a>
                    </Row>
                    <Row>
                        <div class="grayButton my-3" style={{ fontSize: "38px"}} ><p>$PORK NFT</p></div>
                    </Row>
                    <Row>
                        <p style={{ fontSize: "25px"}}>EXCHANGE SOON</p>
                    </Row>
                </Col>
                <Col className="ms-auto me-0 my-4 col-1">
                    <a href="#">
                        <img class="" src={info} onClick={infoPopup} />
                    </a>
                </Col>
            </Row>

            {/* Popup frames */}
            {showInfo ? (
                <Row className="popupFrame m-0 p-0 container-fluid" >
                    <Row className="splashScreen my-3 p-5 container-fluid" style={{ fontSize: "4vh"}} >
                        <Row className="mx-auto mt-4">
                            <h2 className="mt-4" style={{ fontSize: "5vh"}}>INFO</h2>
                        </Row>
                        <Row className="mx-auto mt-0 mb-4">
                            <p className="mb-2">1 'NFT Winner' Trait = Special Prize</p>
                            <p className="my-2">2 'NFT Winner' Trait = Grand Prize</p>
                            <p className="my-2">3 'NFT Winner' Trait = Ultimate Prize</p>
                        </Row>
                    </Row>
                    <Button className="frameCloseButton" onClick={handleClose}></Button>
                </Row>
            ) : ( <></> )}

            {showPrize ? (
                <Row className="popupFrame m-0 p-0 container-fluid" >
                    <Row className="splashScreen my-3 p-5 container-fluid" style={{ fontSize: "4vh"}} >
                        <Row className="mx-auto mt-4">
                            <h2 className="mt-4" style={{ fontSize: "5vh"}}>PRIZE</h2>
                        </Row>
                        <Row className="mx-auto mt-0 mb-4">
                            <p className="mb-2">Consolation Prize = 1 Old Farm Man</p>
                            <p className="my-2">Special Prize = 1 NFT Worth 1 $ETH</p>
                            <p className="my-2">Grand Prize = 1 NFT Worth 5 $ETH</p>
                            <p className="my-2">Ultimate Prize = ??????????</p>
                        </Row>
                    </Row>
                    <Button className="frameCloseButton" onClick={handleClose}></Button>
                </Row>
            ) : ( <></> )}

            {showRedeem ? (
                <Row className="popupFrame m-0 p-0 container-fluid" >
                    <Row className="splashScreen my-3 p-5 container-fluid" style={{ fontSize: "4vh"}} >
                        <Row className="mx-auto mt-4">
                            <h2 className="mt-4" style={{ fontSize: "5vh"}}>REDEEM FOR?</h2>
                        </Row>
                        <Row className="mx-auto mt-0">
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>TOKEN ID</Form.Label>
                                    <Form.Control onChange={updateRedeemTokenId.bind(this)} />
                                </Form.Group>
                            </Form>
                            <a href="#">
                                <div class="pinkButton" onClick={triggerRedeem} ><p>CONFIRM</p></div>
                            </a>
                            <p className="mt-1" style={{ fontSize: "3vh"}}>***Prize will be send to your wallet on 12PM UTC</p>
                        </Row>
                    </Row>
                    <Button className="frameCloseButton" onClick={handleClose}></Button>
                </Row>
            ) : ( <></> )}
        </div>
    );
}
export default Home