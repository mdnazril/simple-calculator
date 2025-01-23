import React from 'react'
import styles from "./Calculator.module.css";

type Props = {
    button: string,
    index: number,
    handleButtonClick: (button: string) => void
}

const ButtonNum = (props: Props) => {

    const { button, index, handleButtonClick } = props;

    return (
        <button className={["border-2 rounded-md", styles[`div${index}`]].join(" ")} onClick={() => handleButtonClick(button)}>{button}</button>
    )
}

export default ButtonNum