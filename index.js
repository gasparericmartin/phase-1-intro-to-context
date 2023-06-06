function createEmployeeRecord(array) {
    const record = {}
    record.firstName = array[0]
    record.familyName = array[1]
    record.title = array[2]
    record.payPerHour = array[3]
    record.timeInEvents = []
    record.timeOutEvents = []

    return record
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const newObject = {}
    newObject.type = 'TimeIn'
    newObject.hour = parseInt(`${dateStamp[11]}${dateStamp[12]}` + '00')
    newObject.date = dateStamp.slice(0, 10)

    employeeRecord.timeInEvents.push(newObject)
    return employeeRecord 
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const newObject = {}
    newObject.type= 'TimeOut'
    newObject.hour = parseInt(`${dateStamp[11]}${dateStamp[12]}` + '00')
    newObject.date = dateStamp.slice(0, 10)

    employeeRecord.timeOutEvents.push(newObject)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let innie = 0
    let outie = 0

    employeeRecord.timeInEvents.forEach(timeInEvent => {
        if (timeInEvent.date === dateStamp) {
            innie = timeInEvent.hour
        }
    })

    employeeRecord.timeOutEvents.forEach(timeOutEvent => {
        if (timeOutEvent.date === dateStamp) {
            outie = timeOutEvent.hour
        }
    })

    return (outie - innie) * .01
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    const datesArray = []
    let wageCounter = 0
    employeeRecord.timeInEvents.forEach(dates => {
        datesArray.push(dates.date)
    })

    datesArray.forEach(date => wageCounter += wagesEarnedOnDate(employeeRecord, date))
    return wageCounter
    
}

function calculatePayroll(employeeArray) {
    return employeeArray.reduce((m, e) => m + allWagesFor(e), 0)
}