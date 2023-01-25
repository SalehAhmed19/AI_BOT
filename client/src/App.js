import { useState } from "react";
import "./App.css";
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
  };

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center mt-5">AI BOT</h2>
      <p className="text-center">Develop by Saleh Ahmed Mahin</p>
      <div className="border mx-20 my-10 p-5 rounded-lg">
        <pre style={{ whiteSpace: "pre-wrap" }} className="mockup-code px-5">
          {result}
        </pre>
      </div>
      <div className="flex justify-center btm-nav w-1/2 mx-auto my-5">
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
              disabled={loading || prompt.length === 0}
              className="btn btn-square w-36"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
