import React, { useState } from 'react'
import styles from "./Calculator.module.css";
import { Input } from '@/components/ui/input';
import * as math from 'mathjs';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import CustomDialogContent from '@/components/modal';
import ButtonNum from '@/components/ButtonNum';

type Props = {}

const Calculator = (props: Props) => {

    const [expression, setExpression] = useState<string>('0');
    const [result, setResult] = useState<string | number>('0');
    const [showResult, setShowResult] = useState(false);
    const [history, setHistory] = useState<expression, result[]>([]);;

    const { toast } = useToast();

    const buttons = [
        { label: "C" },
        { label: "/" },
        { label: "*" },
        { label: "-" },
        { label: "7" },
        { label: "8" },
        { label: "9" },
        { label: "+" },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "=" },
        { label: "0" },
        { label: "." },
    ];

    const handleButtonClick = (button: string) => {

        if (button === "C") {
            setExpression('0');
            setResult('0');
            setShowResult(false);
            return;
        }

        if (button === "=") {
            try {
                if (!expression) {
                    toast({ title: "uh oh", description: 'Please enter an expression' });
                    return;
                }

                const evaluatedResult = math.evaluate(expression);

                if (evaluatedResult === undefined || isNaN(evaluatedResult)) {
                    toast({ title: "uh oh", description: 'invalid expression' });
                    return;
                }

                setResult(evaluatedResult);
                setShowResult(true);
                setHistory([...history, { expression, result: evaluatedResult }]);
            } catch (error) {
                toast({ title: "uh oh", description: 'invalid expression' });
                console.log(error)
            }
            return;
        }

        if (showResult) {
            if (['+', '-', '*', '/'].includes(button)) {
                setExpression(result + button);
            } else {
                setExpression(button);
            }
            setShowResult(false);
            return;
        }

        if (expression === "0") {
            setExpression(button);
        } else {
            setExpression(expression + button);
        }

    };

    const handleHistoryClick = (item) => {
        setExpression(item.result);
        setShowResult(false)
    }

    const displayValue = showResult ? result : expression;

    return (
        <div className='flex flex-col justify-center items-center min-w-[15rem] max-h-[80vh] min-h-[20rem] border px-5 rounded-md'>

            <Dialog>
                <DialogTrigger asChild>
                    <Input type='text' className='w-[100%] h-12 px-4 border border-gray-300 rounded-md' value={displayValue} readOnly />
                </DialogTrigger>
                <CustomDialogContent>
                    {history.map((item, index) => (
                        <DialogClose asChild key={index}>
                            <div className='flex justify-between items-center border-b border-gray-300 p-2 cursor-pointer' onClick={() => handleHistoryClick(item)}>
                                <span>{item.expression}</span>
                                <span>{item.result}</span>
                            </div>
                        </DialogClose>

                    ))}
                </CustomDialogContent>
            </Dialog>

            <div className={["w-[15rem] mt-2", styles.parent].join(" ")}>
                {buttons.map((button, index) => (
                    <ButtonNum index={index + 1} button={button.label} handleButtonClick={handleButtonClick} />
                ))}
            </div>

        </div>
    )
}

export default Calculator