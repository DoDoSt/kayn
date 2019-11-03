import LeagueSuperclass from './LeagueSuperclass'
import Request from 'RequestClient/Request'
import METHOD_NAMES from 'Enums/method-names'
import routings from 'Enums/routings'
import games from 'Enums/games'

class MasterEndpointV1 extends LeagueSuperclass {
    constructor(config, limiter) {
        super()

        this.config = config

        this.list = this.list.bind(this)

        this.limiter = limiter
    }

    /**
     * Get the challenger league for given queue.
     *
     * Implements GET `/tft/league/v1/master`.
     */
    list() {
        return new Request(
            this.config,
            this.serviceName,
            `master`,
            METHOD_NAMES.LEAGUE.GET_MASTER_LEAGUE_V4,
            'GET',
            this.limiter,
            null,
            1,
            routings.PLATFORM,
            games.TFT,
        )
    }
}

export default MasterEndpointV1
