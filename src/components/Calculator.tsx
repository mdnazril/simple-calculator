import React, { useState } from 'react'
import styles from "./Calculator.module.css";
import * as math from 'mathjs';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import CustomDialogContent from '@/components/modal';
import ButtonNum from '@/components/ButtonNum';
import useStore, { HistoryItem } from '@/store/useStore';
import { Button } from './ui/button';

type Props = {}

const Calculator = (props: Props) => {

    const { toast } = useToast();
    const [showResult, setShowResult] = useState(false);
    const { history, setHistory, lastExpression, setLastExpression, total, setTotal, currentExpression, setCurrentExpression, reset } = useStore();

    const buttons = [
        { label: "AC", onPress: () => handleClearAll() },
        { label: "C", onPress: () => handleClear() },
        { label: "%", onPress: () => handleClick('7') },
        { label: "÷", onPress: () => handleClick('÷') },
        { label: "7", onPress: () => handleClick('7') },
        { label: "8", onPress: () => handleClick('8') },
        { label: "9", onPress: () => handleClick('9') },
        { label: "X", onPress: () => handleClick('*') },
        { label: "4", onPress: () => handleClick('4') },
        { label: "5", onPress: () => handleClick('5') },
        { label: "6", onPress: () => handleClick('6') },
        { label: "-", onPress: () => handleClick('-') },
        { label: "1", onPress: () => handleClick('1') },
        { label: "2", onPress: () => handleClick('2') },
        { label: "3", onPress: () => handleClick('3') },
        { label: "+", onPress: () => handleClick('+') },
        { label: "±", onPress: () => handlePlusMinus() },
        { label: "0", onPress: () => handleClick('0') },
        { label: ".", onPress: () => handleClick('.') },
        { label: "=", onPress: () => handleEqual() },
    ];

    const handleClear = () => {
        const clearOne = currentExpression.slice(0, -1);
        setCurrentExpression(clearOne);
    };

    const handleClearAll = () => {
        setCurrentExpression("");
        setTotal(0);
        setShowResult(false);
    };

    const handlePlusMinus = () => {
        const expr = currentExpression;

        const match = expr.match(/(.*?)(\(?-?\d+\.?\d*\)?)(?!.*\d)/);

        if (match) {
            const [_, before, lastNum] = match;

            let toggled;
            if (lastNum.startsWith("(-")) {

                toggled = lastNum.slice(2, -1);
            } else if (lastNum.startsWith("-") && !lastNum.startsWith("(-")) {

                toggled = `(${lastNum})`;
            } else {

                toggled = `(-${lastNum})`;
            }

            setCurrentExpression(before + toggled);
        }
    };

    const handleEqual = () => {
        try {
            if (!currentExpression) {
                toast({ title: "Uh Oh", description: 'Please enter an expression' });
                return;
            }

            const evaluatedResult = math.evaluate(currentExpression);

            if (evaluatedResult === undefined || isNaN(evaluatedResult)) {
                toast({ title: "Uh Oh", description: 'Invalid Expression' });

                return;
            }

            setShowResult(true);

            setTotal(evaluatedResult);
            setLastExpression(currentExpression);
            setHistory({ expression: currentExpression, result: evaluatedResult });

        } catch (error) {
            toast({ title: "Uh Oh", description: 'Invalid Expression' });
            console.log(error)
        }
        return;

    };

    const handleClick = (button: string) => {

        const expression = currentExpression;

        if (showResult) {
            if (['+', '-', '*', '/'].includes(button)) {
                setCurrentExpression(total + button);
            } else {
                setCurrentExpression(button);
            }
            setShowResult(false);
            return;
        }

        if (expression === "0") {
            setCurrentExpression(button);
        } else {
            setCurrentExpression(expression + button);
        }

    };

    const handleHistoryClick = (item: HistoryItem) => {
        //   @ts-ignore
        setCurrentExpression(item.result);
        setShowResult(false)
    }

    const displayValue = showResult ? total : currentExpression;

    return (
        <div className='flex flex-col justify-center items-center w-full max-w-lg  my-auto border-card-foreground/80 border-1 mx-2 p-5 rounded-md bg-card'>

            <Dialog>
                <DialogTrigger asChild>
                    <div className='w-full py-2 px-1 border border-gray-500 rounded-md text-right flex flex-col justify-end items-end h-18'>
                        <p
                            className={`text-sm w-full overflow-x-auto whitespace-nowrap ${showResult ? 'text-gray-500' : 'text-transparent'}`}
                        >
                            {lastExpression}
                        </p>
                        <p
                            className='text-2xl w-full overflow-x-auto whitespace-nowrap'
                        >
                            {displayValue}
                        </p>
                    </div>

                </DialogTrigger>
                <CustomDialogContent
                    footer={<Button onClick={reset}>Clear History</Button>}
                    children={
                        <div className='overflow-y-scroll overflow-x-hidden max-h-[80vh] px-2'>
                            {history.map((item, index) => (
                                <DialogClose asChild key={index}>
                                    <div className='flex justify-between items-center border-b border-gray-500 p-1 cursor-pointer' onClick={() => handleHistoryClick(item)}>
                                        <span className='w-1/2 overflow-hidden text-ellipsis'>{item.expression}</span>
                                        <span>{item.result}</span>
                                    </div>
                                </DialogClose>
                            ))}
                        </div>
                    }
                />
            </Dialog>

            <div className="grid grid-cols-4 gap-2 w-full max-w-lg mt-4">
                {buttons.map((button, index) => (
                    <ButtonNum index={index + 1} button={button.label} handleButtonClick={button.onPress} />
                ))}
            </div>

        </div>
    )
}

export default Calculator
