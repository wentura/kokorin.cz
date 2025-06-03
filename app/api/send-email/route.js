import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { to, subject, data } = await request.json();

    const { data: emailData, error } = await resend.emails.send({
      from: "Kokořín.cz <info@kokorin.cz>",
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Nová poptávka na Kokořín.cz</h2>
          ${
            subject === "Nová poptávka ubytování z Kokořín.cz"
              ? `
            <p><strong>Poptávka ubytování:</strong> ${data.accommodation}</p>
            <br />
            <p><strong>Jméno:</strong> ${data.name}</p>
            <p><strong>E-mail:</strong> ${data.email}</p>
            <p><strong>Od:</strong> ${new Date(data.dateFrom).toLocaleDateString()}</p>
            <p><strong>Do:</strong> ${new Date(data.dateTo).toLocaleDateString()}</p>
            <p><strong>Počet dospělých:</strong> ${data.adults}</p>
            <p><strong>Počet dětí (3-10 let):</strong> ${data.infants}</p>
            
            ${
              data.notes
                ? `
            <p><strong>Poznámka k poptávce:</strong></p>
            <p style="white-space: pre-wrap; background-color: #f9fafb; padding: 10px; border-radius: 4px;">${data.notes}</p>
            `
                : ""
            }
          `
              : `
            <p>Dobrý den ${data.name},</p>
            <p>${data.message}</p>
          `
          }
        </div>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 400 });
    }

    return Response.json({ success: true, data: emailData });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
