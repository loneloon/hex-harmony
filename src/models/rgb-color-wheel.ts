import { Rgb } from "../dtos/rgb";
import { HexColor } from "./hex-color";
import { RgbColor } from "./rgb-color";

class RgbColorWheel {
    private numberOfColors: number = 7;
    private maxValue: number = 255;
    private wheelLengthInPoints: number = this.numberOfColors * this.maxValue;

    constructor(){}

    public findPosition(startPos: Rgb, stepLength: number): Rgb {
        let currentPosition: Rgb = startPos
        let remainder: number = stepLength
        
        // If stepLength equals wheelLength times X, just return current position
        if (stepLength >= this.wheelLengthInPoints && stepLength % this.wheelLengthInPoints == 0) {
            return currentPosition
        }

        while (remainder > 0) {
            console.log(currentPosition)
            console.log(remainder)
            if (
                currentPosition.r <= this.maxValue &&
                currentPosition.g == this.maxValue &&
                currentPosition.b == 0
                ) 
                { 
                    if (remainder >= currentPosition.r) {
                        remainder -= currentPosition.r
                        Object.assign(currentPosition,
                        {
                            r: 0,
                            g: currentPosition.g,
                            b: currentPosition.b
                        })
                    } else {
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r - remainder,
                                g: currentPosition.g,
                                b: currentPosition.b
                            })
                        remainder = 0
                    }
            }
    
            if (
                currentPosition.r == this.maxValue &&
                currentPosition.g < this.maxValue &&
                currentPosition.b == 0
                )
                {
                    if (remainder >= (this.maxValue - currentPosition.g)) {
                        remainder -= (this.maxValue - currentPosition.g)
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r,
                                g: this.maxValue,
                                b: currentPosition.b
                            })
                    } else {
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r,
                                g: currentPosition.g + remainder,
                                b: currentPosition.b
                            })
                        remainder = 0
                    }
                    
    
            }
    
            if (
                currentPosition.r == 0 &&
                currentPosition.g == this.maxValue &&
                currentPosition.b < this.maxValue
                )
                {

                    if (remainder >= (this.maxValue - currentPosition.b)) {
                        remainder -= (this.maxValue - currentPosition.b)
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r,
                                g: currentPosition.g,
                                b: this.maxValue
                            })
                    } else {
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r,
                                g: currentPosition.g,
                                b: currentPosition.b + remainder
                            })
                        remainder = 0
                    }
    
            }
    
            if (
                currentPosition.r == 0 &&
                currentPosition.g <= this.maxValue &&
                currentPosition.b == this.maxValue
                )
                {
                    if (remainder >= currentPosition.g) {
                        remainder -= currentPosition.g
                        Object.assign(currentPosition,
                        {
                            r: currentPosition.r,
                            g: 0,
                            b: currentPosition.b
                        })
                    } else {
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r,
                                g: currentPosition.g - remainder,
                                b: currentPosition.b
                            })
                        remainder = 0
                    }
    
            }
    
            if (
                currentPosition.r <= this.maxValue &&
                currentPosition.g == 0 &&
                currentPosition.b == this.maxValue
                )
                {
                    if (remainder >= (this.maxValue - currentPosition.r)) {
                        remainder -= (this.maxValue - currentPosition.r)
                        Object.assign(currentPosition,
                            {
                                r: this.maxValue,
                                g: currentPosition.g,
                                b: currentPosition.b
                            })
                    } else {
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r + remainder,
                                g: currentPosition.g,
                                b: currentPosition.b
                            })
                        remainder = 0
                    }
    
            }
    
            if (
                currentPosition.r == this.maxValue &&
                currentPosition.g == 0 &&
                currentPosition.b <= this.maxValue
                )
                {
                    if (remainder >= currentPosition.b) {
                        remainder -= currentPosition.b
                        Object.assign(currentPosition,
                        {
                            r: currentPosition.r,
                            g: currentPosition.g,
                            b: 0
                        })
                    } else {
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r,
                                g: currentPosition.g,
                                b: currentPosition.b - remainder
                            })
                        remainder = 0
                    }
    
            }
        }
        
        // TechDebt: Add validation to confirm that new position != old position if it shouldn't be

        return currentPosition
    }
}
