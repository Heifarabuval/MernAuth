import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ResetPasswordScreen.css";

const ResetPasswordScreen = ({ history, match }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Les mots de passe ne correspondent pas");
        }

        try {
            const { data } = await axios.put(
                `/api/auth/reset-password/${match.params.resetToken}`,
                {
                    password,
                },
                config
            );

            console.log(data);
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="resetpassword-screen">
            <form
                onSubmit={resetPasswordHandler}
                className="resetpassword-screen__form rounded-custom"
            >
                <h3 className="resetpassword-screen__title">Mot de passe oublié</h3>
                {error && <span className="error-message">{error} </span>}
                {success && (
                    <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
                )}
                <div className="form-group-custom">
                    <label htmlFor="password">Nouveau mot de passe:</label>
                    <input
                        type="password"
                        required
                        id="password"
                        placeholder="Nouveau mot de passe"
                        autoComplete="true"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group-custom">
                    <label htmlFor="confirmpassword">Confirmer le nouveau mot de passe:</label>
                    <input
                        type="password"
                        required
                        id="confirmpassword"
                        placeholder="Confirmer le nouveau mot de passe"
                        autoComplete="true"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-custom btn-primary-custom">
                    Changer le mot de passe
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordScreen;
