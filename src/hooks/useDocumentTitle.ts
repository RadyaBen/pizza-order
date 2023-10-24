import React from 'react';

export const useDocumentTitle = (pageTitle: string | undefined): void => {
    React.useEffect(() => {
        const prevTitle = document.title;

        if (pageTitle) {
            document.title = pageTitle as string;
        }

        return () => {
            document.title = prevTitle;
        };
    }, [pageTitle]);
};
