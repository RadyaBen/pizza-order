import classnames from 'classnames';

import styles from './ConfirmDialog.module.scss';

export const ConfirmDialog = ({
	title,
	message,
	deletion,
	onRemovePizza,
	onClearCart,
	onClose,
}) => {
    return (
        <div className={styles['confirm-dialog']}>
            <h1 className={styles['confirm-dialog__title']}>{title}</h1>
            <p className={styles['confirm-dialog__body']}>{message}</p>
            <div className={styles['confirm-dialog__buttons']}>
                <button
                    onClick={onClose}
                    className={classnames(
                        'button',
                        styles[('confirm-dialog__buttons', 'btn--cancel')],
                    )}>
                    Cancel
                </button>
                <button
                    onClick={() => {
                        deletion === 'item' ? onRemovePizza() : onClearCart();
                        onClose();
                    }}
                    className={classnames(
                        'button',
                        styles[('confirm-dialog__buttons', 'btn--delete')],
                    )}>
                    Delete
                </button>
            </div>
        </div>
    );
};
