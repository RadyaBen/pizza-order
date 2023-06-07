import { NoResultsSearchProps } from './NoResultSearch.props';

export const NoResultsSearch = ({ searchQuery }: NoResultsSearchProps) => {
    return (
        <>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20'
                version='1.1'
                viewBox='0 0 20 20'
                width='20'>
                <g id='layer1'>
                    <path
                        // eslint-disable-next-line max-len
                        d='M 7.5 0 C 3.3637867 0 0 3.3637867 0 7.5 C 0 10.306731 1.551733 12.753377 3.8398438 14.039062 L 4.5761719 13.302734 C 2.4544594 12.233912 1 10.042439 1 7.5 C 1 3.9042268 3.9042268 1 7.5 1 C 10.042439 1 12.233912 2.4544594 13.302734 4.5761719 L 14.039062 3.8398438 C 12.753376 1.5517328 10.306731 -2.9605947e-016 7.5 0 z M 18.646484 0.64648438 L 0.64648438 18.646484 L 1.3535156 19.353516 L 19.353516 1.3535156 L 18.646484 0.64648438 z M 14.982422 7.1386719 L 13.966797 8.1542969 C 13.661258 11.226673 11.226673 13.661258 8.1542969 13.966797 L 7.1386719 14.982422 C 7.2591028 14.988403 7.3780487 15 7.5 15 C 9.3884719 15 11.109881 14.292492 12.429688 13.136719 L 19.146484 19.853516 C 19.616947 20.383726 20.383726 19.616947 19.853516 19.146484 L 13.136719 12.429688 C 14.292492 11.109882 15 9.3884719 15 7.5 C 15 7.3780487 14.988403 7.2591028 14.982422 7.1386719 z '
                        style={{
                            fill: '#22222',
                            fillOpacity: 1,
                            stroke: 'none',
                            strokeWidth: '0px',
                        }}
                    />
                </g>
            </svg>
            <p>Sorry, no results found for:</p>
            <p>"{searchQuery}"</p>
        </>
    );
};