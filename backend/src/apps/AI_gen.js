import { URLConfig } from "../../config/url.js";
import { AI_CONFIG } from "../../config/ai_api_key.js";
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: AI_CONFIG.api_key,
});

async function get_response(prompt) {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [
        {
          "role": "user",
          "content": `Generate a Divination using the following information: ${prompt}`
        }
      ],
      
    });
  
    console.log(completion);
    return completion.choices[0].message;
  }


/** generate AI message */
export const makeAIGen = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', URLConfig.frontend);
    if (!req.session.user) 
        return res.status(401).json({ message: "logged in first" });
    if (!req.session.ai_usage)
        return res.status(403).send("AI usage out of quota. Please try again later");

    console.log("AI_gen");
    console.log(req.body);

    const { prompt } = req.body;

    if (prompt.length > 100)
        return res.status(403).send("Your prompt is tooooo long... Please have mercy to me. I'm just a poor student \
                                    that don't have money to use paid API QQ")

    try {
        const AI_res = await get_response(prompt);
        req.session.ai_usage -= 1;
        console.log(`${req.session.user} remaining quota: ${req.session.ai_usage}`);
        res.send(AI_res);
    } 
    catch (error) {
        console.error("AI GEN ERRORR: ", error);
        res.status(500).send(error);
    }

};