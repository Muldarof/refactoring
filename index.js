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
        console.log(`${statement(invoice, plays)}`)
    }
}

main(invoices, plays)