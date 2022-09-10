const al = require("@dumpy/andylib")
var time = new al.time()
var axios = require("axios")
test("until", () => {
    var expected = time.until(14,10,2022)
    axios.get("http://localhost:4200/v1/all/14/10/2022").then((res) => {
        expect(res.data).toEqual(expected)
    })
})

test("yearsUntil", () => {
    var expected = time.yearsUntil(14,10,2022)
    axios.get("http://localhost:4200/v1/yearsuntil/14/10/2022").then((res) => {
        expect(res.data.years).toEqual(expected)
    })
})

test("monthsUntil", () => {
    var expected = time.monthsUntil(14,10,2022)
    axios.get("http://localhost:4200/v1/monthsuntil/14/10/2022").then((res) => {
        expect(res.data.months).toEqual(expected)
    })
})

test("daysUntil", () => {
    var expected = time.daysUntil(14,10,2022)
    axios.get("http://localhost:4200/v1/daysuntil/14/10/2022").then((res) => {
        expect(res.data.days).toEqual(expected)
    })
})

test("hoursUntil", () => {
    var expected = time.hoursUntil(14,10,2022)
    axios.get("http://localhost:4200/v1/hoursuntil/14/10/2022").then((res) => {
        expect(res.data.hours).toEqual(expected)
    })
})

test("minutesUntil", () => {
    var expected = time.minutesUntil(14,10,2022)
    axios.get("http://localhost:4200/v1/minutesuntil/14/10/2022").then((res) => {
        expect(res.data.minutes).toEqual(expected)
    })
})

test("secondsUntil", () => {
    var expected = time.secondsUntil(14,10,2022)
    axios.get("http://localhost:4200/v1/secondsuntil/14/10/2022").then((res) => {
        expect(res.data.seconds).toEqual(expected)
    })
})