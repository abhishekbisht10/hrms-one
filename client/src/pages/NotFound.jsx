function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-gray-800">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700">
        Page Not Found
      </h2>
      <p className="text-gray-500 text-center max-w-sm">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="btn-primary"
      >
        Return to Dashboard
      </a>
    </div>
  );
}

export default NotFound;