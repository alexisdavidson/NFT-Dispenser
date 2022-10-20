import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import configContract from './configContract';
import dispenserIdle from './assets/Idle.gif'
import dispenserActivate from './assets/Activate.gif'

const Home = ({ account, nft, token }) => {
    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState("0")

    const loadBalance = async () => {
        console.log("Current user account: " + account)
        setBalance((await token.balanceOf(account)).toString())
        setLoading(false)
    }

    const play = async () => {
        let price = await nft.getPrice()
        await(await nft.mint(price)).wait()
      }

    useEffect(() => {
        loadBalance()
    }, [])

    return (
        // <div className="flex justify-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <div className="container-fluid mt-4">
            <Row className="m-auto">
                <Col className="m-0 mb-4 mx-auto col-1 col-lg-2 col-xl-2" style={{backgroundColor: "rgb(1,1,1,0.5)"}}>
                    <Row>
                        <div class="roseButton my-3"><p>CRANK</p></div>
                    </Row>
                    <Row>
                        <div class="pinkButton my-3"><p>REDEEM</p></div>
                    </Row>
                    <Row>
                        <p>HISTORY / WINNING</p>
                    </Row>
                </Col>
                <Col className="m-0 mb-4 mx-auto col-12 col-lg-6 col-xl-6" style={{backgroundColor: "rgb(1,1,1,0.3)"}}>
                    <img src={dispenserIdle} onClick={() => play()} />
                </Col>
                <Col className="m-0 mb-4 mx-auto col-1 col-lg-2 col-xl-2" style={{backgroundColor: "rgb(1,1,1,0.5)"}}>
                    <Row>
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
            </Row>
        </div>
    );
}
export default Home