import React from 'react'
import LoadingSpinner from 'react-loader-spinner';
import LoadingOverlay from 'react-loading-overlay';
import '../Loader.css';

function Loader({isLoading}) {
    return (
        <div className="loader">
            <div className="loader_content">
                <LoadingOverlay
                active={isLoading}
                spinner={
                <LoadingSpinner
                type="ThreeDots"
                color="#D8EEE7"
                height={80}
                width={190}
                />}
                text={<div> Please wait a second... </div>}
                >
                </LoadingOverlay>
                <p></p>
            </div>
        </div>
    )
}


export default Loader
