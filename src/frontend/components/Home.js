import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import configContract from './configContract';

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
        <div className="flex justify-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
            <div className="px-5 container">
                <p>Token Balance: {balance != null ? balance : "null"}</p>
            </div>

            <div className="px-5 container">
                <Col className="px-5">
                    <Row className="pt-2">
                        <Button onClick={() => play()} variant="primary">Play</Button>
                    </Row>
                </Col>
            </div>
        </div>
    );
}
export default Home