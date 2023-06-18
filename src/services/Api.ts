export async function getPokemons() {
  try {
    const response = await fetch(
      "https://pokemon-go1.p.rapidapi.com/pokemon_stats.json",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "44d0c99e07msh095b1fe1715e5a1p111afcjsnd20a39ea3dff",
          "X-RapidAPI-Host": "pokemon-go1.p.rapidapi.com",
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
  }
  return [];
}
