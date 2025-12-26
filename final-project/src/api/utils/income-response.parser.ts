export function extractIncomeIdFromResponse(responseText: string): string {
    const match = responseText.match(
        /Successfully created income ID:\s*([0-9a-f-]{36})/i
    );

    if (!match) {
        throw new Error(
            `Cannot extract income id from response: "${responseText}"`
        );
    }

    return match[1];
}
