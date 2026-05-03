import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // --- Password strength enforcement ---
        const strengthErrors: string[] = [];
        if (newPassword.length < 8) strengthErrors.push('at least 8 characters');
        if (!/[A-Z]/.test(newPassword)) strengthErrors.push('one uppercase letter');
        if (!/[a-z]/.test(newPassword)) strengthErrors.push('one lowercase letter');
        if (!/[0-9]/.test(newPassword)) strengthErrors.push('one number');
        if (!/[^A-Za-z0-9]/.test(newPassword)) strengthErrors.push('one special character (e.g. @, !, #)');

        if (strengthErrors.length > 0) {
            return NextResponse.json({
                error: `Password too weak. It must contain: ${strengthErrors.join(', ')}.`
            }, { status: 400 });
        }
        // --- End strength check ---

        await dbConnect();

        // Try to identify user from JWT cookie first
        let dbUser: any = null;
        try {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            const token = cookieStore.get('admin_token')?.value;
            if (token) {
                const { verifyToken } = await import('@/lib/auth-utils');
                const payload = await verifyToken(token);
                if (payload?.userId) {
                    dbUser = await User.findById(payload.userId);
                }
            }
        } catch { /* token expired or unavailable — use fallback */ }

        // Fallback: match any admin whose stored password equals currentPassword
        if (!dbUser) {
            const admins = await User.find({ role: 'admin' });
            const { verifyPassword } = await import('@/lib/password-utils');
            for (const candidate of admins) {
                const storedPw = candidate.password as string;
                const matches = storedPw?.startsWith('$2')
                    ? await verifyPassword(currentPassword, storedPw)
                    : storedPw === currentPassword;
                if (matches) { dbUser = candidate; break; }
            }
        }

        if (!dbUser) {
            return NextResponse.json({ error: 'Incorrect current password' }, { status: 401 });
        }

        // Double-check current password against resolved user
        const { verifyPassword, hashPassword } = await import('@/lib/password-utils');
        const storedPw = dbUser.password as string;
        const isCurrentValid = storedPw?.startsWith('$2')
            ? await verifyPassword(currentPassword, storedPw)
            : storedPw === currentPassword;

        if (!isCurrentValid) {
            return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
        }

        // Always save as bcrypt hash — never plain text
        dbUser.password = await hashPassword(newPassword);
        await dbUser.save();

        console.log(`[Auth] Password bcrypt-hashed and saved for: ${dbUser.email}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Password change error:', error);
        return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
    }
}
