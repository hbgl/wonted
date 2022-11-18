import os from 'node:os';
import nodePath from 'node:path';

function normalizeForCmp(path: string) {
    if (os.platform() !== 'win32') {
        return nodePath.normalize(path);
    }

    // Strip long path prefix.
    if (path.startsWith('\\\\?\\')) {
        path = path.slice(4);
    }

    // Add trailing slash to drive letter.
    if (path.length === 2 && path[1] === ':') {
        path = path + '\\';
    }

    path = nodePath.normalize(path);

    // Paths under Windows are assumed to be case-insentitive
    // even though that might not always be true.
    path = path.toUpperCase();

    return path;
}

export function isSubdir(parent: string, maybeChild: string) {
    parent = normalizeForCmp(parent);
    maybeChild = normalizeForCmp(maybeChild);
    return parent.length < maybeChild.length && maybeChild.startsWith(parent);
}