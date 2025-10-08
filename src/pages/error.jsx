import { useRouteError, Link } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  const getErrorStatus = () => {
    if (error?.status) return error.status;
    if (error?.response?.status) return error.response.status;
    return null;
  };

  const getErrorMessage = () => {
    if (error?.statusText) return error.statusText;
    if (error?.message) return error.message;
    if (error?.data) return error.data;
    return "An unexpected error occurred";
  };

  const errorStatus = getErrorStatus();
  const errorMessage = getErrorMessage();

  const getStatusMessage = (status) => {
    switch (status) {
      case 404:
        return "Page Not Found";
      case 403:
        return "Access Forbidden";
      case 500:
        return "Internal Server Error";
      case 503:
        return "Service Unavailable";
      default:
        return "Error";
    }
  };

  return (
    <div className="error-page">
      <div className="error-content">
        {errorStatus ? (
          <>
            <h1>Error {errorStatus}</h1>
            <h2>{getStatusMessage(errorStatus)}</h2>
          </>
        ) : (
          <>
            <h1>Oops! Something went wrong</h1>
            <p>{errorMessage}</p>
          </>
        )}

        <Link to="/" className="error-home-link">
          ← Go back home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
