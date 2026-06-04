import { serve } from "https://deno.land/std@0.192.0/http/server.ts"
import { Resend } from "npm:resend@3.2.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

serve(async (req) => {
  try {
    // Parse the payload from the Supabase Webhook
    const payload = await req.json()

    // Webhooks send the inserted row under the 'record' key
    const record = payload.record

    if (!record || !record.email) {
      return new Response("No email found in the record", { status: 400 })
    }

    const { email, full_name } = record

    // Send the email via Resend
    const data = await resend.emails.send({
      from: "0to1 Team <welcome@0to1.wtf>",
      to: [email],
      subject: "Welcome to the 0to1 Waitlist!",
      html: `
        <h2>Hi ${full_name || 'there'}!</h2>
        <p>Thanks for applying to join the 0to1 waitlist.</p>
        <p>We have received your application and will be in touch soon!</p>
        <br/>
        <p>Best,</p>
        <p>The 0to1 Team</p>
      `,
    })
    
    console.log("Resend Response:", data)

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
