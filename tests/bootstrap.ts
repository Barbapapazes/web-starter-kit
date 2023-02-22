import { assert } from '@japa/assert'
import type { Config } from '@japa/runner'
import app from '@adonisjs/core/services/app'
import { specReporter } from '@japa/spec-reporter'
import { browserClient } from '@japa/browser-client'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * This file is imported by the "bin/test.ts" entrypoint file
 */

/**
 * Configure Japa plugins in the plugins array.
 * Learn more - https://japa.dev/docs/runner-config#plugins-optional
 */
export const plugins: Config['plugins'] = [assert(), browserClient({}), pluginAdonisJS(app)]

/**
 * Configure Japa reporters to report the tests summary
 * Learn more - https://japa.dev/docs/runner-config#reporters-optional
 */
export const reporters: Config['reporters'] = [specReporter()]

/**
 * Configure lifecycle function to run before and after all the
 * tests.
 *
 * The setup functions are executed before all the tests
 * The teardown functions are executer after all the tests
 */
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [],
  teardown: [],
}

/**
 * Configure suites by tapping into the test suite instance.
 * Learn more - https://japa.dev/docs/test-suites#lifecycle-hooks
 */
export const configureSuite: Config['configureSuite'] = (suite) => {
  if (suite.name === 'browser') {
    return suite.setup(() => testUtils.httpServer().start())
  }
}
