import React, { FunctionComponent, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { styled } from "styled-components";

interface BreadcrumbProps {
  selectedPokemon: string;
}

const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
  selectedPokemon,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    const currentPath = location.pathname;
    const pathnames = currentPath.split("/").filter((x) => x);
    setBreadcrumbs(pathnames);
  }, [location.pathname]);

  const handleBreadcrumbClick = (index: number) => {
    const newPath = `/${breadcrumbs.slice(0, index + 1).join("/")}`;

    if (newPath === "/Pokemons") {
      navigate(newPath);
      window.location.reload();
    } else if (newPath === "") {
      navigate(newPath);
      window.location.reload();
    } else navigate(newPath);
  };

  return (
    <BreadcrumbWrapper>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <Link
            to={`/${breadcrumbs.slice(0, index + 1).join("/")}`}
            onClick={() => handleBreadcrumbClick(index)}
          >
            {breadcrumb}
          </Link>
          {index !== breadcrumbs.length - 1 && (
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          )}
        </React.Fragment>
      ))}
      {selectedPokemon && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
      {selectedPokemon && <BreadcrumbItem>{selectedPokemon}</BreadcrumbItem>}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;

const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: "Mukta", sans-serif;
  font-size: 1rem;
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 0.5rem;
  color: #ccc;
`;

const BreadcrumbItem = styled.span`
  color: #ccc;
  font-family: "Mukta", sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 500;
  padding-left: 0.5rem;
`;
