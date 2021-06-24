import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = ({ history }) => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (password !== confirmpassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords do not match");
        }

        try {
            const { data } = await axios.post(
                "/api/auth/register",
                {
                    login,
                    email,
                    password,
                },
                config
            );

            localStorage.setItem("authToken", data.token);

            history.push("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="register-screen">
            <form onSubmit={registerHandler} className="register-screen__form rounded-custom">
                <h3 className="register-screen__title">S'inscrire</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group-custom">
                    <label htmlFor="name">Login:</label>
                    <input
                        type="text"
                        required
                        id="name"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div className="form-group-custom">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Veuillez rentrer une adresse mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group-custom">
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        required
                        id="password"
                        autoComplete="true"
                        placeholder="Veuillez rentrer un mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group-custom">
                    <label htmlFor="confirmpassword">Confirmer le mot de passe:</label>
                    <input
                        type="password"
                        required
                        id="confirmpassword"
                        autoComplete="true"
                        placeholder="Confirmer votre mot de passe"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-custom btn-primary-custom">
                    S'inscrire
                </button>

                <span className="register-screen__subtext">
          J'ai déja un compte ! <Link to="/login">Se connecter</Link>
        </span>
            </form>
        </div>
    );
};

export default RegisterScreen;
