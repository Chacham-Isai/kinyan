import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Product, Seller } from "@/data/mockData";

interface UserDataContextType {
  // Favorites
  favoriteIds: Set<string>;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
  getFavoriteCount: () => number;

  // Following
  followingIds: Set<string>;
  isFollowing: (sellerId: string) => boolean;
  toggleFollow: (sellerId: string) => void;
  getFollowingCount: () => number;
}

const UserDataContext = createContext<UserDataContextType>({
  favoriteIds: new Set(),
  isFavorite: () => false,
  toggleFavorite: () => {},
  getFavoriteCount: () => 0,
  followingIds: new Set(),
  isFollowing: () => false,
  toggleFollow: () => {},
  getFollowingCount: () => 0,
});

export const useUserData = () => useContext(UserDataContext);

const FAVORITES_KEY = "kinyan_favorites";
const FOLLOWING_KEY = "kinyan_following";

function loadFromStorage(key: string): Set<string> {
  try {
    const data = localStorage.getItem(key);
    return data ? new Set(JSON.parse(data)) : new Set();
  } catch {
    return new Set();
  }
}

function saveToStorage(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => loadFromStorage(FAVORITES_KEY));
  const [followingIds, setFollowingIds] = useState<Set<string>>(() => loadFromStorage(FOLLOWING_KEY));

  const isFavorite = useCallback((productId: string) => favoriteIds.has(productId), [favoriteIds]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      saveToStorage(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const getFavoriteCount = useCallback(() => favoriteIds.size, [favoriteIds]);

  const isFollowing = useCallback((sellerId: string) => followingIds.has(sellerId), [followingIds]);

  const toggleFollow = useCallback((sellerId: string) => {
    setFollowingIds((prev) => {
      const next = new Set(prev);
      if (next.has(sellerId)) {
        next.delete(sellerId);
      } else {
        next.add(sellerId);
      }
      saveToStorage(FOLLOWING_KEY, next);
      return next;
    });
  }, []);

  const getFollowingCount = useCallback(() => followingIds.size, [followingIds]);

  return (
    <UserDataContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        toggleFavorite,
        getFavoriteCount,
        followingIds,
        isFollowing,
        toggleFollow,
        getFollowingCount,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
