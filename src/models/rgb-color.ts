import { Rgb } from "../dtos/rgb";

export class RgbColor {
    constructor(readonly r: number, readonly g: number, readonly b: number){
        this.validateColorInput(this.r, this.g, this.b)
    }

    // TechDebt: RgbColor model shouldn't not be responsible for this conversion. Take it out as a separate converter
    get hex(): string {
        return this.parseDecimalToHexDigit(this.r) + this.parseDecimalToHexDigit(this.g) + this.parseDecimalToHexDigit(this.b)
    }

    get rgb(): Rgb {
        return {
            r: this.r,
            g: this.g,
            b: this.b
        }
    }

    private validateColorInput(r: number, g: number, b: number): void {
        // TechDebt: This looks wonky
        let colorValidationError = {}
        let errorFlag: boolean = false;

        if (r < 0 || r > 255) {
            errorFlag = true
            Object.assign(colorValidationError, { RED: `Value should be between 0 and 255. Received ${r}` })
        }
        if (g < 0 || g > 255) {
            errorFlag = true
            Object.assign(colorValidationError, { GREEN: `Value should be between 0 and 255. Received ${g}` })
        }
        if (b < 0 || b > 255) {
            errorFlag = true
            Object.assign(colorValidationError, { BLUE: `Value should be between 0 and 255. Received ${b}` })
        }

        if (errorFlag) {
            throw new Error(JSON.stringify(
                {
                    message: "Invalid color value input.",
                    validationError: colorValidationError
                }));
            }
    }

    // BUG: Sometimes this produces stubs of hexes 4 chars/digits long
    private parseDecimalToHexDigit(decimal: number): string {
        let hexResult: string = "";
        let remainder: number = decimal;

        while (remainder > 15) {
            hexResult = this.translateDecToHex(remainder % 16) + hexResult
            remainder = (remainder - remainder % 16) / 16
        }

        if (remainder >= 0) {
            hexResult = this.translateDecToHex(remainder) + hexResult
        }

        if (hexResult.length == 1) {
            return "0" + hexResult
        } 

        return hexResult
    }

    private translateDecToHex(decimal: number): string {
        switch (decimal) {
            case 10: {
                return "A"
            }
            case 11: {
                return "B"
            }
            case 12: {
                return "C"
            }
            case 13: {
                return "D"
            }
            case 14: {
                return "E"
            }
            case 15: {
                return "F"
            }
            default: {
                return decimal.toString()
            }
        }
    }
}
