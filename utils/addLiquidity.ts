


// function tickToPrice(tick,token0Decimals,token1Decimals){
//     let price0 =  (1.0001**tick)/(10**(token1Decimals-token0Decimals));
//     return 1/price0
// }

// function getToken0Amounts(token1Amount,currentTick,tickLow,tickHigh,decimal0,decimal1){
    
//     let Pa = tickToPrice(tickHigh, decimal0, decimal1);
//     let Pb = tickToPrice(tickLow, decimal0, decimal1);
//     let Price = tickToPrice(currentTick, decimal0, decimal1);
    
//     console.log(Pb)
//     console.log(Price)
//     console.log(Pa)
    
//     let Lx = (token1Amount) * ((Math.sqrt(Price) * Math.sqrt(Pb)) / (Math.sqrt(Pb) - Math.sqrt(Price)))

//     let x = Math.floor(Lx * (Math.sqrt(Price) - Math.sqrt(Pa)))
//         return x;
// }