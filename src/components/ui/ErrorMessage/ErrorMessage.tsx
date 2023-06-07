import classNames from 'classnames';

import { ErrorMessageProps } from './ErrorMessage.props';

import styles from './ErrorMessage.module.scss';

const errorStyles = classNames(styles['request-error'], 'content__error-message');

export const ErrorMessage = ({ requestError }: ErrorMessageProps) => {
    return (
        <div className={errorStyles}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                xlinkHref='http://www.w3.org/1999/xlink'
                enableBackground='new 0 0 48 48'
                height='60px'
                id='Layer_1'
                version='1.1'
                viewBox='0 0 48 48'
                width='60px'
                xmlSpace='preserve'>
                <g id='Layer_3'>
                    <path
                        // eslint-disable-next-line max-len
                        d='M24,0C10.745,0,0,10.745,0,24s10.745,24,24,24s24-10.745,24-24S37.255,0,24,0z M24,44   C12.954,44,4,35.046,4,24S12.954,4,24,4s20,8.954,20,20S35.046,44,24,44z'
                        fill='#635f60'
                    />
                    <g>
                        <circle cx='24' cy='33' fill='#635f60' r='2' />
                        <rect fill='#635f60' height='15.031' width='3.997' x='22.001' y='12.969' />
                    </g>
                </g>
            </svg>
            <h2 className={styles['request-error__message']}>{requestError} </h2>
            <p className={styles['request-error__description']}>
                An error occurred while rendering the page. Please try again later.
            </p>
        </div>
    );
};
