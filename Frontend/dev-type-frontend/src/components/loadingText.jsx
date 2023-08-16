import React from "react";

const LoadingText = () => {
	
    // Three animated dots that appear like a loading text: ...
    // control the animation with css
    

    return (
        <div className="loading-text">
            <span className="loading-text__dot">.</span>
            <span className="loading-text__dot">.</span>
            <span className="loading-text__dot">.</span>
        </div>
    );
};

export default LoadingText;
