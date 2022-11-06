const form = document.querySelector('form')
const promptInput = document.querySelector('#prompt')
const loader = document.querySelector('.loader')
const shadow = document.querySelector('.shadow')

form.addEventListener('submit',async  e => {
    e.preventDefault()
    loader.dataset.active = 'true'
    shadow.dataset.active = 'true'
    
    const prompt = promptInput.value
    const size = document.querySelector('#x256').checked ? '256x256' : document.querySelector('#x512').checked ? '512x512' : '1024x1024'
    
    const options = {
        size:  size,
        prompt: prompt ,
        n: document.querySelector('[type="number"]').valueAsNumber,
        apiKey: document.querySelector('#apiKey').value
    }
    

    const response = await dalle_api.callDalle(options)
    console.log(response)

    loader.dataset.active = 'false'
    shadow.dataset.active = 'false'

    if(!response) {
        return document.querySelector('.imgs').innerHTML = 'ERROR'
    }

    document.querySelectorAll('img').forEach(img => {
        img.remove()

    })
    document.querySelector('.imgs').innerHTML = ''
    response.forEach(urlObj => {
        const corrImg = document.createElement('img')
        const corrA = document.createElement('a')
        corrImg.src = urlObj.url
        corrA.href= urlObj.url
        corrA.download = promptInput.value
        corrA.appendChild(corrImg)
        document.querySelector('.imgs').appendChild(corrA)
    })

})
