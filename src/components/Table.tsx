import React, { useState, useEffect, FunctionComponent, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { PokemonStats } from '../services/interfaces';
import { getPokemons } from '../services/Api';

const columnHelper = createColumnHelper<PokemonStats>();

const columns = [
  columnHelper.accessor('expander', {
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' },
          }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>
      ) : (
        'DoubleClick to expand'
      )
    }}),
  columnHelper.accessor('pokemon_id', {
    header: 'Pokemon ID',
  }),
  columnHelper.accessor('pokemon_name', {
    header: 'Pokemon Name',
  }),
  columnHelper.accessor('base_attack', {
    header: 'Base Attack',
  }),
  columnHelper.accessor('base_defense', {
    header: 'Base Defense',
  }),
  columnHelper.accessor('base_stamina', {
    header: 'Base Stamina',
  }),
  columnHelper.accessor('form', {
    header: 'Form',
  }),
];

interface PokemonTableProps {
  selectedPokemon: string;
  searchTerm: string;
  handleRowClick: (navigate: any, pokemonName: string) => void;
}

const PokemonTable: FunctionComponent<PokemonTableProps> = ({
  selectedPokemon,
  searchTerm,
  handleRowClick,
}) => {
  const [data, setData] = useState<PokemonStats[]>([]);
  const [filteredData, setFilteredData] = useState<PokemonStats[]>([]);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const navigate = useNavigate();

  const filterData = useCallback(
    (searchTerm: string) => {
      if (selectedPokemon.trim() === '') {
        if (searchTerm.trim() === '') {
          setFilteredData(data);
        } else {
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          const filtered = data.filter(
            (pokemon) =>
              pokemon.pokemon_name &&
              pokemon.pokemon_name.toLowerCase().includes(lowerCaseSearchTerm)
          );
          setFilteredData(filtered);
        }
      } else {
        const filtered = data.filter(
          (pokemon) =>
            pokemon.pokemon_name &&
            pokemon.pokemon_name.toLowerCase() === selectedPokemon.toLowerCase()
        );
        setFilteredData(filtered);
      }
    },
    [data, selectedPokemon]
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPokemons();
      setData(result);
      setFilteredData(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterData(searchTerm);
  }, [searchTerm, filterData]);

  const handleExpandRow = (rowId: string) => {
    setExpandedRowId((prevRowId) => (prevRowId === rowId ? null : rowId));
  };

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollableWrapper>
      <TableWrapper>
        <Header>
          <HeaderRow>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Head key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </Head>
                ))}
              </React.Fragment>
            ))}
          </HeaderRow>
        </Header>

        <Body>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <Row
                onClick={() => handleRowClick(navigate, row.original.pokemon_name)}
                onDoubleClick={() => handleExpandRow(row.id)}
                isExpanded={row.id === expandedRowId}
              >
                {row.getVisibleCells().map((cell) => (
                  <Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                ))}
              </Row>
              {row.id === expandedRowId && (
                <ExpandedRow>
                  <ExpandedCell colSpan={columns.length}>
                    Additional information for {row.original.pokemon_name}
                  </ExpandedCell>
                </ExpandedRow>
              )}
            </React.Fragment>
          ))}
        </Body>
      </TableWrapper>
    </ScrollableWrapper>
  );
};

export default PokemonTable;

const ScrollableWrapper = styled.div`
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 90px);

  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #72b6b2;
    border-radius: 5px;
    &:hover {
      background-color: #ccc;
    }
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  font-family: 'Mukta', sans-serif;
  align-items: center;
  justify-content: center;
  display: table;
`;

const Header = styled.thead`
  position: sticky;
  top: 0;
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
`;

const Body = styled.tbody`
  font-size: 20px;
  display: table-row-group;
`;

const HeaderRow = styled.tr`
  display: table-row;
  vertical-align: inherit;
  height: 100px;
`;

const Row = styled.tr<{ isExpanded: boolean }>`
  display: table-row;
  vertical-align: inherit;
  height: ${({ isExpanded }) => (isExpanded ? '200px' : '100px')};
  transition: height 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    background-color: #72b6b2;
  }
`;

const Cell = styled.td`
  display: table-cell;
  vertical-align: inherit;
  padding-left: 1.25rem;
  min-width: 100px;
  max-width: 150px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const Head = styled.th`
  cursor: pointer;
  padding-left: 1.25rem;
  text-align: center;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  color: #72b6b2;
  font-size: 20px;
`;

const ExpandedRow = styled.tr`
  display: table-row;
  vertical-align: inherit;
  height: 100px;
`;

const ExpandedCell = styled.td`
  display: table-cell;
  vertical-align: inherit;
  padding-left: 1.25rem;
  min-width: 100px;
  max-width: 150px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;
