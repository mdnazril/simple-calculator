import React from 'react'
import { ModeToggle } from './components/mode-toggle';
import { Toaster } from './components/ui/toaster';

type Props = {
    children: React.ReactNode;
}

const Layout = (props: Props) => {
    const { children } = props;
    return (
        <div className='relative w-screen h-screen'>
            {children}
            <ModeToggle classNames="absolute bottom-0 left-0 m-3" />
            <Toaster />
        </div>
    )
}

export default Layout