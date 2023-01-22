import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className='loader'>
      <CircularProgress /> 
    </div>
  )
}

export default LoadingSpinner;