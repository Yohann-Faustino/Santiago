
import axios from "axios";

const verifyCaptcha = async (token, ip) => {
  const secretKey = process.env.RECAPTCHA_SECRET;
  if (!secretKey) throw new Error("Clé secrète reCAPTCHA non définie.");

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: token,
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
