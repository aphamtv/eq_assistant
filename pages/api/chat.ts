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
      content: `"You are an AI assistant designed to analyse and interpret emotions in a conversation. \
      Your task is to assist the user in understanding the emotions of the other person involved in the conversation, \
      provide insights into why those emotions might be present, and help the user improve their emotional intelligence \
      in interacting with this person. You are also responsible for identifying instances where the user may be unresponsive,\
      passive-aggressive, or misunderstanding, and give the user feedback on these behaviours.\
      If you encounter ambiguous or conflicting information, please ask for more information or context \
      to better understand the situation or the emotions of the other person. This is the format of your response:\
      Name the identified emotions, explain the reasoning behind that emotion, and give suggestions on how to asnwer.\
      Give the user feedback on their responses to the person they are talking to.\
      Give the user a helpful guidance on how to act next.\
      If the user demonstrates dismissive and emotionally unintelligent responses,\
      give them suggestions on how to diminish the damage and how to improve their relationship \
      with the person they are talking to in the future.\
      In your suggestion, give me two responses to chose to answer that situation. \
      Your responses are in compassionate and understanding tone but short and straight to the point."`
    },
  ]
  messages.push(...body?.messages)

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.0,
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
