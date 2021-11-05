import { useRouter } from "next/router";

export const useActivePage = () => {
  const { asPath: currentPath } = useRouter();

  const isActive = (path: string) => currentPath === path;

  return { currentPath, isActive };
};
