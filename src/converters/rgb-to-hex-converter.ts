import { Rgb } from "../dtos";

class RgbColor {
    constructor(readonly r: number, readonly g: number, readonly b: number){
        this.validateColorInput(this.r, this.g, this.b)
    }

    get hex(): string {
        return this.decimalToHexadecimal(this.r) + this.decimalToHexadecimal(this.g) + this.decimalToHexadecimal(this.b)
    }

    private validateColorInput(r: number, g: number, b: number): void {
        let colorValidationError = {}
        
        if (r < 0 || r > 255) {
            Object.assign(colorValidationError, { RED: `Value should be between 0 and 255. Received ${r}` })
        }
        if (g < 0 || g > 255) {
            Object.assign(colorValidationError, { GREEN: `Value should be between 0 and 255. Received ${g}` })
        }
        if (b < 0 || b > 255) {
            Object.assign(colorValidationError, { BLUE: `Value should be between 0 and 255. Received ${b}` })
        }

        throw new Error(JSON.stringify(
            {
                message: "Invalid color value input.",
                validationError: colorValidationError
            }));
    }

    private decimalToHexadecimal(decimal: number): string {
        let hexResult: string = "";
        let remainder: number = decimal;

        while (remainder > 15) {
            hexResult = this.translateDecToHex(remainder % 16) + hexResult
            remainder = (remainder - remainder % 16) / 16
        }

        if (remainder > 0) {
            hexResult = this.translateDecToHex(remainder) + hexResult
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
