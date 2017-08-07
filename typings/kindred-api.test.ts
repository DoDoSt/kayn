/// <reference path='index.d.ts' />
/// <reference path="./node_modules/@types/node/index.d.ts" />

import * as lolapi from 'kindred-api';
try {
    require('dotenv').config({ path: '../.env' })
} catch (ex) {
    console.log('ignore')
}

const REGIONS = lolapi.REGIONS;
const QUEUE_STRINGS = lolapi.QUEUE_STRINGS;
const key: string = process.env.KEY_TO_RATE_LIMIT ? process.env.KEY_TO_RATE_LIMIT as string : 'dummy'

const k = new lolapi.Kindred({
    key,
    limits: [[20, 1], [100, 120]] as any, // allows automatic retries
    retryOptions: {
        auto: true, // necessary to overwrite automatic retries
        numberOfRetriesBeforeBreak: 3
    },
    debug: true
    // limits: lolapi.LIMITS.PROD
});

function printSummoner(summoner: lolapi.Summoner): void {
    console.log(
        `
            name                : ${summoner.name}
            account id          : ${summoner.accountId}
            id                  : ${summoner.id}
            profile icon id     : ${summoner.profileIconId}
            last revision date  : ${summoner.revisionDate}
        `
    )
}

function printIdsFromChampionMasteries(championMasteries: Array<lolapi.ChampionMastery>): void {
    const championMasteriesIds = championMasteries.map(el => el.championId)
    const concatedIds = championMasteriesIds.reduce((acc, el) => `${acc} ${el}`, '')
    console.log(`champion masteries ids: ${concatedIds}`)
}

function printIdsFromChampions(data: lolapi.Champions): void {
    const championIds = data.champions.map(el => el.id)
    const concatedIds = championIds.reduce((acc, el) => `${acc} ${el}`, '')
    console.log(`champion ids: ${concatedIds}`)
}

function printChampionMastery(championMastery: lolapi.ChampionMastery): void { // purposefully printing less info here
    console.log(
        `
            playerId        : ${championMastery.playerId}
            championLevel   : ${championMastery.championLevel}
            championId      : ${championMastery.championId}

        `
    )
}

k.Summoner.get({ name: "Contractz" }, lolapi.print)
k.Summoner.get({ name: "Contractz" })
    .then(summoner => {
        let contractz = summoner
        printSummoner(contractz)
    })
    .catch(err => console.error(err))

k.Summoner.get({ id: 32932398 }, lolapi.print)
k.Summoner.get({ name: 'Contractz' })
 .then((data) => console.log(data))
 .catch((error) => console.error(error))

k.Summoner.by.name('Contractz', lolapi.print)

;(async () => {
    try {
        const summoner = await k.Summoner.by.name('Contractz')
        printSummoner(summoner)
    } catch (ex) {
        console.error(ex)
    }
})()

;(async () => {
    try {
        printIdsFromChampionMasteries(await k.ChampionMastery.all({ name: 'Contractz' }))
    } catch (ex) {
        console.error(ex)
    }
})()

k.ChampionMastery.all({ name: 'Contractz' })
    .then(data => printIdsFromChampionMasteries(data))
    .catch(err => console.error(err))

// this is ugly since it's two required params, but I wanted to stay consistent when writing the .get functions
k.ChampionMastery.get({ playerId: 32932398, championId: 79 })
    .then(data => printChampionMastery(data))
    .catch(err => console.error(err))

k.Summoner.by.name('Contractz', 'na')

;(async () => {
    try {
        console.log(`Total score: ${await k.ChampionMastery.totalScore({ name: 'Contractz' })}`)
    } catch (ex) {
        console.error(ex)
    }
})()

;(async () => {
    try {
        const data = await k.Champion.all({}) // hax
        const region = 'kr'
        const options = { freeToPlay: true }
        const dataWithOpts = await k.Champion.all({ region, options })
        printIdsFromChampions(data)
        printIdsFromChampions(dataWithOpts)
    } catch (ex) {
        console.error(ex)
    }
})()

k.Champion.by.id(37, function (err, data) {
    if (err) {
        console.error('err:', err)
    } else {
        console.log(`Champion with id ${data.id} active?: ${data.active}`)
    }
})

;(async () => {
    try {
        const randomChampion = await k.Champion.by.id(37)
        console.log(randomChampion.id)
    } catch (ex) {
        console.error(ex)
    }
})()


;(async () => {
    try {
        const naShardData = await k.Status.get({ region: 'na' })
        const krShardData = await k.Status.get({ region: 'kr' })
        console.log('na:', naShardData)
        console.log('kr:', krShardData)
    } catch (ex) {
        console.error(ex)
    }
})()

;(async () => {
    try {
        const runesResp = await k.Runes.get({ name: 'Contractz' })
        const pages: Array<lolapi.RunePage> = runesResp.pages
        console.log(runesResp)
        // get first page
        if (pages.length > 0) {
            const firstPage: lolapi.RunePage = pages[0]
            console.log('runes of contractz\'s first page', firstPage.slots)
        }
    } catch (ex) {
        console.error('runes pages error:', ex)
    }
})()

k.Runes.by.name('Contractz', function (err, data) {
    if (err) {
        console.log('the error code is:', err)
    } else {
        console.log('is the first page the current page:', data.pages[0].current)
    }
})

k.Masteries.by.name('Contractz', function (err, data) {
    if (err as lolapi.StatusCode) { // just a number
        console.error(err)
    } else {
        console.log('id of first mastery of first page:', data.pages[0].masteries[0].id)
    }
})

k.League.challengers({ queue: 'RANKED_SOLO_5x5' })
    .then(data => {
        console.log('challenger player objects:', data.entries)
    })
    .catch(err => console.error(err))

k.League.challengers({ queue: QUEUE_STRINGS.RANKED_FLEX_SR }, function (err, data) {
    console.log('the name of the league is: ', data.name)
})

k.League.masters({ queue: QUEUE_STRINGS.RANKED_SOLO_5x5 }, function (err, data) {
    console.log('the name of the league is: ', data.name)
})

k.Challenger.list(QUEUE_STRINGS.RANKED_FLEX_SR, REGIONS.BRAZIL, function (err, data) {
    console.log('i used to be in the list all the time')
})

k.League.get({ name: 'Contractz' }, function (err, leagues) {
    console.log('Contractz\'s leagues', leagues)
})

k.League.positions({ name: 'Contractz' }, function (err, positions) {
    const allRanks = positions.map((el) => el.leagueName)
    console.log(allRanks)
})
