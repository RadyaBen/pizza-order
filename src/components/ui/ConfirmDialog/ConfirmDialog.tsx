import { Button } from '../../index';
import { ConfirmDialogProps } from './ConfirmDialog.props';

import styles from './ConfirmDialog.module.scss';

export const ConfirmDialog = ({
    title,
    message,
    deletion,
    onRemovePizza,
    onClearCart,
    onClose,
}: ConfirmDialogProps) => {
    return (
        <div className={styles['confirm-dialog']}>
            <h1 className={styles['confirm-dialog__title']}>{title}</h1>
            <p className={styles['confirm-dialog__body']}>{message}</p>
            <div className={styles['confirm-dialog__buttons']}>
                <Button
					className={styles['btn--cancel']}
					onClick={onClose}
				>
                    Cancel
                </Button>
                <Button
					className={styles['btn--delete']}
                    onClick={() => {
                        deletion === 'item' ? onRemovePizza?.() : onClearCart?.();
                        onClose();
                    }}
				>
                    Delete
                </Button>
            </div>
        </div>
    );
};
