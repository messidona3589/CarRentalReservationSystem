import React from "react";
import styled from "styled-components";

const LoadingBlock = styled.div`
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }

  .loading-spinner {
    border: 8px solid #ccc;
    border-top-color: #0074d9;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s infinite linear;
    margin-right: 10px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <LoadingBlock>
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </LoadingBlock>
  );
};

export default Loading;