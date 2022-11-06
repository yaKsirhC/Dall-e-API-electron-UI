const { contextBridge } = require('electron')

async function dalle(options){
    if(!options.prompt) return console.error('no prompt');
    if(!options.n) return console.error('no n');
    if(!options.size) return console.error('no size');
    if(!options.apiKey) return console.error('no apiKey');
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: options.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: options.prompt,
        n: options.n,
        size: options.size,

      }).catch(err => console.log(err))
      if(response) return response.data.data
      return null
}

contextBridge.exposeInMainWorld('dalle_api', {
    callDalle: options => dalle(options)
})