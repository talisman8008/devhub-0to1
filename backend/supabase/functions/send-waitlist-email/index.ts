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
      subject: "Application Received - 0to1 Cohort 01",
      html: `
        <p>Hey ${full_name ? full_name.split(' ')[0] : ''},</p>
        <br/>
        <p>Thanks for applying to 0to1.</p>
        <p>We've received your application for Cohort 01 starting on June 28, 2026.</p>
        <p>As an added bonus, all applicants will now receive a free 10-day induction prior to the start of the cohort!</p>
        <p>Over the next few days, our team will be reviewing applications and speaking with applicants individually to understand their goals, interests, and what they hope to build during the program.</p>
        <p>In the meantime, we've created a space for applicants to connect with each other and stay updated.</p>
        <br/>
        <p><a href="#">🔗 LINK TO WHATSAPP GROUP</a></p>
        <br/>
        <p>We'll be reaching out soon.</p>
        <p>- Piyush & Team<br/>0to1</p>
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
