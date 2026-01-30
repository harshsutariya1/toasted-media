import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, website, interest, message, honeypot } = body;

        // 1. Security: Honeypot Check (Anti-Spam)
        // If the hidden 'honeypot' field has a value, it's a bot.
        if (honeypot) {
            // Return success to trick the bot, but do not process.
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // 2. Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        // 3. Send Email via Resend
        const { data, error } = await resend.emails.send({
            // Use 'onboarding@resend.dev' for testing if you haven't verified a domain yet.
            // Once verified, use something like 'contact@yourdomain.com'
            from: 'Toasted Media Form <onboarding@resend.dev>',

            // TODO: Replace this with the email address where you want to receive leads
            to: ['hello@toastedmediaagency.com'],

            // Allows you to reply directly to the client from your inbox
            replyTo: email,

            subject: `New Inquiry: ${interest} - ${name}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Project Inquiry</h2>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Website:</strong> ${website || 'Not provided'}</p>
            <p><strong>Interest:</strong> ${interest}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #52525b;">Message:</h3>
            <p style="font-size: 16px; line-height: 1.5; color: #18181b;">${message}</p>
          </div>
        </div>
      `,
        });

        if (error) {
            console.error('Resend API Error:', error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        console.log('Email sent successfully:', data);

        return NextResponse.json(
            { success: true, message: 'Message sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact API Internal Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
