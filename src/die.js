import React from "react";
import './index.css'

export default function Die(props){
    const styles = {
        backgroundColor: props.Held ? "green":"white"
    }
    return(
        <div className="die-face" style={styles} onClick={props.hold}>
            <h2 className="die">{props.value}</h2>
        </div>
    )
}
