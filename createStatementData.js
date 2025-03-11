export function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance(aPerformance){
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }
    
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
    
    function amountFor(aPerformance){
        return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
    }
    
    function volumeCreditsFor(aPerformance) {
        return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumeCredits;
    }
    
    function totalVolumeCredits(data) {
        let result = 0;
        for (let perf of data.performances) {
            result += perf.volumeCredits;
        }
        return result;
    }
    function totalAmount(data) {
        let result = 0;
        for (let perf of data.performances) {
            result += perf.amount;
        }
        return result;
    }
}

function createPerformanceCalculator(aPerformance, aPlay){
    return new PerformanceCalculator(aPerformance, aPlay);
}


class PerformanceCalculator{
    constructor(aPerformance, aPlay){
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        let result = 0;
        switch (this.play.type) {
            case "tragedy":
                result = 40000;
                if (this.performance.audience > 30) {
                    result += 1000 * (this.performance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                break;
                defualt: throw new Error(`unknown type: ${this.play.type}`);
        }
        return result;
    }

    get volumeCredits() {
        let result = 0;
        result += Math.max(this.performance.audience - 30, 0);
        if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
        return result;
    }
}

class TragedyCalculator extends PerformanceCalculator{

}
class ComdeyCalculator extends PerformanceCalculator{
    
}

