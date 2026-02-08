import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend with your API key inside the handler
// const resend = new Resend(process.env.RESEND_API_KEY);

// Define validation schema for robust input handling
const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    website: z.string().optional(),
    interest: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
    honeypot: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        // 1. Check Configuration
        // Ensure the API key is available before proceeding.
        if (!process.env.RESEND_API_KEY) {
            console.error('Missing RESEND_API_KEY environment variable');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const body = await request.json();

        // 2. Validate Input using Zod
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            // Return the first validation error message
            const errorMessage = result.error.issues[0]?.message || 'Invalid input';
            return NextResponse.json(
                { error: errorMessage },
                { status: 400 }
            );
        }

        const { name, email, website, interest, message, honeypot } = result.data;

        // 3. Security: Honeypot Check (Anti-Spam)
        // If the hidden 'honeypot' field has a value, it's a bot.
        if (honeypot) {
            // Silently fail for bots (return success so they don't retry)
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // 4. Send Email via Resend
        // Use environment variables for emails if available, otherwise fallback (with warnings)
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Toasted Media Form <onboarding@resend.dev>';
        const toEmail = process.env.CONTACT_EMAIL || 'toastedmedia3@gmail.com';

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            replyTo: email,
            subject: `New Inquiry: ${interest || 'General'} - ${name}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Project Inquiry</h2>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Website:</strong> ${website || 'Not provided'}</p>
            <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #52525b;">Message:</h3>
            <p style="font-size: 16px; line-height: 1.5; color: #18181b; white-space: pre-wrap;">${message}</p>
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
