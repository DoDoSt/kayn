import DateTimeHelper from './DateTimeHelper'

const createRequestURL = (
    routing,
    serviceName,
    endpoint,
    version,
    game,
    apiURLPrefix,
) => {
    const prefix = apiURLPrefix.replace(/%s/, routing)
    return `${prefix}/${game}/${serviceName}/v${version}/${endpoint}`
}

const getURLWithKey = (
    routing,
    serviceName,
    endpoint,
    key,
    version,
    game,
    apiURLPrefix,
) => {
    const requestURL = createRequestURL(
        routing,
        serviceName,
        endpoint,
        version,
        game,
        apiURLPrefix,
    )
    return requestURL + getAPIKey(requestURL, key)
}

const getAPIKey = (url, key) =>
    `${url.lastIndexOf('?') === -1 ? '?' : '&'}api_key=${key ? key : ''}`

const appendKey = (str, key, value) =>
    str + (str ? '&' : '') + `${key}=${value}`

const arrayToOptions = array =>
    array.reduce((final, curr) => ({ ...final, ...curr }), {})

const stringifyOptions = options => {
    let stringifiedOpts = ''

    for (const key of Object.keys(options)) {
        if (Array.isArray(options[key])) {
            for (const value of options[key]) {
                stringifiedOpts = appendKey(stringifiedOpts, key, value)
            }
        } else {
            if (DateTimeHelper.checkIfDateParam(key)) {
                options[key] = DateTimeHelper.getEpoch(options[key])
            }
            stringifiedOpts = appendKey(stringifiedOpts, key, options[key])
        }
    }

    return stringifiedOpts
}

const getQueryParamString = arrayOfOpts => {
    const str = stringifyOptions(arrayToOptions(arrayOfOpts))
    return str ? `?${encodeURI(str)}` : ''
}

const getURLWithQuery = (
    routing,
    serviceName,
    endpoint,
    queryArray,
    version,
    game,
    apiURLPrefix,
) =>
    createRequestURL(
        routing,
        serviceName,
        endpoint,
        version,
        game,
        apiURLPrefix,
    ) + getQueryParamString(queryArray)

export default {
    createRequestURL,
    getAPIKey,
    getQueryParamString,
    getURLWithKey,
    getURLWithQuery,
    stringifyOptions,
}
