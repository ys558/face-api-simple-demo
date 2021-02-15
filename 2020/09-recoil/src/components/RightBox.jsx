import React from "react"
import { useRecoilState } from 'recoil';
import { leftColorState, rightColorState} from '../stateManager'

const boxStyle = {
    width: "300px",
    height: "200px",
    fontSize: "50px",
    textAlign: "center"
}
const toggleLeftColor = (currentColor) => {
    return currentColor === "red"? "purple" : "red"
}
export const RightBox = (props) => {
    const [leftColor, setLeftColor] = useRecoilState(leftColorState)
    const [rightColor, setRightColor] = useRecoilState(rightColorState)
    return (
        <div style={{...boxStyle, backgroundColor: rightColor}} onClick={()=>setLeftColor(toggleLeftColor(leftColor))}>
            click me
        </div>
    );
}
