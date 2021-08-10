const query = require('./querybuilder')

const deviationLimit = 10;
const value = Number(query.value)
const setpoint = Number (query.setpoint)

//Check if input is plus/minus x percent from setpoint
const setpointDeviation = value / setpoint
const xFromSetpoint = deviationLimit/10
const lowerLimit = 1 - xFromSetpoint
const upperLimit = 1 + xFromSetpoint
const roundUp = Math.ceil(setpointDeviation*100)/100
const roundDown = Math.floor(setpointDeviation*100)/100
console.log(setpointDeviation)
console.log(roundUp, roundDown)

if (roundDown > upperLimit || roundUp < lowerLimit ){
    console.log('issue')
}


//Check if anologue point is at 0% or 100%

if(query.anologue === '0' || '100' ) {
    console.log('issue')
};
