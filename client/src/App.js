import { useState } from "react";
import "./App.css";
import Typewriter from "typewriter-effect";
import { Configuration, OpenAIApi } from "openai";
function App() {
  const apiKey = process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE;
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (prompt.length > 0) {
      setLoading(true);
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 200,
        });
        setResult(response.data.choices[0].text);
        setPrompt("");
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#26075e] h-screen">
      <div className="glass h-screen">
        <h2 className="text-5xl font-bold text-center pt-5 pb-2 text-[#fff]">
          <Typewriter
            options={{
              strings: ["AI BOT", "ChatGPT"],
              cursor: "_",
              autoStart: true,
              loop: true,
            }}
          />
        </h2>
        <div className="mx-20 mt-5 p-5 rounded-lg">
          <pre style={{ whiteSpace: "pre-wrap" }} className="mockup-code px-5">
            {result}
          </pre>
        </div>
        <div className="flex justify-center btm-nav w-1/2 mx-auto my-5 bg-transparent">
          <div className="form-control w-1/2">
            <div className="input-group my-10">
              <input
                type="text"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                placeholder="Write your prompt..."
                className="input input-bordered w-full"
              />
              <button
                onClick={handleClick}
                // disabled={loading}
                className="btn btn-primary btn-square w-36 text-[#fff]"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
