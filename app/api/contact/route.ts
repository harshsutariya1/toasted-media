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
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #09090b; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #e4e4e7;">
          <div style="max-width: 600px; margin: 40px auto; background: #18181b; border-radius: 16px; overflow: hidden; border: 1px solid #27272a; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);">
            
            <!-- Gradient Header Line -->
            <div style="height: 4px; width: 100%; background: linear-gradient(90deg, #3b82f6, #f97316, #a855f7);"></div>

            <!-- Header -->
            <div style="padding: 40px 40px 20px 40px; text-align: left;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Inquiry</h1>
              <p style="margin: 8px 0 0 0; color: #a1a1aa; font-size: 14px;">You have received a new project request.</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 0 40px 40px 40px;">
              
              <!-- Key Details Card -->
              <div style="background-color: #27272a; border-radius: 12px; padding: 24px; margin-bottom: 32px; border: 1px solid #3f3f46;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding-bottom: 24px; vertical-align: top; width: 50%;">
                       <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #71717a; margin-bottom: 8px; font-weight: 600;">Client Name</span>
                       <div style="font-size: 16px; color: #ffffff; font-weight: 500;">${name}</div>
                    </td>
                    <td style="padding-bottom: 24px; vertical-align: top; width: 50%;">
                       <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #71717a; margin-bottom: 8px; font-weight: 600;">Email Address</span>
                       <div style="font-size: 16px; color: #ffffff; font-weight: 500;">
                         <a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${email}</a>
                       </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 0; vertical-align: top; width: 50%;">
                       <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #71717a; margin-bottom: 8px; font-weight: 600;">Website</span>
                       <div style="font-size: 16px; color: #ffffff; font-weight: 500;">${website ? `<a href="${website}" style="color: #ffffff; text-decoration: underline; text-decoration-color: #52525b;">${website}</a>` : '<span style="color: #52525b; font-style: italic;">Not provided</span>'}</div>
                    </td>
                    <td style="padding-bottom: 0; vertical-align: top; width: 50%;">
                       <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #71717a; margin-bottom: 8px; font-weight: 600;">Interest</span>
                       <div style="font-size: 16px;">
                         <span style="background-color: rgba(249, 115, 22, 0.1); color: #f97316; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 500; display: inline-block; border: 1px solid rgba(249, 115, 22, 0.2);">
                           ${interest || 'General'}
                         </span>
                       </div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message Section -->
              <div style="margin-bottom: 12px;">
                 <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #71717a; margin-bottom: 12px; font-weight: 600;">Message</span>
              </div>
              <div style="background-color: #09090b; padding: 24px; border-radius: 12px; border: 1px solid #27272a; position: relative;">
                <div style="position: absolute; left: 0; top: 24px; bottom: 24px; width: 3px; background-color: #f97316; border-radius: 0 4px 4px 0;"></div>
                <div style="font-size: 15px; line-height: 1.7; color: #d4d4d8; white-space: pre-wrap; padding-left: 12px;">${message}</div>
              </div>

            </div>
            
            <!-- Footer -->
            <div style="background-color: #18181b; padding: 24px; text-align: center; border-top: 1px solid #27272a;">
              <p style="margin: 0; font-size: 12px; color: #52525b;">
                Sent via <strong>Toasted Media</strong> Contact Form
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }



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
