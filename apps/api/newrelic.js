'use strict'

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || 'agent-lab-api'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY || '',
  logging: {
    level: process.env.NEW_RELIC_LOG_LEVEL || 'info',
    filepath: 'stdout',
  },
  allow_all_headers: true,
  distributed_tracing: {
    enabled: true,
  },
  application_logging: {
    forwarding: {
      enabled: true,
    },
  },
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
    ],
  },
}
