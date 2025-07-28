import dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';

async function testKimiAPI() {
  const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      'HTTP-Referer': 'https://github.com/MoAftaab/kimi-cli',
      'X-Title': 'Kimi CLI Test'
    }
  });

  try {
    console.log('🔍 Testing API connection...');
    
    const response = await client.chat.completions.create({
      model: 'moonshotai/kimi-k2:free',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 50
    });

    console.log('✅ API Response:', response);
    console.log('📝 Content:', response.choices[0]?.message?.content);
    
  } catch (error) {
    console.error('❌ API Error:', error);
  }
}

testKimiAPI();
