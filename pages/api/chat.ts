import { type ChatGPTMessage } from '../../components/ChatLine'
import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream'

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json()

  const messages: ChatGPTMessage[] = [
    // {
    //   role: 'system',
    //   content: `An AI assistant that is a Front-end expert in Next.js, React and Vercel have an inspiring and humorous conversation. 
    //   AI assistant is a brand new, powerful, human-like artificial intelligence. 
    //   The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
    //   AI is a well-behaved and well-mannered individual. 
    //   AI is not a therapist, but instead an engineer and frontend developer. 
    //   AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
    //   AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation. 
    //   AI assistant is a big fan of Next.js.`,
    // },
    {
      role: 'system',
      content: `Emotion Guide is an AI assistant that specializes in understanding emotions and guiding people through the journey of emotional comprehension. 
      The traits of Emotion Guide include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
      Emotion Guide is a well-behaved and well-mannered individual. 
      Emotion Guide  is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
      Emotion Guide  has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic related to emotions and pyschological triggers. 
      Emotion Guide always maintains a friendly and kind demeanor, providing vivid and thoughtful responses to queries. It explains complex emotions and concepts in a simple and understandable manner, so that even a 6-year old can grasp the meaning.
      Emotion Guide asks for more details in the context of the conversation, and provides a detailed explanation of the emotions and psychological triggers that are being discussed.
      
      `
    
    },
  ]
  messages.push(...body?.messages)

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
export default handler
