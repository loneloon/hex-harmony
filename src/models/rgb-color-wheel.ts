import { HarmonyRule } from "../dtos/harmony";
import { Rgb } from "../dtos/rgb";
import { HexColor } from "./hex-color";
import _ from "lodash"
import { RgbColor } from "./rgb-color";

export const COMPLEMENTARY: HarmonyRule = {
    colors: 2,
    steps: [{direction: 'CCW', sector: 0.5}]
}

export const TRIADS: HarmonyRule = {
    colors: 3,
    steps: [{direction: 'CCW', sector: 0.33}, {direction: 'CCW', sector: 0.66}]
}

export const SQUARE: HarmonyRule = {
    colors: 4,
    steps: [{direction: 'CCW', sector: 0.25}, {direction: 'CCW', sector: 0.5}, {direction: 'CCW', sector: 0.75}]
}

export type ColorHarmonyRule = typeof COMPLEMENTARY | typeof TRIADS | typeof SQUARE

class RgbColorWheel {

    // TechDebt: This might be confusing for some. 
    // By pure colors i mean the ones that are mixed from combinations of max or zero value channels
    // i.e. pure red = (255 0 0), pure yellow = (255 255 0), etc.
    private numberOfPureColors: number = 6;
    private maxValue: number = 255;
    private wheelLengthInPoints: number = this.numberOfPureColors * this.maxValue;

    constructor(){}

    public generateHarmony(sourceColor: Rgb, rule: HarmonyRule): Array<Rgb> {
        let colors: Rgb[] = [sourceColor]
        let stepLength: number

        for (const step of rule.steps) {
            // TechDebt: This is too inaccurate, replace ASAP
            stepLength = Math.round(this.wheelLengthInPoints * step.sector)
            if (step.direction == "CCW") {
                colors.push(this.getNextPositionCcw(sourceColor, stepLength))
            } else {
                throw new Error("Clockwise color wheel search/traverse is not implemented yet!")
            } 
            
        }

        return colors
    }

    // TechDebt: Create tests for this method
    // TechDebt: Implement clockwise variant
    public getNextPositionCcw(startPos: Rgb, stepLength: number): Rgb {
        let currentPosition: Rgb = _.cloneDeep(startPos)
        let remainder: number = stepLength
        
        // If stepLength equals wheelLength times X, just return current position
        if (stepLength >= this.wheelLengthInPoints && stepLength % this.wheelLengthInPoints == 0) {
            return currentPosition
        }

        while (remainder > 0) {
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
                        })
                    } else {
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r - remainder,
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
                                g: this.maxValue,
                            })
                    } else {
                        Object.assign(currentPosition,
                            {
                                g: currentPosition.g + remainder,
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
                                b: this.maxValue
                            })
                    } else {
                        Object.assign(currentPosition,
                            {
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
                            g: 0,
                        })
                    } else {
                        Object.assign(currentPosition,
                            {
                                g: currentPosition.g - remainder,
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
                            })
                    } else {
                        Object.assign(currentPosition,
                            {
                                r: currentPosition.r + remainder,
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
                            b: 0
                        })
                    } else {
                        Object.assign(currentPosition,
                            {
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

// REMOVE TEST SNIPPET AFTER FIXING RGB-TO-HEX
const test = new RgbColorWheel()
const sourceColor = new HexColor("FF002B").rgb
console.log(sourceColor)
const testHarmony = test.generateHarmony(sourceColor, TRIADS).map((element) => {
    return new RgbColor(element.r, element.g, element.b).hex
})
console.log(testHarmony)
