import LeagueSuperclass from './LeagueSuperclass'
import Request from 'RequestClient/Request'
import METHOD_NAMES from 'Enums/method-names'
import routings from 'Enums/routings'
import games from 'Enums/games'

class LeagueEndpointV1 extends LeagueSuperclass {
    constructor(config, limiter) {
        super()

        this.config = config

        this.by = {
            uuid: this.uuid.bind(this),
        }

        this.limiter = limiter
    }

    /**
     * Get league with given ID, including inactive entries.
     *
     * Implements GET `/lol/league/v4/leagues/{leagueId}`.
     *
     * @param {string} leagueUUID - The UUID of the league.
     */
    uuid(leagueUUID) {
        return new Request(
            this.config,
            this.serviceName,
            `leagues/${leagueUUID}`,
            METHOD_NAMES.LEAGUE.GET_LEAGUE_BY_ID_V4,
            'GET',
            this.limiter,
            null,
            1,
            routings.PLATFORM,
            games.TFT,
        )
    }
}

export default LeagueEndpointV1
