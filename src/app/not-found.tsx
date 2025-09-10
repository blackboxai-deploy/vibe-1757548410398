import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center px-4">
      <div className="text-center text-white max-w-md">
        <div className="mb-8">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-900 font-bold text-2xl">SKV</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        </div>
        
        <div className="mb-8">
          <p className="text-blue-200 text-lg mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-blue-300 text-sm">
            But don't worry, our AI assistant is still here to help you with all your UAE business needs!
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-block bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Go to SKV.ChatGB
          </Link>
          
          <div className="text-sm text-blue-300">
            <p className="mb-2">Or contact us directly:</p>
            <div className="space-y-1">
              <div>📧 info@skvbusiness.com</div>
              <div>🌐 www.skvbusiness.com</div>
              <div>📍 Dubai, UAE</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-700">
          <p className="text-blue-400 text-xs">
            SKV Global Business Services LLC - Your trusted partner for UAE business solutions
          </p>
        </div>
      </div>
    </div>
  );
}