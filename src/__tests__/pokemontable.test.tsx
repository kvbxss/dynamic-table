import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonTable from '../components/Table';

describe('PokemonTable', () => {
  test('renders table with correct data', () => {
    

    render(
      <PokemonTable
        selectedPokemon="Pikachu"
        searchTerm=""
        handleRowClick={() => {}}
      />
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();

    // Add more assertions as needed
  });
});
