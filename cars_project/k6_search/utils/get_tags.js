
export function getPhase(elapsedSec, { warmupSec, steadySec, cooldownSec }) {

    //console.log(`${elapsedSec} ${warmupSec} ${steadySec} ${cooldownSec} `);

    if (elapsedSec < warmupSec) return 'warmup';
    if (elapsedSec < warmupSec + steadySec) return 'steady';
    if (elapsedSec < warmupSec + steadySec + cooldownSec) return 'cooldown';

    return 'after';
}
