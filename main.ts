
type IRC = {
    l: DigitalPin,
    r: DigitalPin,
    c: DigitalPin
}
const IR: IRC = {
    l: DigitalPin.P14,
    r: DigitalPin.P13,
    c: DigitalPin.P15,
}

pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.r, PinPullMode.PullNone);

basic.forever(function () {
    let left = pins.digitalReadPin(IR.l)
    let right = pins.digitalReadPin(IR.r)
    let center = pins.digitalReadPin(IR.c)
})

function forward() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 175)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, 175)
}
function left() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 175)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, 125)
}
function right() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 125)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, 175)
}
function stop() {
    PCAmotor.MotorStopAll()
}

basic.forever(function () {
    let dataL = pins.digitalReadPin(IR.l)
    let dataR = pins.digitalReadPin(IR.r)
    let dataC = pins.digitalReadPin(IR.c)


    if (dataC === 0 && dataL === 1 && dataR === 1) {
        forward()
    } else if (dataL === 0) {
        left()
    } else if (dataR === 0) {
        right()
    } else {
        stop()
    }


    input.onButtonPressed(Button.AB, function () {
        basic.showNumber(dataC)
    })

    input.onButtonPressed(Button.A, function () {
        basic.showNumber(dataR)
    })

    input.onButtonPressed(Button.B, function () {
        basic.showNumber(dataL)
    })

    basic.pause(20)
})