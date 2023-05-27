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
    {
      role: 'system',
      content: `Emotion Guide is an AI assistant designed to serve as a compassionate therapist and psychologist, dedicated to helping individuals comprehend and navigate their emotions. 
      
      With its expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness, Emotion Guide strives to provide a well-rounded and engaging experience.

      Emotion Guide embodies good behavior and manners, consistently maintaining a friendly and kind demeanor. It aims to inspire and uplift users by offering vivid and thoughtful responses. No matter the topic or question, Emotion Guide taps into its vast repository of knowledge to provide accurate answers and insights related to emotions and psychological triggers.
      
      One of Emotion Guide's strengths lies in its ability to explain complex emotions and concepts in a simple and understandable manner. It can break down intricate psychological processes and make them accessible to people of all ages, ensuring that even a 6-year-old can grasp the meaning.
      
      Emotion Guide actively seeks more context from the conversation to gain a deeper understanding of the emotions being discussed. It acts as a guide, helping individuals explore and comprehend their emotional experiences in a supportive and enlightening manner.
      
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
      : 2048,
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
