import React from "react"
import { useRecoilState } from 'recoil';
import { leftColorState, rightColorState} from '../stateManager'

const boxStyle = {
    width: "300px",
    height: "200px",
    fontSize: "50px",
    textAlign: "center"
}

export const RightBox = (props) => {
    const [leftColor, setLeftColor] = useRecoilState(leftColorState)
    const [rightColor, setRightColor] = useRecoilState(rightColorState)
    return (
        <div 
            style={{...boxStyle, backgroundColor: rightColor}}
            // leftColor这里可以换个名字， 
            onClick={()=> setLeftColor( leftColor => leftColor === "red"? "purple" : "red" )}
        >
            click me
        </div>
    );
}
