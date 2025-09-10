import { NextRequest, NextResponse } from "next/server";

// Business services knowledge base
const businessKnowledge = {
  "business setup": {
    services: ["Trade License", "Company Registration", "MOA & AOA", "Initial Approval", "Bank Account Opening"],
    pricing: "AED 5,000 - AED 15,000 depending on business type",
    requirements: ["Passport copy", "Visa copy", "Emirates ID", "NOC if employed", "Business plan"],
    timeline: "7-14 working days",
    department: "Legal & License Department"
  },
  "vat registration": {
    services: ["VAT Registration", "TRN Application", "VAT Returns Filing", "VAT Compliance"],
    pricing: "AED 1,500 for registration + AED 500/month for filing",
    requirements: ["Trade License", "Emirates ID", "Bank statements", "Lease agreement"],
    timeline: "3-5 working days",
    department: "Tax Department"
  },
  "employment visa": {
    services: ["Work Permit", "Entry Permit", "Medical Test", "Emirates ID", "Labor Card"],
    pricing: "AED 3,000 - AED 5,000 per visa",
    requirements: ["Attested certificates", "Passport", "Photos", "Medical fitness"],
    timeline: "14-21 working days",
    department: "Visa & Tourism Department"
  },
  "golden visa": {
    services: ["10-year Residency", "Multiple Entry", "Family Sponsorship", "Investment Categories"],
    pricing: "AED 15,000 - AED 50,000 depending on category",
    requirements: ["Investment proof", "Salary certificate", "Property documents", "Specialized skills proof"],
    timeline: "30-60 working days",
    department: "Visa & Tourism Department"
  },
  "ejari": {
    services: ["Ejari Registration", "Municipality Services", "DEWA Connection", "Internet Setup"],
    pricing: "AED 800 - AED 1,200",
    requirements: ["Tenancy contract", "Emirates ID", "Passport copy", "Security deposit"],
    timeline: "1-3 working days",
    department: "Legal & License Department"
  }
};

// AI Provider configurations (mock implementations)
const aiProviders = {
  gpt: async (message: string, context: any[]) => {
    // Mock GPT response based on business knowledge
    return generateBusinessResponse(message, context, "gpt");
  },
  grok: async (message: string, context: any[]) => {
    // Mock Grok response
    return generateBusinessResponse(message, context, "grok");
  },
  deepseek: async (message: string, context: any[]) => {
    // Mock DeepSeek response
    return generateBusinessResponse(message, context, "deepseek");
  },
  claude: async (message: string, context: any[]) => {
    // Claude 4 Sonnet - More sophisticated and natural responses
    return generateBusinessResponse(message, context, "claude");
  },
  current: async (message: string, context: any[]) => {
    // Current AI that's being used (like the one you're using now)
    return generateAdvancedResponse(message, context, "current");
  }
};

