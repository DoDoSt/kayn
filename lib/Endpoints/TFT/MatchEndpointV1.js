import Endpoint from 'Endpoint'
import Request from 'RequestClient/Request'
import METHOD_NAMES from 'Enums/method-names'
import routings from 'Enums/routings'
import games from 'Enums/games'

class MatchEndpointV1 extends Endpoint {
    constructor(config, limiter) {
        super()

        this.config = config

        this.get = this.get.bind(this)

        this.by = {
            puuid: this.puuid.bind(this)
        }
        
        this.serviceName = 'match'

        this.limiter = limiter
    }

    /**
     * Get match by match ID.
     *
     * Implements GET `/tft/match/v1/matches/{matchId}`.
     *
     * @param {number} matchID - The ID of the match.
     */
    get(matchID) {
        return new Request(
            this.config,
            this.serviceName,
            `matches/${matchID}`,
            METHOD_NAMES.MATCH.GET_MATCH_V4,
            'GET',
            this.limiter,
            null,
            1,
            routings.REGION,
            games.TFT,
        )
    }

    /**
     * Get match by match ID.
     *
     * Implements GET `/tft/match/v1/matches/by-puuid/{encryptedPUUID}/ids`.
     *
     * @param {number} matchID - The ID of the match.
     */
    puuid(puuid) {
        return new Request(
            this.config,
            this.serviceName,
            `matches/by-puuid/${puuid}/ids`,
            METHOD_NAMES.MATCH.GET_MATCH_V4,
            'GET',
            this.limiter,
            null,
            1,
            routings.REGION,
            games.TFT,
        )
    }
}

export default MatchEndpointV1
