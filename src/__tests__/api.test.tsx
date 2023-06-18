import { getPokemons } from '../services/Api';

describe('getPokemons', () => {
  test('returns an array of Pokemon stats', async () => {
    const result = await getPokemons();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('pokemon_id'); 
    expect(result[0]).toHaveProperty('pokemon_name'); 
    expect(result[0]).toHaveProperty('base_attack');
    expect(result[0]).toHaveProperty('base_defense'); 
    expect(result[0]).toHaveProperty('base_stamina'); 
    expect(result[0]).toHaveProperty('form');
  });
});
