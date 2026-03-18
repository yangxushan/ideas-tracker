import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div>
      <UserProvider>
        <IdeasProvider>
          <main>{isLoginPage ? <Login /> : <Home />}</main>
        </IdeasProvider>
      </UserProvider>
    </div>
  );
}

export default App;
