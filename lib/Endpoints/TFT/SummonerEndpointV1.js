import Endpoint from 'Endpoint'
import Request from 'RequestClient/Request'
import METHOD_NAMES from 'Enums/method-names'
import routings from 'Enums/routings'
import games from 'Enums/games'

class SummonerEndpointV1 extends Endpoint {
    constructor(config, limiter) {
        super()

        this.config = config

        this.by = {
            accountID: this.accountID.bind(this),
            name: this.summonerName.bind(this),
            puuid: this.puuid.bind(this),
            id: this.summonerID.bind(this),
        }

        this.serviceName = 'summoner'

        this.limiter = limiter
    }

    /**
     * Get a summoner by account ID.
     *
     * Implements GET `/tft/summoner/v1/summoners/by-account/{encryptedAccountId}`.
     *
     * @param {string} accountID - The account ID of the summoner.
     */
    accountID(accountID) {
        return new Request(
            this.config,
            this.serviceName,
            `summoners/by-account/${accountID}`,
            METHOD_NAMES.SUMMONER.GET_BY_ACCOUNT_ID_V4,
            'GET',
            this.limiter,
            null,
            1,
            routings.PLATFORM,
            games.TFT,
        )
    }

    /**
     * Get a summoner by summoner name.
     *
     * Implements GET `/tft/summoner/v1/summoners/by-name/{summonerName}`.
     *
     * @param {string} summonerName - The name of the summoner.
     */
    summonerName(summonerName) {
        return new Request(
            this.config,
            this.serviceName,
            `summoners/by-name/${encodeURI(summonerName)}`,
            METHOD_NAMES.SUMMONER.GET_BY_SUMMONER_NAME_V4,
            'GET',
            this.limiter,
            null,
            1,
            routings.PLATFORM,
            games.TFT,
        )
    }

    /**
     * Get a summoner by summoner puuid.
     *
     * Implements GET `/tft/summoner/v1/summoners/by-puuid/{encryptedPUUID}`.
     *
     * @param {string} puuid - The puuid of the summoner.
     */
    puuid(puuid) {
        return new Request(
            this.config,
            this.serviceName,
            `summoners/by-puuid/${puuid}`,
            METHOD_NAMES.SUMMONER.GET_BY_PUUID_V4,
            'GET',
            this.limiter,
            null,
            1,
            routings.PLATFORM,
            games.TFT,
        )
    }

    /**
     * Get a summoner by summoner ID.
     *
     * Implements GET `/tft/summoner/v1/summoners/{encryptedSummonerId}`.
     *
     * @param {string} summonerID - The id of the summoner.
     */
    summonerID(summonerID) {
        return new Request(
            this.config,
            this.serviceName,
            `summoners/${summonerID}`,
            METHOD_NAMES.SUMMONER.GET_BY_SUMMONER_ID_V4,
            'GET',
            this.limiter,
            null,
            1,
            routings.PLATFORM,
            games.TFT,
        )
    }
}

export default SummonerEndpointV1
