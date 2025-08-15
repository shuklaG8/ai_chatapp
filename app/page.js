// "use client";
// import React, { useState } from "react";

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState("");
//   const [streaming, setStreaming] = useState("");
//   const [streamResponse, setStreamResponse] = useState("");

//   const handleChat = async () => {
//     setLoading(true);
//     setResponse("");

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });
//       const data = await res.json();
//       if (data.status === "success") {
//         setResponse(data.response);
//       } else {
//         setResponse("Error: " + data.response);
//       }
//     } catch (error) {
//       setResponse(
//         "An error occurred while processing your request.",
//         +error.message
//       );
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <h1 className="text-center ">Welcome to our chat application</h1>
//       <div>
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message here..."
//           rows={4}
//           className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg p-3 w-full text-gray-800 resize-none shadow-sm"
//         />
//       </div>
//       <div>
//         <button
//           onClick={handleChat}
//           disabled={loading || !message.trim()}
//           className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 
//         ${
//           loading || !message.trim()
//             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//             : "bg-indigo-600 hover:bg-indigo-700 text-white"
//         }`}
//         >
//           {loading ? "⏳ Processing..." : "🚀 Send"}
//         </button>
//       </div>
//       <div
//         className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-inner"
//         style={{ whiteSpace: "pre-wrap" }}
//       >
//         test
//         {response}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setResponse(data.response);
      } else {
        setResponse("Error: " + data.response);
      }
    } catch (error) {
      setResponse("An error occurred: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-indigo-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
        <h1 className="text-center text-3xl font-extrabold text-indigo-700">
          💬 AI Chat Assistant
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Ask anything and get instant answers
        </p>

        {/* Message Box */}
        <div className="mt-6">
          <textarea
            className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg p-3 w-full text-gray-800 resize-none shadow-sm"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
        </div>

        {/* Send Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleChat}
            disabled={loading || !message.trim()}
            className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200
              ${
                loading || !message.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
          >
            {loading ? "⏳ Processing..." : "🚀 Send"}
          </button>
        </div>

        {/* Response */}
        {response && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-inner">
            <h2 className="font-bold text-indigo-600">Response:</h2>
            <p className="mt-1 text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
