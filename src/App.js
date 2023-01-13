import React from "react";
import Die from "./die";
import './index.css'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App () {
    //state to change dice
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzie, setTenzie] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.Held)
        const secondValue = dice[1].value
        const allSame = dice.every(die => die.value === secondValue)
        if(allHeld && allSame){
            setTenzie(true)
        }
    },[dice])

    //Generate dies
    function generateNewDice(){
        let random = Math.ceil(Math.random() * 6)
        return {
            value: random,
            Held : false,
            id:nanoid()
        }
    }
    //Function to get random number
    function allNewDice(){
        const array=[]
        for(let i=0; i < 10; i++){
            array.push(generateNewDice())
        }
        return array
    }

    //function to roll no of Dice
    function roll(){
        
        if(!tenzie){
            setRollCount(prev => prev + 1)
            console.log(rollCount)

            setDice(oldDice => oldDice.map(dies=>{
                return dies.Held ?
                dies:
                generateNewDice()
            }))
        } else {
            setDice(allNewDice())
            setTenzie(false)
            rollCount(0)
        }

        
    }

    //functilon to know die that was clicked
    function hold(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
            {...die, Held: !die.Held} :
            die
        }))
    }

    // Map over the Dice state 
    const newDice = dice.map(die=> {
        return <Die key={die.id} value={die.value} Held={die.Held} hold={()=> hold(die.id)} />
    })

    function Result(){
        return (
            <div>
                <h4>Your total Roll is {rollCount}</h4>
            </div>
        )
    }
    return (
        <main>
            {tenzie && <Confetti /> && <Result /> }
            <div className="die-component">
                {newDice}
            </div>
            <button className="roll-btn" onClick={roll} >
                {tenzie ? 'New Game' : 'Roll'}
            </button>
        </main>
    )
}