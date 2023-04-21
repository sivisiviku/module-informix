import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as dayjs from "dayjs";
import * as util from "util";

const internal = {
    log: console.log,
    error: console.error,
    info: console.info,
    warn: console.warn,
};

const root = process.cwd();
const logsDir = path.resolve(root, "logs");
try {
    if (!fs.readdirSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
} catch {
    fs.mkdirSync(logsDir);
}

async function writer(type: string, ...log: any[]) {
    const dayjsInstance = dayjs();
    const today = dayjsInstance.format("YYYYMMDD");
    const dateTime = dayjsInstance.format("YYYY-MM-DD HH:mm:ss");
    const logPath = path.resolve(logsDir, `idbe-riskprofile-${today}.log`);
    log.forEach((logToFile) => {
        fs.appendFileSync(
        logPath,
        `[${dateTime}] ` + util.inspect(logToFile, false, 100).replace(/\\n/g, "")
        );
        fs.appendFileSync(
        logPath,
        os.EOL
        );
    });
    internal[type](`[${dateTime}]`, ...log);
}

console.log = (...log: any[]) => {
    writer("log", ...log);
};
console.info = (...log: any[]) => {
    writer("info", ...log);
};
console.error = (...log: any[]) => {
    writer("error", ...log);
};
console.warn = (...log: any[]) => {
    writer("warn", ...log);
};
