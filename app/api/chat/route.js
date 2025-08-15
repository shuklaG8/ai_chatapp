// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
  
// });

// export async function POST(request) {
//   try {
//     const { message } = await request.json();

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//     });
//     return Response.json({
//       response: completion.choices[0].message.content,
//       status: "success",
//     });
//   } catch (error) {
//     console.error("Error in chat completion:", error);
//     return Response.json(
//       {
//         response: "An error occurred while processing your request.",
//         status: "error",
//       },
//       { status: 500 }
//     );
//   }
// }


import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    return Response.json({
      response: completion.choices[0].message.content,
      status: "success",
    });
  } catch (error) {
    console.error("Error in chat completion:", error);
    return Response.json(
      {
        response: "An error occurred while processing your request.",
        status: "error",
      },
      { status: 500 }
    );
  }
}
