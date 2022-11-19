import os from 'node:os';
import nodePath from 'node:path';

export function isSubdir(parent: string, maybeChild: string) {
    parent = normalizeForCmp(parent);
    maybeChild = normalizeForCmp(maybeChild);
    return parent.length < maybeChild.length && maybeChild.startsWith(parent);
}

function normalizeForCmp(path: string) {
    if (os.platform() === 'win32') {
        // Strip long path prefix.
        if (path.startsWith('\\\\?\\')) {
            path = path.slice(4);
        }

        // Paths under Windows are assumed to be case-insentitive
        // even though that might not always be true.
        path = path.toUpperCase();
    }

    // Add trailing slash.
    const sep = nodePath.sep;
    if (!path.endsWith(sep)) {
        path = path + sep;
    }

    path = nodePath.normalize(path);

    return path;
}
