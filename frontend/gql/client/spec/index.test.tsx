import * as React from "react";

import { EmployerMockedProvider } from "tests/apollo/employer";
import { render, screen, waitFor } from "@testing-library/react";

import { client } from "..";
import {
  ClientSchemaExample,
  ClientSchemaExampleQuery,
} from "../schema/example";

const TestComponent: React.FC = () => {
  const mockedResponse = {
    request: {
      query: ClientSchemaExampleQuery,
      variables: {
        userId: "0",
      },
    },
    result: {
      data: {
        users_by_pk: {
          __typename: "users",
        },
      },
    },
  };

  return (
    <EmployerMockedProvider mocks={[mockedResponse]}>
      <ClientSchemaExample userId="0" />
    </EmployerMockedProvider>
  );
};

const renderComponent = () => render(<TestComponent />);

describe("Apollo Client", () => {
  it("returns a properly formed client", () => {
    const expectedProperties = [
      "cache",
      "link",
      "localState",
      "typeDefs",
      "queryManager",
    ];

    expectedProperties.map((property) =>
      expect(client).toHaveProperty(property)
    );
  });

  it("allows client-only schema mocking", async () => {
    renderComponent();

    await new Promise((resolve) => setTimeout(resolve, 0));

    await waitFor(() =>
      expect(
        screen.getByText("This is an example of a Client-Only field!")
      ).toBeInTheDocument()
    );
  });
});
