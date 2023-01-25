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
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your prompt..."
      ></textarea>
      <button onClick={handleClick} disabled={loading || prompt.length === 0}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
