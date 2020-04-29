export async function audioSearch(file) {
  let formatData = new FormData()
  formatData.append('audio', file.blob)

  try {
    const response = await fetch('https://shazify.herokuapp.com/audioSearch', {
      method: 'POST',
      body: formatData,
    })
    const data = await response.json()
    let singersName = ''
    const music = data.metadata.music[0]
    const trackName = music.title
    console.log(music)
    music.artists.forEach((artist) => (singersName += `${artist.name} `))
    return { artists: singersName, trackName }
  } catch (error) {
    throw error
  }
}
