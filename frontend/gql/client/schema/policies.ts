export const clientSchemaPolicies = {
  users: {
    fields: {
      mockedField: {
        read(): string {
          // Read function for users.mockedField
          return "This is an example of a Client-Only field!";
        },
      },
    },
  },
};
