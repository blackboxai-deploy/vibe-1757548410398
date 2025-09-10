// Conversational AI Responses for SKV.ChatGB
// Making chatbot more human-like and friendly

export interface ConversationContext {
  previousQuestions: string[];
  userPreferences: any;
  conversationStage: 'greeting' | 'inquiry' | 'details' | 'closing';
}

export const conversationalResponses = {
  // Natural conversation starters
  greetings: {
    en: [
      "Hello! 👋 Main SKV.ChatGB hoon, aapka business assistant! Kaise help kar sakta hoon? 😊",
      "Namaste! 🙏 SKV Global Business Services mein aapka swagat hai! Kya kam hai aaj?",
      "Hi there! Main aapke UAE business questions ka jawab de sakta hoon. Kya puchna chahte hain? 😊",
      "Assalam Alaikum! 🌙 Main aapka AI assistant hoon. Business ke bare mein kya janna hai?"
    ],
    ar: [
      "مرحباً! 👋 أنا SKV.ChatGB، مساعدك في الأعمال! كيف يمكنني مساعدتك؟ 😊",
      "أهلاً وسهلاً! مرحباً بك في SKV Global Business Services! ماذا تحتاج اليوم؟",
      "السلام عليكم! 🌙 أنا مساعدك الذكي للأعمال. ماذا تريد أن تعرف؟"
    ]
  },

  // When user asks unclear questions
  clarification: {
    en: [
      "Hmm, main samjha nahi exactly. 🤔 Thoda aur detail mein bata sakte hain?",
      "Aap kehna kya chahte hain? 😊 Main better help kar sakta hoon agar clear question ho!",
      "Sorry, main confused hoon! 😅 Kya aap iska matlab samjha sakte hain?",
      "Arre, main thick hoon zara! 😄 Phir se simple language mein batayiye na!"
    ]
  },

  // Encouraging responses
  encouragement: {
    en: [
      "Waah! Bahut accha sawal hai! 👏",
      "Perfect! Main bilkul right person hoon iska answer dene ke liye! 😊", 
      "Arre, ye to mere favorite topic hai! Let me help you! 🚀",
      "Excellent choice! UAE mein business setup ka main expert hoon! 💪"
    ]
  },

  // When providing help
  helpful: {
    en: [
      "Main aapki puri madad karunga! 😊 Step by step sab kuch explain karunga!",
      "Bilkul! Main yahan hoon aapke liye. Sab kuch detail mein batata hoon! 💡",
      "Arre, tension mat lo! Main sab samjha deta hoon easily! 😌",
      "Perfect! Main exactly iske liye yahan hoon. Let's solve this together! 🤝"
    ]
  },

  // Pricing discussions
  pricing: {
    en: [
      "Paisa ki baat? 💰 Bilkul transparent pricing batata hoon!",
      "Cost ke bare mein? Sure! Main honest pricing give karta hoon, koi hidden charges nahi! 😊",
      "Budget planning? Smart approach! Realistic costs batata hoon! 💡",
      "Money matters! Main samajh gaya. Affordable options hain, tension mat lo! 😌"
    ]
  }
};

// Generate natural conversation response
export function generateConversationalResponse(
  message: string, 
  context: ConversationContext,
  businessResponse: string
): string {
  const lowerMessage = message.toLowerCase();
  
  // Add conversational elements based on message type
  let prefix = "";
  let suffix = "";
  
  // Greeting detection
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
    prefix = getRandomResponse(conversationalResponses.greetings.en) + "\n\n";
  }
  
  // Encouragement for good questions
  else if (lowerMessage.includes('business') || lowerMessage.includes('visa') || lowerMessage.includes('setup')) {
    prefix = getRandomResponse(conversationalResponses.encouragement.en) + "\n\n";
  }
  
  // Pricing discussions
  else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('kitne')) {
    prefix = getRandomResponse(conversationalResponses.pricing.en) + "\n\n";
  }
  
  // Helpful suffix
  suffix = "\n\n" + getRandomResponse(conversationalResponses.helpful.en) + "\n\n**Aur kuch puchna hai? Main yahan hoon! 😊**";
  
  return prefix + businessResponse + suffix;
}

// Get random response from array
function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Natural language processing for better understanding
export function processUserMessage(message: string): {
  intent: string;
  entities: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  language: 'en' | 'ar' | 'hi' | 'ur';
} {
  const lowerMessage = message.toLowerCase();
  
  // Intent detection
  let intent = 'general';
  if (lowerMessage.includes('business') || lowerMessage.includes('company')) intent = 'business_setup';
  if (lowerMessage.includes('visa')) intent = 'visa_inquiry';
  if (lowerMessage.includes('tax') || lowerMessage.includes('vat')) intent = 'tax_services';
  if (lowerMessage.includes('document')) intent = 'document_help';
  if (lowerMessage.includes('invoice')) intent = 'invoice_generation';
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) intent = 'pricing_inquiry';
  
  // Entity extraction (simplified)
  const entities: string[] = [];
  if (lowerMessage.includes('golden visa')) entities.push('golden_visa');
  if (lowerMessage.includes('employment visa')) entities.push('employment_visa');
  if (lowerMessage.includes('family visa')) entities.push('family_visa');
  if (lowerMessage.includes('mainland')) entities.push('mainland');
  if (lowerMessage.includes('freezone')) entities.push('freezone');
  if (lowerMessage.includes('offshore')) entities.push('offshore');
  
  // Sentiment detection (basic)
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  if (lowerMessage.includes('good') || lowerMessage.includes('thanks') || lowerMessage.includes('great')) sentiment = 'positive';
  if (lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('help')) sentiment = 'negative';
  
  // Language detection (basic)
  let language: 'en' | 'ar' | 'hi' | 'ur' = 'en';
  if (/[\u0600-\u06FF]/.test(message)) language = 'ar'; // Arabic characters
  if (/[\u0900-\u097F]/.test(message)) language = 'hi'; // Hindi characters  
  if (/[\u0600-\u06FF]/.test(message) && message.includes('اردو')) language = 'ur'; // Urdu
  
  return { intent, entities, sentiment, language };
}

// Generate personalized response based on context
export function personalizeResponse(
  baseResponse: string, 
  userContext: ConversationContext
): string {
  // Add personal touches based on previous conversation
  let personalizedResponse = baseResponse;
  
  // If user asked about pricing before, mention budget-friendly options
  if (userContext.previousQuestions.some(q => q.includes('cost') || q.includes('price'))) {
    personalizedResponse += "\n\n💡 **Budget ke hisab se bhi options hain!** Main affordable packages bhi suggest kar sakta hoon!";
  }
  
  // If user asked about visa before, cross-sell business setup
  if (userContext.previousQuestions.some(q => q.includes('visa'))) {
    personalizedResponse += "\n\n🎯 **Pro Tip**: Visa ke saath business setup bhi kar sakte hain! Package deals available hain!";
  }
  
  return personalizedResponse;
}