import classNames from 'classnames';

import { ButtonProps } from './Button.props';

export const Button = ({
    children,
    className,
    variant,
    shape,
    name,
    color,
    onClick,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={classNames('button', className, {
                'button--outline': variant === 'outline',
                'button--circle': shape === 'circle',
                'button--add': name === 'add',
            })}
            onClick={onClick}
            {...props}
		>
            {children}
        </button>
    );
};
