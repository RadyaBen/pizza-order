import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={500}
        viewBox='0 0 280 500'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'>
        <circle cx='140' cy='134' r='125' />
        <rect x='0' y='279' rx='10' ry='10' width='280' height='24' />
        <rect x='0' y='326' rx='10' ry='10' width='280' height='80' />
        <rect x='0' y='436' rx='10' ry='10' width='120' height='35' />
        <rect x='165' y='427' rx='25' ry='25' width='115' height='50' />
    </ContentLoader>
);
