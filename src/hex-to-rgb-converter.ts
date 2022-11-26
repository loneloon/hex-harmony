
interface Rgb {
    r: number;
    g: number;
    b: number;
}

class HexColor {

    constructor(
        readonly hex: string,
    ){
        if (this.hex.length != 6){
            throw new Error(`Wrong hexadecimal input! String length is ${hex.length} instead of 6.`);
            
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

    private parseHexDigit(char: string): number {
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

    private hexStringGroupToRgbValue (hexGroup: string): number {
        return this.parseHexDigit(hexGroup.charAt(0)) * 16 + this.parseHexDigit(hexGroup.charAt(1))
    }
}
