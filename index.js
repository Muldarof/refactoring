import { statement } from "./invoice.js";
var invoices = [
    {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }
        ]
    }
]
var plays = {
    "hamlet": {
        "name": "Hamlet",
        "type": "tragedy"
    },
    "as-like": {
        "name": "As You Like It",
        "type": "comedy"
    },
    "othello": {
        "name": "Othello",
        "type": "tragedy"
    }
}
//console.log(`Invoices: ${invoices[0].performances}`)
//console.log(statement(invoices[0], plays))
function main(invoices, plays){
    for(let invoice of invoices){
        let expectedOutput = `Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 40 credits\n`
        let statementOutput = statement(invoice, plays)
        console.log(`Expected Output:\n=============================\n${expectedOutput}\n`)
        console.log(`Actual Output:\n=============================\n${statementOutput}`)
        let comparison = expectedOutput === statementOutput
        console.log(`${comparison}`)
    }
}

main(invoices, plays)