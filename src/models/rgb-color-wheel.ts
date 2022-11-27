import { Rgb } from "../dtos/rgb";
import { HexColor } from "./hex-color";
import { RgbColor } from "./rgb-color";

class RgbColorWheel {
    private numberOfColors: number = 7;
    private maxValue: number = 255;
    private wheelLengthInPoints: number = this.numberOfColors * this.maxValue;

    constructor(){}

    public async findPosition(startPos: Rgb, stepLength: number) {
        let remainder: number = stepLength;
        let currentPosition: Rgb = startPos;

        let sanityCheckCounter = 0
        while (remainder > 0) {
            let nextPosition: Rgb | null = this.moveCursorByOnePointCcw(currentPosition)

            sanityCheckCounter += 1

            if (nextPosition) {
                currentPosition = nextPosition
                remainder -= 1
            } else {
                throw new Error(JSON.stringify(
                    {message: "Couldn't find position!",
                    startPosition: startPos,
                    stepLength: stepLength
                }
                ));
                
            }

            if (sanityCheckCounter > stepLength) {
                throw new Error("Find position took way to many attemps, aborting process.")
            }
        }
        return currentPosition
    }

    private moveCursorByOnePointCcw(position: Rgb): Rgb | null {
        if (
            position.r <= this.maxValue &&
            position.g == this.maxValue &&
            position.b == 0
            ) 
            { 
                return {
                    r: position.r - 1,
                    g: position.g,
                    b: position.b
                }
        }

        if (
            position.r == this.maxValue &&
            position.g < this.maxValue &&
            position.b == 0
            )
            {
                return {
                    r: position.r,
                    g: position.g + 1,
                    b: position.b
                }

        }

        if (
            position.r == 0 &&
            position.g == this.maxValue &&
            position.b < this.maxValue
            )
            {
                return {
                    r: position.r,
                    g: position.g,
                    b: position.b + 1
                }

        }

        if (
            position.r == 0 &&
            position.g <= this.maxValue &&
            position.b == this.maxValue
            )
            {
                return {
                    r: position.r,
                    g: position.g - 1,
                    b: position.b
                }

        }

        if (
            position.r <= this.maxValue &&
            position.g == 0 &&
            position.b == this.maxValue
            )
            {
                return {
                    r: position.r + 1,
                    g: position.g,
                    b: position.b
                }

        }

        if (
            position.r == this.maxValue &&
            position.g == 0 &&
            position.b <= this.maxValue
            )
            {
                return {
                    r: position.r,
                    g: position.g,
                    b: position.b - 1
                }

        }

        console.warn(
            JSON.stringify({
                message: "Couldn't move cursor",
                currentPosition: position
            })
        )
        return null
    }
}

const testWheel = new RgbColorWheel()
const sourceColor = new HexColor("FF0000").rgb
console.log(sourceColor)

console.log(testWheel.findPosition(
    sourceColor,
    500
))
