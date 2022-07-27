import React from 'react';

const LoadingWrapper = Component => {
    return function Loading ({ isLoading, ...props }){
        if (!isLoading) return <Component {...props} />
        return (
            <p>Loading...</p>
        )
    }
};

export default LoadingWrapper;

