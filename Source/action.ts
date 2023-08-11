// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as core from '@actions/core';
import { Logger } from '@woksin/github-actions.shared.logging';
import { getInput } from '@actions/core';

import * as fs from 'fs';

const logger = new Logger();

run();

/**
 * Runs the action.
 */
export async function run() {
    try {
        const path = getInput('path', { required: true });
        logger.info(`Reading version from ${path}`);

        if (fs.existsSync(path)) {
            const content = await fs.promises.readFile(path);
            const contentAsString = content.toString();
            logger.info(`Info from file : ${contentAsString}`);
            const versionInfo = JSON.parse(contentAsString);
            logger.info(`Set version number : ${versionInfo.version}`);
            core.setOutput('current-version', versionInfo.version);
        } else {
            core.setOutput('current-version', '1.0.0');
        }
    } catch (error: any) {
        logger.info(`Error ${error}`);
        fail(error);
    }
}

function fail(error: Error) {
    logger.error(error.message);
    core.setFailed(error.message);
}
