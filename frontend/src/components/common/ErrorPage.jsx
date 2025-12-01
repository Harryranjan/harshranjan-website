import { useNavigate } from "react-router-dom";

const ErrorPage = ({ 
  code = "404", 
  message = "Page not found",
  buttonText = "Go to Home",
  buttonAction
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (buttonAction) {
      buttonAction();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">{code}</h1>
        <p className="text-xl text-gray-600 mb-6">{message}</p>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
