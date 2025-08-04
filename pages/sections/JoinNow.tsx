export default function JoinNow() {
  return (
    <div className="grid grid-cols-2 w-full h-full mt-44  bg-gradient-to-b p-4 from-[#0B1317] to-[#000000] rounded-lg">
      <div className="text-white text-xl font-medium w-[90%]">Join our community! 
        <span className="text-gray-400 ml-2">Stay informed with our latest news and updates by subscribing on our website. Join now</span>
      </div>
      <div className="w-full mt-5">
         <input
          type="text"
          placeholder="Enter your email"
          className="flex-grow p-3 text-white bg-transparent border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-transparent w-96"
        />
        <button className="bg-[#315467] text-white rounded-r-lg px-4 py-3.5 hover:bg-[#1f3a3e] transition duration-300">
          Join Now
        </button>
      </div>
    </div>    
  )
}