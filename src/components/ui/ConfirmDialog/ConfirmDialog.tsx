import classNames from 'classnames';

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
                <button
					onClick={onClose}
					className={classNames('button', styles['btn--cancel'])}
				>
                    Cancel
                </button>
                <button
                    onClick={() => {
                        deletion === 'item' ? onRemovePizza?.() : onClearCart?.();
                        onClose();
                    }}
                    className={classNames('button', styles['btn--delete'])}
				>
                    Delete
                </button>
            </div>
        </div>
    );
};
