import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("Root component Test", () => {
  it("renders Home view on default route", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
          <App/>
        </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders CreateRecipeView on /recipe route", () => {
    render(
        <MemoryRouter initialEntries={["/recipe/new"]}>
          <App/>
        </MemoryRouter>
    );
    expect(screen.getByText("Zubereitung")).toBeInTheDocument();
  });

  it("renders SearchView on /search route", () => {
    render(
        <MemoryRouter initialEntries={["/search"]}>
          <App/>
        </MemoryRouter>
    );
    expect(screen.getByText("Suche")).toBeInTheDocument();
  });

  it("renders SurveyView on /survey route", () => {
    render(
        <MemoryRouter initialEntries={["/survey"]}>
          <App/>
        </MemoryRouter>
    );
    expect(screen.getByText("Hello Survey")).toBeInTheDocument();
  });

  it("renders NotFoundView on unknown route", () => {
    render(
        <MemoryRouter initialEntries={["/unknown"]}>
          <App/>
        </MemoryRouter>
    );
    expect(screen.getByText("diese url kennen wir nicht")).toBeInTheDocument();
  });
});