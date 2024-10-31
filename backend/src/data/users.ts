//backend/data/users.ts

export { users };

const users = [
  {
    id: crypto.randomUUID(),
    email: "lars@test.no",
    name: "Lars",
    role: "user"
  },
  {
    id: crypto.randomUUID(),
    email: "simen@test.no",
    name: "Simen",
    role: "user"
  },
  {
    id: crypto.randomUUID(),
    email: "trude@test.no",
    name: "True",
    role: "admin"
  }
];
