import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import configContract from './configContract';
import dispenserIdle from './assets/Idle.gif'
import dispenserActivate from './assets/Activate.gif'
import logo from './assets/PorkersLogo.png'
import info from './assets/info_button01.png'

const Home = ({ web3Handler, account, nft, token }) => {
    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState("0")

    const infoPopup = () => {
        console.log("infoPopup")
    }

    const loadBalance = async () => {
        console.log("Current user account: " + account)
        setBalance((await token.balanceOf(account)).toString())
        setLoading(false)
    }

    const play = async () => {
        console.log("play")
        let price = await nft.getPrice()
        await(await nft.mint(price)).wait()
      }

    useEffect(() => {
        loadBalance()
    }, [])

    return (
        // <div className="flex justify-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <div className="p-0 container-fluid">
            <Row className="p-0 m-0">
                <Col className="p-0 ms-5 my-4 col-3" style={{backgroundColor: "rgb(1,1,1,0.0)"}}>
                    <Row>
                        <img src={logo} alt="" />
                    </Row>
                    <Row style={{marginTop: "150px"}}>
                        <div class="roseButton my-3"><p>CRANK</p></div>
                    </Row>
                    <Row className="m-0 p-0">
                        <div class="pinkButton my-3"><p>REDEEM</p></div>
                    </Row>
                    <Row>
                        <p style={{ fontSize: "25px"}} >HISTORY/WINNING</p>
                    </Row>
                </Col>
                <Col className="m-0 mb-4 col-12 col-lg-6 col-xl-6" style={{backgroundColor: "rgb(1,1,1,0.0)"}}>
                    <img src={dispenserIdle} onClick={() => play()}/>
                </Col>
                <Col className="mx-auto my-4 col-2" style={{backgroundColor: "rgb(1,1,1,0.0)"}}>
                    <Row>
                        {account ? (
                            <div class="roseButton"><p>{account.slice(0, 6)}...</p></div>
                        ) : (
                            <div class="roseButton" onClick={web3Handler}><p>CONNECT</p></div>
                        )}
                    </Row>
                    <Row style={{marginTop: "150px"}}>
                        <div class="purpleButton my-3"><p>PRIZE</p></div>
                    </Row>
                    <Row>
                        <div class="purpleButton my-3" style={{ fontSize: "38px"}} ><p>GET $PORK</p></div>
                    </Row>
                    <Row>
                        <div class="grayButton my-3" style={{ fontSize: "38px"}} ><p>$PORK NFT</p></div>
                    </Row>
                    <Row>
                        <p>EXCHANGE SOON</p>
                    </Row>
                </Col>
                <Col className="mx-auto my-4 col-1">
                    <img class="" src={info} onClick={infoPopup} />
                </Col>
            </Row>
        </div>
    );
}
export default Home