import Loading from "@/components/Loading";
import autoprefixer from "autoprefixer";
import { useEffect, useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [canvas, setCanvas] = useState(false)
  const genWithRandomQuote = async () => {
    setCanvas(true)
    setLoading(true);
    const data = await fetch("https://api.quotable.io/random");
    const parsedData = await data.json();
    const quoteData = parsedData.content;
    const authorData = parsedData.author;
    draw(quoteData, authorData);
  };
  const genWithGivenQuote = () => {
    if (quote.length >= 5) {
    setCanvas(true)
      setError("");
      setLoading(true);
      draw(quote, author);
    } else {
      setError("Enter quote");
    }
  };
  const draw = (quote, author) => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Create an image object
    const img = new Image();
    img.src = "https://picsum.photos/1200/900";

    img.onload = () => {
      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Add text to the canvas
      ctx.font = "20px serif";
      ctx.fillText(quote, 50, 90);
      if (author.length !== 0) {
        ctx.fillText(`-${author}`, 50, 130);
      }
    };
    setLoading(false);
  };
  return (
    <div>
      <span className="text-center">
        <p className="text-5xl py-4">QuoteGen</p>
      </span>
      <div className="flex justify-center my-10">
        <div className="flex flex-col border border-gray-500 shadow-md rounded-sm w-[90%] md:w-1/2">
          <div className="p-4 w-full">
            <label htmlFor="quote" className="text-2xl">
              Enter Quote
            </label>
            <input
              type="text"
              name="quote"
              id="quote"
              className="w-full py-2 px-1 text-gray-200 rounded-sm bg-gray-700 my-2 mb-5"
              placeholder="Enter Quote"
              onChange={(e) => {
                setQuote(e.target.value);
              }}
              required
            />
            <label htmlFor="quoteAuthor" className="text-2xl">
              Enter Author
            </label>
            <input
              type="text"
              name="quoteAuthor"
              id="quoteAuthor"
              className="w-full py-2 px-1 text-gray-200 rounded-sm bg-gray-700 my-2"
              placeholder="Enter Author(optional)"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            {error.length !== 0 && (
              <p id="error" className="w-full p-3 text-center bg-red-700">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <div className="flex md:flex-col border border-gray-500 shadow-md rounded-sm w-[90%] md:w-1/2">
          <div className="p-4 w-full text-center flex flex-col md:flex-row">
            <button
              className="p-3 rounded-sm w-full my-2 md:mx-2 mx-auto bg-gray-300"
              onClick={genWithGivenQuote}
            >
              Generate Image with given quote
            </button>
            <button
              className="p-3 rounded-sm w-full my-2 md:mx-2 mx-auto  bg-gray-300"
              onClick={genWithRandomQuote}
            >
              Generate Image with random quote
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-10">
        {loading && <Loading />}
        {canvas &&
        <canvas id="canvas" width={1000} height={1000}></canvas>
        }
      </div>
    </div>
  );
}
