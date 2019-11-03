import regions from 'Enums/regions'
import platformIDs from 'Enums/platform-ids'
import regionIDs from 'Enums/region-ids'

const regionIdMapping = {
    BRAZIL: regionIDs.AMERICAS,
    EUROPE: regionIDs.EUROPE,
    EUROPE_WEST: regionIDs.EUROPE,
    KOREA: regionIDs.ASIA,
    LATIN_AMERICA_NORTH: regionIDs.AMERICAS,
    LATIN_AMERICA_SOUTH: regionIDs.AMERICAS,
    NORTH_AMERICA: regionIDs.AMERICAS,
    OCEANIA: regionIDs.AMERICAS,
    RUSSIA: regionIDs.EUROPE,
    TURKEY: regionIDs.EUROPE,
    JAPAN: regionIDs.ASIA,
}

const regionKeys = Object.keys(regions)
const asPlatformID = regionAbbr => platformIDs[regionKeys.find(eq(regionAbbr))]
const asRegionID = regionAbbr => regionIdMapping[regionKeys.find(eq(regionAbbr))]
const isValidRegion = val => regionKeys.some(eq(val))

const RegionHelper = {
    asPlatformID,
    asRegionID,
    isValidRegion,
}

const eq = v => k => regions[k] === v

export default RegionHelper
