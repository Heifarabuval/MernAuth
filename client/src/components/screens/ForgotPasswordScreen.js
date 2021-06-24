import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/auth/forgot-password",
                { email },
                config
            );

            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="forgotpassword-screen">
            <form
                onSubmit={forgotPasswordHandler}
                className="forgotpassword-screen__form rounded-custom"
            >
                <h3 className="forgotpassword-screen__title">Mot de passe oublié</h3>
                {error && <span className="error-message">{error}</span>}
                {success && <span className="success-message">{success}</span>}
                <div className="form-group-custom">
                    <p className="forgotpassword-screen__subtext">
                        Veuilez renseigner l'adresse utilisée lors de votre inscription. Nous vous enverrons un email de
                        récupération à cette adresse
                    </p>
                    <label htmlFor="email">Adresse mail:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Adresse mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-custom btn-primary-custom">
                    Envoyer le mail
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordScreen;
