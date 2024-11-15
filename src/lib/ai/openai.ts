import OpenAI from 'openai';

// In a real app, this would be an environment variable
const OPENAI_API_KEY = 'your-api-key';

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for demo purposes
});

export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
    });

    return response.data[0].url ?? '';
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}

export async function getAIResponse(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[]
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content ?? '';
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw new Error('Failed to get AI response');
  }
}

export async function processDocument(
  content: string,
  type: 'summarize' | 'analyze' | 'extract'
): Promise<string> {
  const prompts = {
    summarize: 'Please provide a concise summary of the following text:\n\n',
    analyze:
      'Please provide a detailed analysis of the following text, including key points and insights:\n\n',
    extract:
      'Please extract the main facts and figures from the following text:\n\n',
  };

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'user',
          content: `${prompts[type]}${content}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content ?? '';
  } catch (error) {
    console.error('Error processing document:', error);
    throw new Error('Failed to process document');
  }
}