import { SfdxCommandBuilder } from '@salesforce/salesforcedx-utils-vscode';
import { ConflictDetectionMessages } from '../commands/util';

const messagesByLogName: Map<string, ConflictDetectionMessages> = new Map();
const warningMessageKey = 'conflict_detect_conflicts_during_deploy';

messagesByLogName.set('force_source_deploy_with_sourcepath_beta', {
  warningMessageKey,
  commandHint: inputs => {
    const commands: string[] = [];
    (inputs as string[]).forEach(input => {
      commands.push(
        new SfdxCommandBuilder()
          .withArg('force:source:deploy')
          .withFlag('--sourcepath', input)
          .build()
          .toString()
      );
    });
    const hints = commands.join('\n  ');

    return hints;
  }
});

messagesByLogName.set('force_source_deploy_with_manifest_beta', {
  warningMessageKey,
  commandHint: input => {
    return new SfdxCommandBuilder()
      .withArg('force:source:deploy')
      .withFlag('--manifest', input as string)
      .build()
      .toString();
  }
});

export function getConflictMessagesFor(
  logName: string
): ConflictDetectionMessages | undefined {
  const conflictMessages = messagesByLogName.get(logName);
  if (!conflictMessages) {
    console.warn(`No conflict messages found for ${logName}`);
  }
  return conflictMessages;
}