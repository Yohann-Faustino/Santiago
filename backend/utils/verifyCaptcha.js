import axios from "axios";

const verifyCaptcha = async (token, ip) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) throw new Error("Clé secrète reCAPTCHA non définie.");

  try {
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);
    if (ip) {
      params.append("remoteip", ip);
    }

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.success;
  } catch (error) {
    console.error("Erreur lors de la vérification reCAPTCHA :", error);
    return false;
  }
};

export default verifyCaptcha;
