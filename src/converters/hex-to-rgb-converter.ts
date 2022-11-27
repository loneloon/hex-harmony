import { Rgb } from '../dtos'

class HexColor {

    constructor(
        readonly hex: string,
    ){
        if (this.hex.length != 6){
            throw new Error(`Invalid hexadecimal input! String length is ${hex.length} instead of 6.`);
            
        }
    }

    get rgb(): Rgb {
        const red = this.hex.slice(0, 2)
        const green = this.hex.slice(2, 4)
        const blue = this.hex.slice(4)

        console.log(`Hex ${this.hex} = ${red} + ${green} + ${blue}`)

        return {
            r: this.hexStringGroupToRgbValue(red),
            g: this.hexStringGroupToRgbValue(green),
            b: this.hexStringGroupToRgbValue(blue)
        }
    }

    private parseHexDigitToDecimal(char: string): number {
        switch (char) {
            case "A": {
                return 10
            }
            case "B": {
                return 11
            }
            case "C": {
                return 12
            }
            case "D": {
                return 13
            }
            case "E": {
                return 14
            }
            case "F": {
                return 15
            }
            default: {
                return parseInt(char)
            }
        }
    }

    private hexStringGroupToRgbValue(hexGroup: string): number {
        // TechDebt: Add validation for group length. Converted hex should ALWAYS be divided into 3 groups: each 2 chars long.
        return this.parseHexDigitToDecimal(hexGroup.charAt(0)) * 16 + this.parseHexDigitToDecimal(hexGroup.charAt(1))
    }
}
