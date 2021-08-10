
function anayltics(res){

    const deviationLimit = 10;
const value = Number(res.value)
const setpoint = Number(res.setpoint)

//Check if input is plus/minus x percent from setpoint
const setpointDeviation = value / setpoint
const xFromSetpoint = deviationLimit/100
const lowerLimit = 1 - xFromSetpoint
const upperLimit = 1 + xFromSetpoint
let tempIssue = false
let analogueissue = false



if (setpointDeviation > upperLimit || setpointDeviation < lowerLimit ){
    tempIssue = true
    return tempIssue
}


//Check if anologue point is at 0% or 100%

if(res.analogue === '0' || '100' ) {
    analogueissue = true
    return analogueissue
    
};}

module.export = { anayltics }