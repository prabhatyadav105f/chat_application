import { resendClient } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./email.templates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: `Chatify <${process.env.EMAIL_FROM}>`,   // ✅ define sender properly
     to: "prabhatyadav105f@gmail.com",                                     // ✅ pass recipient email
      subject: "Welcome to Chatify 🎉",
      html: createWelcomeEmailTemplate(name, clientURL), // ✅ call template fn
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email sent successfully:", data);
    return data;
  } catch (err) {
    console.error("sendWelcomeEmail failed:", err);
    throw err;
  }
};
