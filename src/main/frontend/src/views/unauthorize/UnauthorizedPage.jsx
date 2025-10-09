import React from 'react';
    import { Link } from 'react-router-dom';

    const UnauthorizedPage = () => {
      return (
        <div>
          <h1>401 - Unauthorized</h1>
          <p>You do not have permission to access this page.</p>
          <Link to="/dashboard">Please log in</Link>
        </div>
      );
    };

    export default UnauthorizedPage;