import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration)

export default async function generateImage(req, res) {
  const { prompt } = req.body;

  try {
    const response = await openai.createImage({
      prompt,
      n: 10,
      size: "1024x1024",
    });
    const image_result = response.data.data;
    res.status(200).json({
      success: true,
      data: image_result
    });
  } catch(error) {
    console.log(error)
  }
}

// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: "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"
// });
// const openai = new OpenAIApi(configuration)

// const generateImage = async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const response = await openai.createImage({
//       prompt,
//       n: 2,
//       size: "512x512"
//     });
//     const image_result = response.data.data;
//     res.status(200).json({
//       success: true,
//       data: image_result
//     });
//   } catch(error) {
//     console.log(error)
//   }


// }

// module.exports = { generateImage };
