export function extractExpenseIdFromResponse(responseText: string): string {
    const match = responseText.match(
        /Successfully created expense ID:\s*([0-9a-f-]{36})/i
    );

    if (!match) {
        throw new Error(
            `Cannot extract expense id from response: "${responseText}"`
        );
    }

    return match[1];
}
