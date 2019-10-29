import React, { useState, useEffect } from 'react';

// import { withRouter } from 'react-router-dom'

const ErrorPage = (props) => {
  const [error, setErrors] = useState('')
  useEffect(() => {
    if (props.location && props.location.state) {
      setErrors(props.location.state.errors);
    }
  }, [props])
  return (
    <div>
      <h1>Something Error</h1>
      {error && <div>{error}</div>}
    </div>
  )
};

// export default withRouter(ErrorPage);
export default ErrorPage