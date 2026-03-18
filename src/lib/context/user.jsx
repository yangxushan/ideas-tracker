import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);

  /**
   * 邮箱密码登录
   */
  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession({
      email,
      password,
    });
    setUser(loggedIn);
    window.location.replace("/");
  }

  /**
   * 退出登录
   */
  async function logout() {
    await account.deleteSession({ sessionId: "current" });
    setUser(null);
  }

  /**
   * 注册新用户
   */
  async function register(email, password) {
    await account.create({
      userId: ID.unique(),
      email,
      password,
    });
    await login(email, password);
  }

  /**
   * 初始化检查登录状态
   */
  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}