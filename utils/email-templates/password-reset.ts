interface PasswordResetTemplateProps {
  resetUrl: string
}

export const getPasswordResetTemplate = ({
  resetUrl,
}: PasswordResetTemplateProps): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Reset Your Password</h2>
      <p>You requested to reset your password.</p>
      <p>Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #4CAF50; 
                  color: white; 
                  padding: 12px 24px; 
                  text-decoration: none; 
                  border-radius: 4px;
                  display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
      <hr style="border: 1px solid #eee; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px;">
        This is an automated email, please do not reply.
      </p>
    </div>
  `
}
