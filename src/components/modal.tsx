import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

type props = {
    children: React.ReactNode,
    footer?: React.ReactNode
}
const CustomDialogContent = ({ children, footer }: props) => {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>History</DialogTitle>
            </DialogHeader>
            {children}

            <DialogFooter>
                {footer}
            </DialogFooter>
        </DialogContent>
    )
}

export default CustomDialogContent;
