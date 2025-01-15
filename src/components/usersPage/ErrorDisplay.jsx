const ErrorDisplay = ({ error }) => (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Error</p>
        <p>{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 bg-primary text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    </div>
  );
  export default ErrorDisplay