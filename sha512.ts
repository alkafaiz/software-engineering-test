const sha512 = require("crypto-js/sha512");

interface SignatureFactor {
    orderId: string;
    statusCode: string;
    grossAmount: string;
}

function check(input: SignatureFactor, testKey: string): boolean {
    const serverKey = "SB-Mid-server-FV9E6-KuLhxhdf0IBI20E_hU";
    const generatedKey = sha512(
        input.orderId + input.statusCode + input.grossAmount + serverKey
    );
    console.log(generatedKey.toString());

    return generatedKey.toString() === testKey;
}

console.log(
    check(
        {
            orderId: "dea69758-17c7-4c95-993a-e50509fd2baf",
            statusCode: "200",
            grossAmount: "79000.00"
        },
        "017929668debe3a1331428438e5afee3ff32fcea37f9c7c04de5c604a9ae079ed15028841bb30a274e78ef779fb32a949e1374ca089599b09a8d23251dae4960"
    )
);
