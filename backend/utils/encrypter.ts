import { KeyModel } from "../models/Key";
//TODO: finish the cipher encryptions
//const getRandomKey = () => {

//}
export class Ciphers {
    static selectCipher(cipher: string, text: string): string | null {
        if(cipher == "caesar") {
            return this.caesarCipher(text);
        }
        else if(cipher == "vigenere") {
            //const key = getKey();
            //return this.vigenereCipher(text, key);
        }
        else if(cipher == "playfair") {
            return this.playfairCipher(text);
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
        //const key = getRandomKey();
        
    }
    static playfairCipher(text: string): string {

    }   
}