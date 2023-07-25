import React from 'react';

export interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children: React.ReactNode;
    variant?: 'outline';
    shape?: 'circle';
    name?: 'add';
    onClic?: () => void;
}
