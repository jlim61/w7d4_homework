// Get table body and forms from HTML
const myForm = document.querySelector('#racingForm')
const myTableBody = document.querySelector('#racingTableBody')


myForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const raceSeason = document.querySelector('#enterRaceSeason').value
    const raceRound = document.querySelector('#enterRaceRound').value

    const apiUrl = `https://ergast.com/api/f1/${raceSeason}/${raceRound}/driverStandings.json?authuser=0`
    const res = await fetch(apiUrl, {
        method: "GET"
    })
    console.log(apiUrl)

    if (res.ok) {
        const myData = await res.json()
        let raceData = myData.MRData.StandingsTable.StandingsLists[0].DriverStandings
        // console.log(raceData)
        clearTableBody()
        makeAddTableData(raceData)
    } else window.alert('Bad Request')

    


})

// =========================================================================================================================================================
function clearTableBody () {
    // Clear previous/any data in table body
    myTableBody.innerHTML = ''
}

// =========================================================================================================================================================
function makeAddTableData (raceData) {
    const standings = raceData

    for (const raceInfo of standings) {
        console.log(raceInfo)
        const row = document.createElement('tr')

        // get data for the position column
        const positionInfo = document.createElement('td')
        positionInfo.innerHTML = raceInfo.position
        positionInfo.classList.add('tableDataForCSS')
        row.appendChild(positionInfo)

        // get data for the name column
        const nameInfo = document.createElement('td')
        const nameLink = document.createElement('a')
        nameLink.innerHTML = raceInfo.Driver.givenName + ' ' + raceInfo.Driver.familyName
        nameLink.href = raceInfo.Driver.url
        nameLink.target = '_blank'
        nameLink.classList.add('tableDataForCSSWithLink')
        nameInfo.appendChild(nameLink)
        row.appendChild(nameInfo)

        // get data for the nationality column
        const nationalityInfo = document.createElement('td')
        nationalityInfo.innerHTML = raceInfo.Driver.nationality
        nationalityInfo.classList.add('tableDataForCSS')
        row.appendChild(nationalityInfo)

        // get data for the car number column
        const carNumberInfo = document.createElement('td')
        carNumberInfo.innerHTML = raceInfo.Driver.permanentNumber
        carNumberInfo.classList.add('tableDataForCSS')
        row.appendChild(carNumberInfo)

        // get data for the points column
        const sponsorInfo = document.createElement('td')
        const sponserLink = document.createElement('a')
        sponserLink.innerHTML = raceInfo.Constructors[0].name
        sponserLink.href = raceInfo.Constructors[0].url
        sponserLink.target = '_blank'
        sponserLink.classList.add('tableDataForCSSWithLink')
        sponsorInfo.appendChild(sponserLink)
        row.appendChild(sponsorInfo)

        // get data for the points column
        const pointsInfo = document.createElement('td')
        pointsInfo.innerHTML = raceInfo.points
        pointsInfo.classList.add('tableDataForCSS')
        row.appendChild(pointsInfo)


        myTableBody.appendChild(row)
    }
}

// =========================================================================================================================================================
//Testing

async function testFunc (aSeason, aRound) {
    const res = await fetch(`https://ergast.com/api/f1/${aSeason}/${aRound}/driverStandings.json?authuser=0`)
    const dataData = await res.json()
    // console.log(dataData)
    // console.log(dataData.MRData)
    // console.log(dataData.StandingsTable)
    // console.log(dataData.MRData.StandingsTable.StandingsLists)
    // console.log(dataData.MRData.StandingsTable.StandingsLists[0])
    console.log(dataData.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    console.log(dataData.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver)
    // console.log(dataData.MRData.StandingsTable.StandingsLists[0].DriverStandings[0])
    // console.log(dataData.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].position)
    // const thingThing = dataData.MRData.StandingsTable.StandingsLists[0].DriverStandings
    // console.log(thingThing)
    // console.log(dataData.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,7))
    // console.log(thingThing)
    // for (const raceInfo of thingThing) {
    //     console.log(raceInfo.position)
    // }
}

testFunc(2020,1)
