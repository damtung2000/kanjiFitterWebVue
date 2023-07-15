import tap from 'tap';
import { splitAndFormatEssay, fillRemainingSpaces } from '../src/helpers/essay';
import { range } from '../src/helpers/array';

tap.test('addRemainingSpaces can add to indicated length', (t) => {
  const LINE_LIMIT = 5;
  const testArray = [];
  for (let i = 0; i < 2; i++) {
    testArray.push(i.toString());
  }

  const expectedArray = ['0', '1', '　', '　', '　'];
  t.same(fillRemainingSpaces(testArray, LINE_LIMIT), expectedArray);
  t.end();
});

tap.test('splitAndFormatEssay works as expected', (t) => {
  const testEssay =
    '大分県奨学金の名誉ある受給者として。\n私は別府とその地域社会の展開に貢献するつもりだ。';
  t.matchSnapshot(splitAndFormatEssay(testEssay));
  t.end();
});

tap.test('Range function should generate range', (t) => {
  const size = 5;
  const startAt = 1;
  const expected = [1, 2, 3, 4, 5];
  t.same(
    range(size, startAt),
    expected,
    `range(${size}, ${startAt}) should return [${expected}]`
  );
  t.end();
});