function generateBusinessResponse(message: string, context: any[], provider: string) {
  const lowerMessage = message.toLowerCase();
  let response = "";
  let department = "General Support";

  // Natural conversation detection
  const isGreeting = lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("namaste") || lowerMessage.includes("salaam") || lowerMessage.includes("kya hal") || lowerMessage.includes("कैसे हो");
  const isConfused = lowerMessage.includes("samjha nahi") || lowerMessage.includes("confused") || lowerMessage.includes("clear nahi") || lowerMessage.length < 4;
  const isPricing = lowerMessage.includes("kitne") || lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("paisa") || lowerMessage.includes("fee");

  // Handle greetings naturally  
  if (isGreeting) {
    const friendlyGreetings = [
      `Namaste bhai! 🙏 Kaise hain aap? 

Main aapka SKV.ChatGB assistant hoon! Bahut khushi hui aapse! 😊

**🤔 Aaj kya help kar sakta hoon?**
• Company setup karna hai? 🏢
• Visa ke bare mein puchna hai? ✈️
• Tax services chahiye? 💰
• Documents upload karne hain? 📄

**🗣️ Bilkul freely boliye:**
• "Business kaise shuru kare?"
• "Golden visa kaise milta hai?" 
• "VAT registration kya hai?"
• "Bank account kaise khole?"

Main yahan hoon aapki madad ke liye! Confidence se puchiye! 😊`,

      `Hello there! 👋 Kya haal hai? 

Main aapka personal business assistant hoon UAE ke liye! 😊

**💡 Aap jo bhi puchna chahte hain:**
✅ Business setup (company registration)
✅ Visa processing (sab types)  
✅ Tax & VAT help (government compliance)
✅ Document management (secure upload)
✅ Invoice generation (professional billing)

**🎯 Examples:**
• "Company banane mein kitna kharcha?"
• "Employment visa ka process?"
• "Documents kaise upload kare?"

Relaxed feel karte hain - main friendly assistant hoon! 🚀

Batayiye, kya service chahiye? Main detail mein guide kar deta hoon! 😊`
    ];
    
    response = friendlyGreetings[Math.floor(Math.random() * friendlyGreetings.length)];
    department = "Friendly Assistant";
  }

   // Handle pricing questions naturally with VAT info
  else if (isPricing) {
    response = `Arre waah! Paisa ki planning kar rahe hain? Smart approach! 💰😊

**🎯 SKV ki honest pricing (koi hidden charges nahi!):**

**🏢 Company Setup:**
• Mainland: AED 15,000-25,000 (popular choice!)
• Freezone: AED 18,000-30,000 (fastest setup!)
• Offshore: AED 12,000-18,000 (budget-friendly!)

**✈️ Visa Services:**
• Employment: AED 3,500-8,500 (profession pe depend)
• Family: AED 2,800-6,000 (family size pe depend)
• Golden: AED 25,000-35,000 (investment type pe depend)

**💼 Tax & Compliance:**
• VAT Registration: AED 2,000-5,000
• Corporate Tax Filing: AED 3,000-4,000
• Annual VAT Returns: AED 1,500/year

**🏦 Banking & Legal:**
• Bank Account Opening: AED 1,500-2,500
• Ejari Registration: AED 500-800
• Document Attestation: AED 300-500 per document

**📋 IMPORTANT - VAT Compliance:**
• **SKV VAT TRN**: 100044161600003
• All invoices are VAT compliant
• 5% VAT applicable on services
• Professional VAT invoicing included

**🤔 Aap specifically kya setup karna chahte hain?**
• Business type batayiye?
• Budget range kya hai?
• VAT registration bhi chahiye?

Free consultation de deta hoon! Main right specialist se connect kar deta hoon! 😊

**Tax specialist**: mohit@skvbusiness.com (VAT expert)  
**Business setup**: sunil@skvbusiness.com`;
    department = "Tax & Pricing Consultant";
  }

  // Handle confused or unclear messages
  else if (isConfused || lowerMessage.length < 4) {
    response = `Arre, koi tension nahi! 😊 Main samjha deta hoon!

**🤷‍♂️ Shayad aap ye puchna chahte hain:**

**💼 Business ke bare mein:**
• "Company kaise banaye UAE mein?"
• "Business setup kitna time lagta hai?"
• "Kya documents chahiye company ke liye?"

**🛂 Visa ke bare mein:**
• "Employment visa kaise milta hai?"
• "Golden visa ke requirements kya hain?"
• "Family visa ke liye kya chahiye?"

**💰 Paisa ke bare mein:**
• "Company setup kitne mein hoga?"
• "Visa processing cost kitna hai?"

**📄 Documents ke bare mein:**
• "Papers kaise upload kare?"
• "Expiry alerts kaise set kare?"

**🗣️ Bilkul simple language mein boliye:**
• Hindi mixing bhi chalega
• English bhi theek hai
• Arabic samajh leta hoon

Try karte hain! Kya exact help chahiye? 😊🚀`;
    department = "Helpful Assistant";
  }

  // Business setup questions
  else if (lowerMessage.includes("business") || lowerMessage.includes("company") || lowerMessage.includes("setup") || lowerMessage.includes("license")) {
    response = `Arre waah! Business setup karna chahte hain? Excellent decision! 🏢🚀

**🤔 UAE mein 3 main options hain:**

**1️⃣ MAINLAND SETUP (Most Popular!)** 
• Poore UAE mein trade kar sakte hain ✅
• Local market access milta hai ✅
• Government contracts bhi mil sakte hain ✅
• **Cost**: AED 15,000-25,000
• **Time**: 2-3 weeks

**2️⃣ FREEZONE SETUP (Fastest!)** 
• Tax benefits zyada hain ✅
• Bank account easily mil jata hai ✅
• International business perfect ✅
• **Cost**: AED 18,000-30,000  
• **Time**: 7-10 days

**3️⃣ OFFSHORE SETUP (Cheapest!)**
• Initially office nahi chahiye ✅
• Tax optimization best ✅
• **Cost**: AED 12,000-18,000
• **Time**: 5-7 days

**🎯 Aapko kya type ka business karna hai?**
• Trading?
• Services?  
• Manufacturing?
• Consulting?

Batayiye! Main best option suggest kar deta hoon aapke business ke hisab se! 😊

**Free consultation**: sunil@skvbusiness.com se connect kar deta hoon!`;
    department = "Business Setup Expert";
  }

  // Visa questions  
  else if (lowerMessage.includes("visa")) {
    response = `Visa ke bare mein puch rahe hain? Perfect! 😊 Main visa expert hoon!

**✈️ Popular Visa Types:**

**🛂 EMPLOYMENT VISA (Job ke liye):**
• Fresh application: AED 3,500-5,500
• Job change: AED 2,500-3,500  
• Family sponsorship eligible ✅
• **Time**: 1-2 weeks

**👨‍👩‍👧‍👦 FAMILY VISA (Spouse + Kids):**
• Per person: AED 2,800-4,000
• School admission eligible ✅
• Health insurance included ✅
• **Time**: 2-3 weeks

**🏆 GOLDEN VISA (10 years!):**
• Investment based: AED 25,000-35,000
• Property investment: AED 5M+ required
• No sponsor needed! ✅
• Family included ✅

**🤔 Aapko kya type ka visa chahiye?**
• Job ke liye employment visa?
• Family ko lana hai?  
• Investment ke liye golden visa?

Exact requirements aur process detail mein batata hoon! 😊

**Visa specialist**: rahul@skvbusiness.com - bilkul free consultation!`;
    department = "Visa Specialist";
  }

  // Default friendly response for unclear questions
  else {
    response = `Hey! 👋 "${message}" ke bare mein puch rahe hain?

**😊 Main samjha nahi exactly, but koi baat nahi!**

**💡 Shayad aap ye puchna chahte hain:**

**🏢 Business Setup:**
• "Company kaise banaye?"
• "Kitna time aur paisa lagega?"
• "Kya documents chahiye?"

**✈️ Visa Help:**
• "Employment visa process?"
• "Family visa requirements?"
• "Golden visa kaise milta hai?"

**📄 Documents:**
• "Files kaise upload kare?"
• "Expiry alerts kaise?"

**💰 Tax Services:**
• "VAT registration kya hai?"
• "Tax filing kaise kare?"

**🗣️ Bilkul simple language mein puchiye:**
• Hindi mixing totally fine!
• "Company banani hai" ✅
• "Visa chahiye" ✅
• "Tax ke bare mein batao" ✅

Main yahan hoon help ke liye! Confidence se boliye! 😊

**Direct help**: info@skvbusiness.com | WhatsApp bhi available!`;
    department = "General Assistant";
  }

  // Add provider-specific friendly signatures
  if (provider === "grok") {
    response += "\n\n⚡ *Grok AI se powered - Super fast responses!*";
  } else if (provider === "deepseek") {
    response += "\n\n🔍 *DeepSeek AI se powered - Deep business analysis!*";
  } else {
    response += "\n\n🤖 *ChatGPT se powered - Comprehensive business support!*";
  }

   return { response, department };
}

