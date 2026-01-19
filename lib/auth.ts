import { cookies } from "next/headers";

const COOKIE_NAME = "ossbrowser_admin";

async function sign(value: string) {
    const secret = process.env.ADMIN_SESSION_SECRET!;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const data = encoder.encode(value);

    const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, data);
    
    // Convert ArrayBuffer to Base64
    let binary = '';
    const bytes = new Uint8Array(signature);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}


export async function createAdminSession(email: string){
    const signature = await sign(email);
    const token = `${email}:${signature}`;
    (await cookies()).set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
}

export async function isAdminAuthenticated(cookieStore?: any){
    let token;
    
    if (cookieStore) {
        token = cookieStore.get(COOKIE_NAME)?.value;
    } else {
        token = (await cookies()).get(COOKIE_NAME)?.value;
    }

    if (!token) return false;

    const [email, signature] = token.split(":");
    if (!email || !signature) return false;
    
    const expectedSignature = await sign(email);

    return (
        email === process.env.ADMIN_EMAIL &&
        signature === expectedSignature
    )
}

export async function destroyAdminSession(){
    (await cookies()).delete(COOKIE_NAME);
}