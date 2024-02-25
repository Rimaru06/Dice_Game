import { useState } from "react"
import NumberSelector from "./NumberSelector"
import RoleDice from "./RoleDice"
import { TotalScore } from "./TotalScore"
import styled from "styled-components"
import Rules from "./Rules"

export const GamePlay = () => {
  const [score, setscore] = useState(0);
  const [selectedNumber, setselectNumber] = useState();
  const [currentDice, setcurrentDice] = useState(1);
  const [error, seterror] = useState("")
  const [showrules ,setshowrule] = useState(false)

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const roleDice = () => {
    if (!selectedNumber) {
      seterror("you have not selected any number");
      return;
    }

    const randomNum = generateRandomNumber(1, 7)

    setcurrentDice((prev) => randomNum);

    if (selectedNumber === randomNum) {
      setscore((prev) => prev + randomNum)
    }
    else {
      setscore((prev) => prev - 2)
    }

    setselectNumber(undefined);
  }

  const resetScore = () =>{
    setscore(0);
  }


  return (
    <MainContainer>
      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector
          error={error}
          seterror={seterror}
          selectedNumber={selectedNumber}
          setselectNumber={setselectNumber}
        />
      </div>
      <RoleDice currentDice={currentDice}
        roleDice={roleDice} />
      <div className="btns">
        <Button
        onClick={resetScore}
        >RESET</Button>
        <Button
        onClick={()=>{
          setshowrule((prev) => !prev)
        }}
        >{showrules ? "Hide" : "show"} Rules</Button>
      </div>
      {showrules && <Rules/>}
    </MainContainer>
  )
}

const MainContainer = styled.div`
padding-top: 20px;
    .top_section{
        display: flex;
        justify-content: space-around;
        align-items: end;
    }
    .btns{
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      align-items: center;
    }
`
const Button = styled.button`
color: white;
padding: 10px 18px;

min-width: 220px;
background: black;
border-radius: 5px;
border: none;
font-size: 16px;
border: 1px solid transparent;
transition: 0.4s ease-in;
cursor: pointer;

&:hover{
    background-color: white;
    border: 1px solid black;
    color: black;
    transition: 0.3s ease-in;
} 
`



