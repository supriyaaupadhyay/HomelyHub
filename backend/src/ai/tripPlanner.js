import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const planTrip = async ({ destination, budget, days, people, interests }) => {
  try {
    // If using a dummy key, skip straight to fallback to prevent 401 crash
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes("dummy")) {
      throw new Error("Using dummy API key");
    }

    const prompt = `Create a custom ${days}-day travel itinerary for ${people} people visiting ${destination} with a total budget of Rs ${budget}. Interests include: ${interests.join(", ")}. Provide engaging daily activities and travel tips.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are Trip Genie, an expert AI travel assistant. Return clean, engaging itinerary content.",
        },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    const summary = chatCompletion.choices[0]?.message?.content || "Enjoy your wonderful trip!";

    return {
      summary,
      days: Array.from({ length: Number(days) }, (_, i) => ({
        day: i + 1,
        title: `Exploring ${destination} - Day ${i + 1}`,
        activities: [
          `Morning sightseeing around key landmarks in ${destination}`,
          `Enjoy local cuisine and popular eateries fitting your interests (${interests.join(", ") || "General"})`,
          `Evening relaxation and leisure walk`
        ]
      })),
      tips: [
        "Book local cabs or transit cards ahead of time.",
        "Keep emergency contacts and cash handy."
      ]
    };

  } catch (error) {
    console.warn("Groq API warning (using fallback plan):", error.message);
    
    // Fallback Mock Plan so the app works seamlessly without a valid API key
    return {
      summary: `An unforgettable ${days}-day getaway to ${destination} tailored for ${people} guests within a Rs ${budget} budget! Packed with amazing sights, local food, and great relaxation.`,
      days: Array.from({ length: Number(days) }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1}: Highlights of ${destination}`,
        activities: [
          `Morning tour of popular heritage and scenic spots in ${destination}`,
          `Lunch featuring authentic local dishes`,
          `Afternoon exploration based on your preferences: ${interests.join(", ") || "Sightseeing"}`,
          `Evening dining at a top-rated local venue`
        ]
      })),
      tips: [
        "Carry light comfortable clothing and walking shoes.",
        "Check local weather updates before heading out for outdoor activities."
      ]
    };
  }
};