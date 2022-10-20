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

    useEffect(() => {
    }, [])

    return (
        // <div className="flex justify-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <div className="p-0 container-fluid">
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
                        <img src={dispenserIdle} />
                    ) : (
                        <img src={dispenserActivate} />
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
                <Col className="mx-auto my-4 col-1">
                    <a href="#">
                        <img class="" src={info} onClick={infoPopup} />
                    </a>
                </Col>
            </Row>


        {/* Modals */}

        <Modal show={showInfo} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>1 'NFT Winner' Trait = Special Prize</Modal.Body>
            <Modal.Body>2 'NFT Winner' Trait = Grand Prize</Modal.Body>
            <Modal.Body>3 'NFT Winner' Trait = Ultimate Prize</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showCrank} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crank</Modal.Title>
            </Modal.Header>
            <Modal.Body>1 $PORK</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Crank
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showPrize} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Prize</Modal.Title>
            </Modal.Header>
            <Modal.Body>Consolation Prize = 1 Old Farm Man</Modal.Body>
            <Modal.Body>Special Prize = 1 NFT Worth 1 $ETH</Modal.Body>
            <Modal.Body>Grand Prize = 1 NFT Worth 5 $ETH</Modal.Body>
            <Modal.Body>Ultimate Prize = ??????????</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}
export default Home