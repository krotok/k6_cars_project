import { toSec } from "../../utils/time_converting.js";
import { convertToMs } from '../../utils/time_converting.js'

export const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';
export const WARMUP = __ENV.WARMUP || '60s';
export const TEST_DURATION = __ENV.TEST_DURATION || '1m';
export const COOLDOWN = __ENV.COOLDOWN || '10s';

export const WARMUP_SEC = toSec(WARMUP);
export const STEADY_START = WARMUP_SEC
export const TEST_SEC = toSec(TEST_DURATION);
export const STEADY_END = WARMUP_SEC + TEST_SEC;

export const WARMUP_MS = convertToMs(WARMUP)
export const WARMUP_STEADYSTAY_MS = convertToMs(WARMUP) + convertToMs(TEST_DURATION)

export const PHASE_CONFIG = {
    warmupSec: toSec(__ENV.WARMUP || '10s'),
    steadySec: toSec(__ENV.TEST_DURATION || '1m'),
    cooldownSec: toSec(__ENV.COOLDOWN || '10s'),
};

