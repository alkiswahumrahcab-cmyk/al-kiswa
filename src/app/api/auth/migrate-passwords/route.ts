import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
    // Basic protection: Ensure this isn't easily hit by random bots.
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    // Require a simple token to run migration
    if (token !== 'migrate-passwords-securely') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        
        // Find all users (lean query for speed)
        const users = await User.find({}).lean();
        let migratedCount = 0;

        for (const user of users) {
            if (user.password) {
                // If password does not start with $2a$ or $2b$, it's plain text
                if (!user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(user.password, salt);
                    
                    await User.updateOne(
                        { _id: user._id },
                        { $set: { password: hashedPassword } }
                    );
                    migratedCount++;
                }
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: `Migration complete. Successfully hashed ${migratedCount} passwords.` 
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
