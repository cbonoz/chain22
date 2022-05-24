

export const getEthPrice = () => {
    return fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd", {
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET"
    });
}