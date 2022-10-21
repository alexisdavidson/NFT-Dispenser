import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import dispenserIdle from './assets/Idle.gif'
import dispenserActivate from './assets/Activate.gif'
import logo from './assets/PorkersLogo.png'
import info from './assets/info_button01.png'

const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

const Home = ({ web3Handler, account, nft, token, items }) => {
    const [playing, setPlaying] = useState(false)
    const [showInfo, setShowInfo] = useState(false);
    const [showPrize, setShowPrize] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showRedeem, setShowRedeem] = useState(false);
    const [showCrank, setShowCrank] = useState(false);
    const [redeemTokenId, setRedeemTokenId] = useState(0);
    const [redeemTokenWish, setRedeemTokenWish] = useState("");
  
    const handleClose = () => { 
        setShowInfo(false);
        setShowPrize(false);
        setShowRedeem(false);
        setShowCrank(false);
        setShowHistory(false);
    }

    const infoPopup = () => {
        handleClose()
        console.log("infoPopup")
        setShowInfo(true);
    }

    const prizePopup = () => {
        handleClose()
        console.log("prizePopup")
        setShowPrize(true);
    }

    const redeemPopup = (id) => {
        handleClose()
        console.log("redeemPopup " + id)
        setRedeemTokenId(id)
        setShowRedeem(true);
    }

    const historyPopup = () => {
        handleClose()
        console.log("historyPopup")
        setShowHistory(true);
    }

    const crankPopup = () => {
        handleClose()
        console.log("crankPopup")
        setShowCrank(true);
    }

    const triggerMint = async () => {
        handleClose()
        if (account == null) {
            web3Handler();
            return;
        }

        setPlaying(true)
        console.log("play")

        await(await nft.mint()).wait()
        setPlaying(false)
    }

    const updateRedeemTokenWish = event => {
        console.log(event.target.value);
        setRedeemTokenWish(event.target.value);
    }

    const triggerRedeem = async () => {
        handleClose()
        console.log("Redeem token " + redeemTokenId + " with wish:")
        console.log(redeemTokenWish)

        // todo: database call

        await(await nft.redeemAndBurn(redeemTokenId)).wait()
    }

    const isNftWinner = (item) => {
        if (item.traits.filter(e => e.trait_type == "Headgear")[0].value == "Soda Cap" // change to NFT Winner when not testing
        || item.traits.filter(e => e.trait_type == "Hand")[0].value == "NFT Winner"
        || item.traits.filter(e => e.trait_type == "Top")[0].value == "NFT Winner") {
            return true;
        }
        return false;
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
                    <Row style={{marginTop: "16vh"}}>
                        <a href="#">
                            <div class="roseButton my-3" onClick={triggerMint} ><p>CRANK</p></div>
                        </a>
                    </Row>
                    <Row className="m-0 p-0">
                        <a href="#">
                            <div class="pinkButton my-3" onClick={historyPopup} ><p>REDEEM</p></div>
                        </a>
                    </Row>
                    <Row>
                        <p style={{ fontSize: "3vh"}} >HISTORY/WINNING</p>
                    </Row>
                </Col>
                <Col className="m-0 mb-4 px-0 col-6" style={{backgroundColor: "rgb(1,1,1,0.0)"}}>
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
                    <Row style={{marginTop: "16vh"}}>
                        <a href="#">
                            <div class="purpleButton my-3" onClick={prizePopup} ><p>PRIZE</p></div>
                        </a>
                    </Row>
                    <Row>
                        <a href="https://app.uniswap.org/#/swap" target="_blank">
                            <div class="purpleButton my-3" style={{ fontSize: "4vh"}} >
                                <p>GET $PORK</p>
                            </div>
                        </a>
                    </Row>
                    <Row>
                        <div class="grayButton my-3" style={{ fontSize: "4vh"}} ><p>$PORK NFT</p></div>
                    </Row>
                    <Row>
                        <p style={{ fontSize: "3vh"}}>EXCHANGE SOON</p>
                    </Row>
                </Col>
                <Col className="ms-auto me-0 my-4 col-1">
                    <a href="#">
                        <img className="infoButton" src={info} onClick={infoPopup} />
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
                                    <Form.Control onChange={updateRedeemTokenWish.bind(this)} placeholder="(TYPE IN YOUR DESIRED NFT)"/>
                                </Form.Group>
                            </Form>
                            <p className="mt-1" style={{ fontSize: "3vh"}}>If your desired NFT cost more than your winning value, we will randomly choose the NFT for you. Choose wisely!</p>
                            <a href="#">
                                <div class="pinkButton" onClick={triggerRedeem} ><p>CONFIRM</p></div>
                            </a>
                            <p className="mt-1" style={{ fontSize: "3vh"}}>***Prize will be send to your wallet on 12PM UTC</p>
                        </Row>
                    </Row>
                    <Button className="frameCloseButton" onClick={handleClose}></Button>
                </Row>
            ) : ( <></> )}

            {showHistory ? (
                <Row className="popupFrame m-0 p-0 container-fluid" >
                    <Row className="splashScreen my-3 p-5 container-fluid" style={{ fontSize: "4vh"}} >

                        {items.length > 0 ?
                            <>
                                {items.map((item, idx) => (
                                    <Row key={idx} className="mx-auto mt-4 p-0">
                                        <Col className="col-1 p-0">{idx + 1}.</Col>
                                        <Col className="col-6 p-0">{item.name}</Col>
                                        <Col className="col-5 p-0">
                                            {isNftWinner(item) ?
                                                <a href="#">
                                                    <div class="pinkButton" onClick={() => redeemPopup(item.token_id)}><p>REDEEM</p></div>
                                                </a>
                                            : (
                                                <>Not A Winner</>
                                            )}
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        : (
                            <Row className="mx-auto mt-4 p-0">
                                <h2>No listed assets.</h2>
                            </Row>
                        )}
                    </Row>
                    <Button className="frameCloseButton" onClick={handleClose}></Button>
                </Row>
            ) : ( <></> )}
        </div>
    );
}
export default Home