// backend/controllers/imageController.js
const axios = require('axios');
const GeneratedImage = require('../models/GeneratedImage');

exports.generateImage = async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
      inputs: text,
    }, {
      headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` }
    });

    if (response.status !== 200) {
      console.error(`Hugging Face API error: ${response.statusText}`);
      return res.status(response.status).send('Error generating image');
    }

    const imageUrl = response.data.generated_image_url;
    const newImage = new GeneratedImage({ text, imageUrl });
    await newImage.save();

    res.json(newImage);
  } catch (error) {
    console.error('Error generating image:', {
      message: error.message,
      response: error.response ? error.response.data : null,
    });
    res.status(500).send('Server Error');
  }
};
