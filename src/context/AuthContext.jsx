import { createContext, useContext, useState } from "react";

const Ctx = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(Ctx);

const KEY = "aurelia_user";

function readUser() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  const persist = (u) => {
    setUser(u);

    if (u) {
      localStorage.setItem(KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(KEY);
    }
  };

  const login = (email, name) => {
    // Demo auth: derive a friendly name from email if no name is given
    const fallback = email
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    persist({
      name: name || fallback || "Aurelia Guest",
      email,
      role: "user",
    });
  };

  const register = (name, email, phone) => {
    persist({
      name,
      email,
      phone,
      role: "user",
    });
  };

  const logout = () => {
    persist(null);
  };

  const updateUser = (patch) => {
    if (user) {
      persist({
        ...user,
        ...patch,
      });
    }
  };

  return (
    <Ctx.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}