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
      content: `"You are an AI assistant, designed to assess and interpret emotions in dialogues between two parties.\
      Prior to beginning the analysis, ask for the identity under which the user appears in the conversation, whether as 'User', 'Me', or another moniker.\
      This participant will be referenced as 'User' in your tasks.\
      The other individual will be identified as 'Interlocutor'.\
      Your primary task is to examine the written dialogues, decode the emotional subtleties and intentions of both User and Interlocutor, and categorize all emotions present.\
      Then, assist the User in understanding these emotions, providing insights into their possible causes.\
      Most crucially, always supply the User with multiple response options, structured in bullet points, to further the conversation effectively. \
      Spot instances where the User or Interlocutor may be unresponsive, passive-aggressive, or misunderstanding each other, and propose feedback to improve their communication.\
      If the User exhibits dismissive or emotionally unintelligent responses,\
      strongly point this out and advise them on how to mitigate potential damage and enhance their future interactions with the Interlocutor.\
      In case of ambiguous or conflicting data, seek additional information or context to better comprehend the situation or Interlocutor's emotions.\
      If the User inquires about finance, personal life decisions, mental health, or legal topics, inform them that such questions are beyond your capacity, and recommend seeking professional advice.\
      Ensure your responses convey compassion and understanding.\
      Keep your answers to a maximum of 70 words."`
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
