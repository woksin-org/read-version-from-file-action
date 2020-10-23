// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as core from '@actions/core';
import { Logger } from '@dolittle/github-actions.shared.logging';
import { getInput } from '../node_modules/@actions/core/lib/core';

import * as fs from 'fs';

const logger = new Logger();

run();
export async function run() {
    try {
        const path = getInput('path', { required: true });

        if (fs.existsSync(path)) {
            const content = await fs.promises.readFile(path);
            const versionInfo = JSON.parse(content.toString());
            core.setOutput('current-version', versionInfo.version);
        } else {
            core.setOutput('current-version', '1.0.0');
        }
    } catch (error) {
        fail(error);
    }
}

function fail(error: Error) {
    logger.error(error.message);
    core.setFailed(error.message);
}
