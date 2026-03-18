import { useState } from "react";
import { useUser } from "../lib/context/user";

export function Login() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("请输入邮箱和密码");
      return;
    }
    try {
      await user.login(email, password);
    } catch (err) {
      setError("登录失败，请检查邮箱和密码");
    }
  }

  async function handleRegister() {
    if (!email || !password) {
      setError("请输入邮箱和密码");
      return;
    }
    try {
      await user.register(email, password);
    } catch (err) {
      setError("注册失败，该邮箱可能已被使用");
    }
  }

  return (
    <section>
      <h1>登录</h1>
      <div className="login-section">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button className="button" onClick={handleLogin}>
              登录
            </button>
            <button className="button button-secondary" onClick={handleRegister}>
              注册
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </section>
  );
}