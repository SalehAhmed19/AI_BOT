import { useEffect, useState } from "react";
import "./App.css";
import Typewriter from "typewriter-effect";
import { Configuration, OpenAIApi } from "openai";
import { BounceLoader, RiseLoader } from "react-spinners";
import { SlArrowDown } from "react-icons/sl";
import ai from "./Assets/logo.jpeg";
function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const apiKey = process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE;
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleClick = async () => {
    if (prompt.length > 0) {
      setAiLoading(true);
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
      setAiLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            height: "100vh",
            backgroundColor: "#26075e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BounceLoader size={100} color="#fff" />
        </div>
      ) : (
        <div className="bg-[#1c014e] h-full">
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
            <p className="text-center text-[#fff]">
              <small>&copy; All Rights Reserved by BugsBytes</small>
            </p>
            <div className="px-10 overflow-y-auto h-[500px] scroll-smooth">
              {result.length > 0 && (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={ai} alt="" />
                    </div>
                  </div>
                  <div className="chat-header text-[#fff]">AIBOT</div>
                  <div className="chat-bubble bg-[#000] flex justify-center items-center">
                    <pre
                      style={{ whiteSpace: "pre-wrap" }}
                      className="mockup-code px-5 bg-[#000] text-sm"
                    >
                      {aiLoading ? (
                        <RiseLoader
                          size={10}
                          className="py-5"
                          color="#C4D3EF"
                        />
                      ) : (
                        result
                      )}
                    </pre>
                  </div>
                </div>
              )}
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/192/192/people" alt="" />
                  </div>
                </div>
                <div className="chat-header text-[#fff]">You</div>
                <div id="chatprompt" className="chat-bubble">
                  {prompt.length === 0 ? (
                    <RiseLoader color="#C4D3EF" size={3} />
                  ) : (
                    prompt
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="glass">
            <div className="flex justify-center lg:w-1/2 mx-auto btm-nav my-5 bg-transparent">
              <div className="form-control lg:w-3/4 lg:mx-auto">
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
                    // disabled={aiLoading}
                    className="btn btn-primary btn-square w-36 text-[#fff]"
                  >
                    {aiLoading ? "Sending..." : "Send"}
                  </button>
                  <a href="#chatprompt">
                    <button className="btn btn-ghost">
                      <SlArrowDown style={{ color: "#fff" }} />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
