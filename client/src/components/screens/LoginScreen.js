import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]);

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/auth/login",
                { login, password },
                config
            );

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userId", data.userId);

            history.push("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="login-screen">
            <form onSubmit={loginHandler} className="login-screen__form rounded-custom">
                <h3 className="login-screen__title">Login</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group-custom">
                    <label htmlFor="login">Login:</label>
                    <input
                        type="text"
                        required
                        id="login"
                        placeholder="Login"
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
                        tabIndex={1}
                    />
                </div>
                <div className="form-group-custom">
                    <label htmlFor="password">
                        Mot de passe:{" "}
                        <Link to="/forgot-password" className="login-screen__forgot-password">
                            Mot de passe oublié ?
                        </Link>
                    </label>
                    <input
                        type="password"
                        required
                        id="password"
                        autoComplete="true"
                        placeholder="Renseigner votre mot de passe"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        tabIndex={2}
                    />
                </div>
                <button type="submit" className="btn-custom btn-primary-custom">
                    Se connecter
                </button>

                <span className="login-screen__subtext">
          Je n'ai pas de compte <Link to="/register">S'inscrire</Link>
        </span>
            </form>
        </div>
    );
};

export default LoginScreen;
