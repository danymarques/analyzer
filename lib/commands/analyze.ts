import { Argv } from 'yargs';

import { runner } from '../utils/process';
import { createLogger } from '../services/logger.service';
import { runChecksTask } from '../tasks/run-checks.task';
import { projectInfoTask } from '../tasks/project-info.task';
import { retrieveChecksTask } from '../tasks/retrieve-checks.task';
import { saveProjectApiTask } from '../tasks/save-project-api.task';
import { saveProjectJsonTask } from '../tasks/save-project-json.task';
import { retrieveSettingsTask } from '../tasks/retrieve-settings.task';
import { prepareProjectDataTask } from '../tasks/prepare-project-data.task';

const logger = createLogger('ANALYZE');

export const command = 'analyze';

export const aliases = ['$0', 'a'];

export const describe =
  'Analyze project and upload results to Omniboard.dev (and generate local json, optional)';

export const builder = (yargs: Argv) =>
  yargs
    .option('json', {
      type: 'boolean',
      default: false,
      description: 'Store data in local json file',
    })
    .option('json-path', {
      type: 'string',
      default: './dist/omniboard.json',
      description: 'Location of local json file',
    })
    .option('check-pattern', {
      alias: 'cp',
      type: 'string',
      description: 'Only run checks matching provided pattern',
    });

export const handler = async (argv: any) =>
  runner(
    [
      retrieveSettingsTask,
      projectInfoTask,
      retrieveChecksTask,
      runChecksTask,
      prepareProjectDataTask,
      saveProjectJsonTask,
      saveProjectApiTask,
    ],
    argv,
    logger
  );
