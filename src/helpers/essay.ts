import { splitArrayIntoChunks } from './array';
import {
  LINE_LIMIT,
  FULL_WIDTH_SPACE_CHAR,
  alphaNumericRegex,
} from './contsants';

function splitEssayToParagraphs(essay: string): string[] {
  const paragraphs = essay.split('\n').filter((paragraph) => paragraph !== '');
  return paragraphs;
}

function addWhiteSpaceToBeginning(paragraph: string) {
  return ` ${paragraph}`;
}

function properlyFormatParagraphs(paragraphs: string[]): string[] {
  return paragraphs.map((paragraph) => {
    return addWhiteSpaceToBeginning(paragraph.trim());
  });
}

export function fillRemainingSpaces(
  line: string[],
  lineLimit = LINE_LIMIT
): string[] {
  const spaceRemaining = lineLimit - line.length;

  if (!spaceRemaining || spaceRemaining < 0) return line;
  const addedSpace = [...line];
  for (let i = 0; i < spaceRemaining; i++) {
    addedSpace.push(FULL_WIDTH_SPACE_CHAR);
  }
  return addedSpace;
}

function isRomanji(character: string): boolean {
  if (!character) return false;
  return !!character.match(alphaNumericRegex);
}

function handlePunctuationsAndAlphas(
  paragraphs: string[],
  lineLimit: number
): string[][] {
  return paragraphs.map((paragraph) => {
    const charList = paragraph.split('');
    const output: string[] = [];
    for (let i = 0; i < charList.length; i++) {
      const isPunctuation = ['、', '。'].includes(charList[i]);

      const isLastOfLine = i % lineLimit === 0;
      const previousCharacter = output[output.length - 1];
      if (isPunctuation && isLastOfLine) {
        output[output.length - 1] = `${previousCharacter}${charList[i]}`;
        continue;
      }

      const isCurrentCharRomanji = isRomanji(charList[i]);
      const isLastCharRomanji = isRomanji(charList[i - 1]);

      if (
        isCurrentCharRomanji &&
        isLastCharRomanji &&
        previousCharacter.length < 2 // One cell can only have 2 romanji characters
      ) {
        output[output.length - 1] = `${previousCharacter}${charList[i]}`;
        continue;
      }
      output.push(charList[i]);
    }

    return output;
  });
}

export function splitAndFormatEssay(
  essay: string,
  lineLimit = LINE_LIMIT
): string[][] {
  const paragraphs = splitEssayToParagraphs(essay);
  const formattedParagraphs = properlyFormatParagraphs(paragraphs);
  const punctuationsHandled = handlePunctuationsAndAlphas(
    formattedParagraphs,
    lineLimit
  );
  const lines = punctuationsHandled
    .map((paragraph) => splitArrayIntoChunks(paragraph, lineLimit))
    .reduce((result, paragraph) => {
      return [...result, ...paragraph];
    })
    .map((line) => fillRemainingSpaces(line, lineLimit));
  return lines;
}
