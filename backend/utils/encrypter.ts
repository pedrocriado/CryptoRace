import { getKey } from "./random";

export class Ciphers {
    static keyMatrix: string[][] = [];
    static selectCipher(cipher: string, text: string, key?: string): string | null {
        if (cipher == "caesar") {
            return this.caesarCipher(text);
        }
        else if (cipher == "vigenere") {
            return this.vigenereCipher(text, getKey());
        }
        else if (cipher == "playfair") {
            return this.playfairCipher(text, getKey());
        }
        return null;
    }
    static caesarCipher(text: string): string {
        return text.replace(/[a-z]/gi, (char) => {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + 3) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + 3) % 26) + 97);
            }
            return char;
        });
    }
    static vigenereCipher(text: string, key: string): string {
        return text.replace(/[a-z]/gi, (char, index) => {
            const code = char.charCodeAt(0);
            const keyChar = key[index % key.length].toUpperCase();
            const shift = keyChar.charCodeAt(0) - 65;
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
            return char;
        });

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
    static playfairCipher(text: string, key: string): string {
        this.prepareKeyMatrix(key);
        text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
        let ciphertext = "";

        for (let i = 0; i < text.length; i += 2) {
            let char1 = text[i];
            let char2 = (i + 1 < text.length) ? text[i + 1] : 'X';
            if (char1 === char2) {
                char2 = 'X';
                i--;
            }

            const pos1 = this.findPosition(char1);
            const pos2 = this.findPosition(char2);

            if (pos1 && pos2) {
                let row1 = pos1[0];
                let col1 = pos1[1];
                let row2 = pos2[0];
                let col2 = pos2[1];

                if (row1 === row2) {
                    ciphertext += this.keyMatrix[row1][(col1 + 1) % 5];
                    ciphertext += this.keyMatrix[row2][(col2 + 1) % 5];
                } else if (col1 === col2) {
                    ciphertext += this.keyMatrix[(row1 + 1) % 5][col1];
                    ciphertext += this.keyMatrix[(row2 + 1) % 5][col2];
                } else {
                    ciphertext += this.keyMatrix[row1][col2];
                    ciphertext += this.keyMatrix[row2][col1];
                }
            }
        }
        return ciphertext;
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
}