export const allAccounts = [];

export function findAccountbyId(id) {
  return allAccounts.find((account) => account.id === id);
}


