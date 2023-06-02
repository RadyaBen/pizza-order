export interface ConfirmDialogProps {
    title: string;
    message: string;
    deletion: string;
    onRemovePizza?: () => void;
    onClearCart?: () => void;
    onClose: () => void;
}
