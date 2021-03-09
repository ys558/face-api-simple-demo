import React from "react"
import { useRecoilState } from 'recoil';
import { leftColorState, rightColorState} from '../stateManager'

const boxStyle = {
    width: "300px",
    height: "200px",
    fontSize: "50px",
    textAlign: "center"
}

export const LeftBox = (props) => {
    const [leftColor, setLeftColor] = useRecoilState(leftColorState)
    const [rightColor, setRightColor] = useRecoilState(rightColorState)
    return (
        <div 
            style={{...boxStyle, backgroundColor: leftColor}} 
            onClick={()=> setRightColor( rightColor => rightColor === "green"? "yellow" : "green" )}
        >
            click me
        </div>
    );
}
