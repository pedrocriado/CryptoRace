
export class Decrypter {
    static keyMatrix: string[][] = [];
    static selectCipher(cipher: string, text: string, shift?: number | undefined, key?: string | undefined): string | null {
        if (cipher == "caesar") {
            return this.caesarDecoder(text, shift);
        }
        else if (cipher == "vigenere") {
            return this.vigenereCipher(text, key);
        }
        else if (cipher == "playfair") {
            return this.playfairCipher(text, key);
        }
        return null;
    }
    static caesarDecoder(text: string, shift: number | undefined): string {
        if (shift == undefined) return text;

        let result = '';

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            if (char.match(/[a-z]/i)) {
                const code = text.charCodeAt(i);
                let shiftedCode;

                if (code >= 65 && code <= 90) {
                    shiftedCode = ((code - 65 - shift + 26) % 26) + 65;
                } else if (code >= 97 && code <= 122) {
                    shiftedCode = ((code - 97 - shift + 26) % 26) + 97
                } else {
                    shiftedCode = code;
                }
                char = String.fromCharCode(shiftedCode);
            }
            result += char
        }
        return result;
    }
    static vigenereCipher(text: string, key?: string | undefined): string {
        if (!key) return text;
        let plaintext = "";
        key = key.toUpperCase();
        text = text.toUpperCase();

        let keyIndex = 0;

        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);

            if (charCode >= 65 && charCode <= 90) {
                const keyCharCode = key.charCodeAt(keyIndex % key.length) - 65;
                const decryptedCharCode = ((charCode - 65 - keyCharCode + 26) % 26) + 65;
                plaintext += String.fromCharCode(decryptedCharCode);
                keyIndex++;
            } else {
                plaintext += text[i];
            }
        }
        return plaintext;

    }
    static findPosition(char: string): [number, number] {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (this.keyMatrix[row][col] === char) {
                    return [row, col];
                }
            }
        }
        return [-1, -1];
    }
    static prepareText(text: string): string {
        text = text.toUpperCase().replace(/[^A-Z]/g, '');
        text = text.replace(/J/g, 'I');
        let preparedText = '';
        for (let i = 0; i < text.length; i += 2) {
            if (i + 1 < text.length) {
                if (text[i] === text[i + 1]) {
                    preparedText += text[i] + 'X';
                    i--;
                } else {
                    preparedText += text[i] + text[i + 1];
                }
            } else {
                preparedText += text[i] + 'X';
            }
        }
        return preparedText;
    }
    static prepareKeyMatrix(key: string): void {
        const keyString = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
        let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
        let combined = "";

        for (let char of keyString) {
            if (!combined.includes(char)) {
                combined += char;
            }
        }

        for (let char of alphabet) {
            if (!combined.includes(char)) {
                combined += char;
            }
        }

        for (let i = 0; i < 5; i++) {
            this.keyMatrix[i] = combined.slice(i * 5, (i + 1) * 5).split("");
        }
    }
    static playfairCipher(text: string, key?: string | undefined): string {
        if (!key) return text;
        const preparedCipherText = this.prepareText(text);
        this.prepareKeyMatrix(key);
        let plainText = '';

        for (let i = 0; i < preparedCipherText.length; i += 2) {
            const char1 = preparedCipherText[i];
            const char2 = preparedCipherText[i + 1];

            const pos1 = this.findPosition(char1);
            const pos2 = this.findPosition(char2);

            if (pos1 && pos2) {
                let row1 = pos1[0];
                let col1 = pos1[1];
                let row2 = pos2[0];
                let col2 = pos2[1];

                if (row1 === row2) {
                    plainText += this.keyMatrix[row1][(col1 - 1 + 5) % 5];
                    plainText += this.keyMatrix[row2][(col2 - 1 + 5) % 5];
                } else if (col1 === col2) {
                    plainText += this.keyMatrix[(row1 - 1 + 5) % 5][col1];
                    plainText += this.keyMatrix[(row2 - 1 + 5) % 5][col2];
                } else {
                    plainText += this.keyMatrix[row1][col2];
                    plainText += this.keyMatrix[row2][col1];
                }
            }
        }
        return plainText;
    }
}