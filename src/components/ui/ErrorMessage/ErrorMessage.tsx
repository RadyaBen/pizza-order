import classNames from 'classnames';

import { WarningIcon } from '../..';

import { ErrorMessageProps } from './ErrorMessage.props';

import styles from './ErrorMessage.module.scss';

const errorStyles = classNames(
	styles['request-error'],
	'content__error-message',
);

export const ErrorMessage = ({ requestError }: ErrorMessageProps) => {
    return (
        <div className={errorStyles}>
            <WarningIcon />
            <h2 className={styles['request-error__message']}>{requestError} </h2>
            <p className={styles['request-error__description']}>
                An error occurred while rendering the page. Please try again later.
            </p>
        </div>
    );
};
