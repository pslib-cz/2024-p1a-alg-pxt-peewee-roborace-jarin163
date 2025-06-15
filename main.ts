radio.setGroup(23)

let trim = 0
let mode = "manual"

basic.forever(function () {
    if (mode == "manual") {
        let x = input.acceleration(Dimension.X)
        let y = input.acceleration(Dimension.Y)
        radio.sendString(`${x},${y}`)
    }
    basic.pause(50)
})

input.onButtonPressed(Button.AB, function () {
    if (mode == "manual") {
        mode = "auto"
        radio.sendValue("mode", 1)
    } else {
        mode = "manual"
        radio.sendValue("mode", 0)
    }
})

input.onButtonPressed(Button.A, function () {
    trim -= 5
    radio.sendValue("trim", trim)
    basic.showNumber(trim)
})

input.onButtonPressed(Button.B, function () {
    trim += 5
    radio.sendValue("trim", trim)
    basic.showNumber(trim)
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    trim = 0
    radio.sendValue("trim", trim)
    basic.showNumber(trim)
})
