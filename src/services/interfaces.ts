export interface PokemonStats {
    expander:    string;
    base_attack:  number;
    base_defense: number;
    base_stamina: number;
    form:         string;
    pokemon_id:   number;
    pokemon_name: string;
   }

export interface PokemonStatsResponse {
    pokemons: PokemonStats[];
}

   