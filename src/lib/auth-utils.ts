import { SignJWT, jwtVerify } from 'jose';

// Fetch the secret key dynamically so we can validate it at runtime
const getSecretKey = () => {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret || secret.trim() === '') {
        console.error("FATAL: JWT_SECRET_KEY environment variable is missing.");
        throw new Error("Missing JWT_SECRET_KEY configuration.");
    }
    return new TextEncoder().encode(secret);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signToken(payload: any) {
    const key = getSecretKey();
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // 1 week session
        .sign(key);
}

export async function verifyToken(token: string) {
    try {
        const key = getSecretKey();
        const { payload } = await jwtVerify(token, key);
        return payload;
    } catch {
        return null;
    }
}
