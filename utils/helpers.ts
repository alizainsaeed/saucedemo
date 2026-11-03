import { LoginPage } from '../pages/LoginPage';

export const getUserByName = (loginPage: LoginPage, name: string) => {
  const user = loginPage.users.find((u: any) => u.name === name);
  if (!user) {
    throw new Error(`User data not found for: ${name}`);
  }

  return user;
};
