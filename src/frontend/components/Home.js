import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import configContract from './configContract';

const Home = ({ account, nft, token, dispenser }) => {
    const [loading, setLoading] = useState(true)
    const [mintQuantity, setMintQuantity] = useState(1)
    const [stakeId, setStakeId] = useState(null)
    const [unstakeId, setUnstakeId] = useState(null)
    const [balance, setBalance] = useState("0")
    const [nftBalance, setNftBalance] = useState("0")
    const [isWhitelisted, setIsWhitelisted] = useState(false)
    const [items, setItems] = useState([])

    const loadBalance = async () => {
        console.log("Current user account: " + account)
        setBalance((await token.balanceOf(account)).toString())
        setLoading(false)
    }

    const play = async () => {
        await(await dispenser.play()).wait()
      }

    useEffect(() => {
        loadBalance()
    }, [])

    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
        </main>
    )

    return (
        <div className="flex justify-center">
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