// Advanced response for Claude and Current AI (more sophisticated)
function generateAdvancedResponse(message: string, context: any[], provider: string) {
  const lowerMessage = message.toLowerCase();
  let response = "";
  let department = "AI Assistant";

  // More intelligent conversation for Claude/Current AI
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("namaste") || lowerMessage.includes("kya hal")) {
    response = `Namaste! 🙏 Main yahan hoon aapki help ke liye!

**🤖 Main advanced AI assistant hoon** - bilkul natural conversation kar sakte hain!

**आप मुझसे पूछ सकते हैं:**
• "UAE mein business kaise start kare step-by-step?"
• "Golden visa ke liye exact requirements kya hain?"  
• "VAT registration complete process batao"
• "Documents safely kaise store kare?"
• "Professional invoice kaise banaye?"

**🎯 मैं आपकी मदद करूंगा:**
✅ Business planning और strategy में
✅ Complete visa guidance देने में  
✅ Tax compliance ensure करने में
✅ Document organization में
✅ Professional invoicing में

**🗣️ Bilkul freely baat kariye** - Hindi-English mix भी chalega!

Ready to help! Kya specific guidance chahiye? 😊`;

  } else if (lowerMessage.includes("business") || lowerMessage.includes("company")) {
    response = `Business setup? Excellent choice! 🏢✨

**🎯 Main aapको complete business roadmap de sakta hoon:**

**STEP 1: Business Type Selection**
• Mainland (local market access) - AED 15,000-25,000
• Freezone (tax benefits) - AED 18,000-30,000  
• Offshore (minimal physical presence) - AED 12,000-18,000

**STEP 2: Documentation & Process**
• Trade license application
• Memorandum of Association  
• Initial approval और NOC
• Bank account opening assistance
• Office setup guidance

**STEP 3: Post-Setup Support**
• Visa processing for employees
• Tax registration और compliance
• Business banking setup
• Government liaison

**🤔 Aapके mind में kya business idea hai?**
• Trading business?
• Services company?
• Manufacturing?
• Consulting firm?

**Industry के according** main specific guidance दे सकता हूं!

**Free detailed consultation**: sunil@skvbusiness.com

Apna business vision share kariye! 🚀😊`;

  } else if (lowerMessage.includes("kitne") || lowerMessage.includes("cost") || lowerMessage.includes("price")) {
    response = `Paisa ki baat? Bilkul transparent रहता हूं! 💰

**🎯 REALISTIC PRICING (All-inclusive):**

**🏢 BUSINESS SETUP:**
• **Mainland LLC**: AED 15,000-25,000
  - Trade license, MOA, bank account opening
  - Local service agent included
  - Government fee + our service

• **Freezone**: AED 18,000-30,000  
  - 100% ownership guaranteed
  - Tax benefits included
  - Office space assistance

• **Offshore**: AED 12,000-18,000
  - No office required initially
  - International business focus

**✈️ VISA COSTS:**
• **Employment**: AED 3,500-8,500 (complete process)
• **Family**: AED 2,800 per person
• **Golden**: AED 25,000-35,000 (investment type dependent)

**💡 PACKAGE DEALS:**
• Business + Employment visa: 10% discount
• Family package (spouse + 2 kids): Special rates
• Complete setup package: Negotiable

**🤔 Budget range kya hai aapका?**
• Standard budget: Mainland recommend करूंगा
• Premium budget: Freezone with faster processing  
• Tight budget: Offshore से start करके upgrade

**Free cost analysis**: Exact quote के लिए specialist call करूंगा! 😊`;

  } else {
    response = `Hey! 👋 "${message}" के बारे में पूछ रहे हैं?

**😊 Main advanced AI assistant hoon** - natural conversation prefer करता हूं!

**💡 Aap aise पूछ सकते हैं:**
• "Business setup ke liye complete guide do"
• "Visa process step-by-step explain karo"  
• "Documents safely store kaise kare?"
• "Tax filing kya process hai?"
• "Mobile app kaise install kare?"

**🎯 Main specifically help कर सकता हूं:**
✅ UAE business laws और regulations में
✅ Visa requirements और processing में
✅ Tax compliance और VAT में
✅ Document management और security में  
✅ Professional invoicing और billing में

**🗣️ Completely natural language** में बात करिए!
• Hindi mixing बिल्कुल okay है
• Technical terms explain कर देता हूं
• Step-by-step guidance देता हूं

Kya specific help चाहिए? Detail में बताऊं? 😊🚀`;
  }

  // Advanced AI signature
  if (provider === "claude") {
    response += "\n\n🧠 *Claude 4 Sonnet powered - Advanced reasoning & natural conversation*";
  } else if (provider === "current") {
    response += "\n\n💬 *Current Advanced AI - Just like me! Natural conversation specialist*";
  }

  return { response, department };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, aiProvider = "gpt", language = "en", context = [] } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

     // Get AI response based on selected provider
    const validProvider = aiProvider as keyof typeof aiProviders;
    const aiResponse = await aiProviders[validProvider] ? 
      await aiProviders[validProvider](message, context) : 
      await aiProviders.current(message, context);

    // Return response with department information
    return NextResponse.json({
      response: aiResponse.response,
      department: aiResponse.department,
      aiProvider,
      language,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to process chat message",
        response: "I'm experiencing technical difficulties. Please contact our support team at info@skvbusiness.com or try again later."
      },
      { status: 500 }
    );
  }
}