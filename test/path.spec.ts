import test from 'ava';
import { isSubdir } from '@lib/path';

[
    ['a', 'a/b', true],
    ['/a', '/a/b', true],
    ['a/b', 'x/y', false],
    ['/a/b', '/x/y', false],
    ['', '', false],
    ['/a', '/a/', false],

    ...(process.platform === 'win32' ? [
        ['C:\\a', 'C:\\a\\b', true],
        ['C:\\a', 'C:\\a\\b\\', true],
        ['C:\\a\\', 'C:\\a\\b', true],
        ['C:\\a\\', 'C:\\a\\b\\', true],
        ['C:\\a', 'C:\\\\\\a\\\\\\\\\\b', true],
        ['C:\\a', 'C:\\a\\.\\b', true],
        ['C:\\a', 'C:\\a\\..\\a\\b', true],
        ['C:\\a', 'C:\\A\\b', true],
        ['\\\\?\\C:\\a', 'C:\\a\\b', true],
        ['C:\\a', '\\\\?\\C:\\a\\b', true],
        ['\\\\?\\C:\\a', '\\\\?\\C:\\a\\b', true],
        ['C:', 'C:\\a', true],
        ['C:\\', 'C:\\a', true],
        ['\\a', '\\a\\b', true],
        ['C:\a\\b', 'C:\\x\\y', false],
        ['C:', 'C:\\', false],
        ['C:\\', 'C:\\', false],
        ['C:\\a', 'C:\\a', false],
        ['C:\\a', 'C:\\b', false],
        ['C:\\a','\\a', false],
    ] : [])
].forEach((args, i) => {
    const [parent, maybeChild, expected] = args as [string, string, boolean];
    test(`isSubdir - ${expected}  '${parent}'  '${maybeChild}'`, t => {
        t.is(isSubdir(parent, maybeChild), expected);
    });
});