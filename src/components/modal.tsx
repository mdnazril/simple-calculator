import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const CustomDialogContent = ({ children }) => {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>History</DialogTitle>
            </DialogHeader>
            {children}
        </DialogContent>
    )
}

export default CustomDialogContent;
