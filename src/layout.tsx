import React from 'react'
import { ModeToggle } from './components/mode-toggle';
import { Toaster } from './components/ui/toaster';

type Props = {
    children: React.ReactNode;
}

const Layout = (props: Props) => {
    const { children } = props;
    return (
        <div className="relative min-w-screen min-h-screen flex flex-col">
            <div className="flex-grow flex justify-center items-center">
                {children}
            </div>
            <ModeToggle classNames="absolute bottom-0 left-0 m-3" />
            <Toaster />
        </div>
    )
}

export default Layout