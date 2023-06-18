import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../components/Breadcrumb';
import { BrowserRouter } from 'react-router-dom';

describe('Breadcrumb', () => {
  test('renders breadcrumb with correct links', () => {
    render(
      <BrowserRouter>
        <Breadcrumb selectedPokemon="Pikachu" />
      </BrowserRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Pokemons')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    // Add more assertions as needed
  });
});
