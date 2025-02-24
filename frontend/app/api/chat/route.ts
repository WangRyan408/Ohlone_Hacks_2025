import Ably from "ably"

export const revalidate = 0;

export async function GET(request: Request) {
    const client = new Ably.Realtime(process.env.ABLY_API_KEY!);
    const tokenRequestData = await client.auth.createTokenRequest({
        clientId: "code-for-cause",
    });

    return Response.json(tokenRequestData);
}