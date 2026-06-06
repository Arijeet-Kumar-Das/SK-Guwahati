import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactFormData {
  name: string;
  phone: string;
  address: string;
  service: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Indian phone numbers: optional +91 or 0 prefix, then 10 digits.
 * Also allows plain 10-digit numbers.
 */
const PHONE_REGEX = /^(?:\+91|0)?[6-9]\d{9}$/;

function validateFields(
  data: Partial<ContactFormData>
): Record<string, string> | null {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else {
    const cleaned = data.phone.replace(/[\s-]/g, "");
    if (!PHONE_REGEX.test(cleaned)) {
      errors.phone = "Please enter a valid Indian phone number";
    }
  }

  if (!data.address?.trim()) {
    errors.address = "Address is required";
  }

  if (!data.service?.trim() || data.service === "Select Service") {
    errors.service = "Please select a service";
  }

  if (!data.message?.trim()) {
    errors.message = "Message is required";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

// ---------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------

function buildEmailHtml(data: ContactFormData, submittedAt: string): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f2847 100%); padding: 32px 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">
          New Service Request
        </h1>
        <p style="color: #94b8d4; margin: 8px 0 0; font-size: 14px;">
          S.K Enterprise — Guwahati
        </p>
      </div>

      <div style="padding: 32px 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; width: 140px; vertical-align: top;">
              Name
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 500;">
              ${escapeHtml(data.name)}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; vertical-align: top;">
              Phone
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 500;">
              <a href="tel:${escapeHtml(data.phone)}" style="color: #2563eb; text-decoration: none;">
                ${escapeHtml(data.phone)}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; vertical-align: top;">
              Address
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 500;">
              ${escapeHtml(data.address)}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; vertical-align: top;">
              Service Needed
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 500;">
              ${escapeHtml(data.service)}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; vertical-align: top;">
              Message
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; line-height: 1.6;">
              ${escapeHtml(data.message).replace(/\n/g, "<br>")}
            </td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #f9fafb; border-radius: 6px; text-align: center;">
          <p style="margin: 0; color: #6b7280; font-size: 12px;">
            Submitted at ${escapeHtml(submittedAt)}
          </p>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------------------------------------------------------------------------
// Route Handler
// ---------------------------------------------------------------------------

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as Partial<ContactFormData>;

    // Validate
    const errors = validateFields(body);
    if (errors) {
      const response: ApiResponse = {
        success: false,
        message: "Please fix the errors below",
        errors,
      };
      return Response.json(response, { status: 400 });
    }

    const data = body as ContactFormData;

    // Verify env vars are configured
    const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
      console.error("Missing email environment variables");
      const response: ApiResponse = {
        success: false,
        message: "Server configuration error. Please try again later.",
      };
      return Response.json(response, { status: 500 });
    }

    // Format timestamp in IST
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"S.K Enterprise Website" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: undefined, // no customer email collected
      subject: `New Service Request - S.K Enterprise`,
      text: [
        `New Service Request - S.K Enterprise`,
        ``,
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Address: ${data.address}`,
        `Service Needed: ${data.service}`,
        `Message: ${data.message}`,
        ``,
        `Submitted At: ${submittedAt}`,
      ].join("\n"),
      html: buildEmailHtml(data, submittedAt),
    });

    const response: ApiResponse = {
      success: true,
      message: "Thank you! Your service request has been submitted. We'll get back to you shortly.",
    };
    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong. Please try again or call us directly.",
    };
    return Response.json(response, { status: 500 });
  }
}
