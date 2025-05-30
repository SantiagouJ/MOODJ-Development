import { Song } from "../types/SongTypes"

export function setupSearch(
  shadowRoot: ShadowRoot,
  renderSelectedSong: (song: Song) => void
): void {
  const searchInput = shadowRoot.querySelector("#input1") as HTMLInputElement
  const searchResultsDiv = shadowRoot.querySelector("#search-results") as HTMLDivElement

  const toggleResults = (show: boolean): void => {
    searchResultsDiv.classList.toggle("hidden", !show)
  }

  const clearResults = (): void => {
    searchResultsDiv.innerHTML = ""
  }

  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim()
    if (!query) {
      clearResults()
      toggleResults(false)
      return
    }

    try {
      const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "7b079f3e1fmshc4d9f1c83eeb0bfp14b8f8jsne4c949637cc7",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
      }

      const response = await fetch(url, options)
      const data = await response.json()

      if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        clearResults()
        toggleResults(false)
        return
      }

      clearResults()

      const searchResults: Song[] = data.data.slice(0, 10)
      searchResults.forEach((song) => {
        const div = document.createElement("div")
        div.className = "search-result-item"
        div.textContent = `${song.artist.name} - ${song.title}`

        div.addEventListener("click", () => renderSelectedSong(song))

        searchResultsDiv.appendChild(div)
      })

      toggleResults(true)

    } catch (error) {
      console.error("Error fetching songs:", (error as Error).message)
      clearResults()
      toggleResults(false)
    }
  })
}
