/**
 * This file contains the logic of changing odds from one format to another.
 */
let oddsValue;
class OddsConversion {
    /**
     * This function is used convert odds from Decimal to Fractional.
     * @param {any} value
     */
    oddsConversionDecimalToFractional(value) {
        let fractionalVal = ((value - 1) / 1);
        let fractionfixedVal = fractionalVal.toFixed(2);
        let decimalArray = (fractionfixedVal.toString().split("."));
        let leftDecimalPart = decimalArray[0];
        let rightDecimal = decimalArray[1];
        let rightDecimalPart = decimalArray[1].length;
        let denominator = "1";
        for (let i = 0; i < decimalArray[1].length; i++) {
            denominator += "0";
        }
        let numerator = leftDecimalPart + rightDecimal;
        let denPower = (Math.pow(10, decimalArray[1].length));
        let result = numerator + "/" + denPower;
        return this.reduce(numerator, denPower);
    }
    reduce(numerator, denPower) {
        var gcd = function gcd(a, b) {
            return b ? gcd(b, a % b) : a;
        };
        gcd = gcd(numerator, denPower);
        let numeratorVal = numerator / gcd;
        let denominatorVal = denPower / gcd;
        let simplifiedVal = numeratorVal + "/" + denominatorVal;
        oddsValue = simplifiedVal;
        return oddsValue;
    }
    /**
     * This function is used convert odds from Decimal to American.
     * @param {any} value
     */
    oddsConversionDecimalToAmerican(value) {
        if (value >= 2.00) {
            let sign = '+'
            let odds = (value - 1) * 100;
            let oddsVal = odds.toFixed(2);
            oddsValue = sign.concat(oddsVal);
        } else {
            let odds = (-100) / (value - 1);
            let oddsVal = odds.toFixed(2);
            oddsValue = oddsVal;
        }
        return oddsValue;
    }
    /**
     * This function is used convert odds from Decimal to Hongkong.
     * @param {any} value
     */
    oddsConversionDecimalToHongKong(value) {
        oddsValue = value - 1;
        return oddsValue.toFixed(2);
    }
    /**
     * This function is used convert odds from Decimal to Indonesian.
     * @param {any} value
     */
    oddsConversionDecimalToIndonesian(value) {
        if (value >= 1.00 && value < 2.00) {            
            oddsValue = -1 / (value - 1);            
        } else {
            oddsValue = value - 1;
        }
        return oddsValue.toFixed(2);
    }
    /**
     * This function is used convert odds from Decimal to Malay.
     * @param {any} value
     */
    oddsConversionDecimalToMalay(value) {
        if (value >= 1.00 && value <= 2.00) {
            oddsValue = value - 1;
        } else {
            oddsValue = -1 / (value - 1);
        }
        return oddsValue.toFixed(2);
    }
}
export default new OddsConversion();