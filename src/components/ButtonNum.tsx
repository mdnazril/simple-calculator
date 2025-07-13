import React from 'react'
import styles from "./Calculator.module.css";

type Props = {
    button: string,
    index: number,
    handleButtonClick: (button: string) => void
}

const ButtonNum = (props: Props) => {

    const { button, index, handleButtonClick } = props;

    const getButtonColor = (title: string) => {
        if (["AC", "C"].includes(title)) return { text: "#F4F4F4", bg: "#D91E18" };
        if (["÷", "X", "-", "+", "="].includes(title)) return { text: "#F4F4F4", bg: "#0D2C54" };
        if (["±", "%", "."].includes(title)) return { text: "#0c0c0c", bg: "#FFD700" };
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(title)) return { text: "#0c0c0c", bg: "#F4F4F4" };
        return { text: "#0c0c0c", bg: "#CCCCCC" };
    };

    return (
        <button
            onClick={() => handleButtonClick(button)}
            className={`
        w-full aspect-square
        rounded-xl
        font-semibold
        flex items-center justify-center
        text-base sm:text-lg md:text-xl
        transition-all duration-200 ease-in-out
        active:scale-95 shadow-md
    `}
            style={{
                backgroundColor: getButtonColor(button).bg,
                color: getButtonColor(button).text
            }}
        >
            {button}
        </button>

    )
}

export default ButtonNum