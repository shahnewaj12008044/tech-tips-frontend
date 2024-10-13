import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="text-center space-y-6">
        {/* 404 Error */}
        <h1 className="text-[150px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse">
          404
        </h1>

        {/* Error Message */}
        <p className="text-xl md:text-2xl font-medium text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Home Button */}
        <Link href="/">
          <button className="px-6 py-3 mt-4 font-semibold text-lg rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50">
            Go Home
          </button>
        </Link>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900 opacity-25 blur-lg"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-500 opacity-50 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500 opacity-50 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute top-10 left-32 w-28 h-28 bg-purple-500 opacity-50 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    </div>
  );
};

export default NotFound;
