import { getGlobal } from './utils';

let dialog:any = null;
const g:any = getGlobal();

function sendToDialog(event:string, data:any) {
  dialog.messageChild(JSON.stringify({ event, data }));
}

function oneDown(adr:string):string {
  const sheet = `${adr.split('!')[0]}!`;
  const x = adr.split('!')[1].split(':')[0];
  const y = adr.split('!')[1].split(':')[1];
  const xn = x.replace(/\d+/g, '') + (Number(x.match(/\d+/)[0]) + 1);
  const yn = y.replace(/\d+/g, '') + (Number(y.match(/\d+/)[0]) + 1);

  return `${sheet + xn}:${yn}`;
}

// function lettersToNumber(letters:string):number {
//   const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   let result = 0;
//   let j = letters.length - 1;

//   for (let i = 0; i < letters.length; i += 1, j -= 1) {
//     result += (base.length ** j) * (base.indexOf(letters[i]) + 1);
//   }

//   return result;
// }

// function numberToLetters(index:number):string { // eslint-disable-line
//   let dividend = index;
//   let name = '';
//   let modulo;
//   while (dividend > 0) {
//     modulo = (dividend - 1) % 26;
//     name = String.fromCharCode(65 + modulo) + name;
//     dividend = Math.round((dividend - modulo) / 26);
//   }
//   return name;
// }

// function getRange(str:string):string[] {
//   return str.split('!')[1].split(':');
// }

// function getNumbers(str:string):number {
//   return Number(str.replace(/[^0-9]/g, ''));
// }

// function getText(str:string):string {
//   return str.replace(/[0-9]/g, '');
// }

// function isUnboundedRange(range:any):boolean {
//   if (Number(range[0]) && Number(range[1])) {
//     return true;
//   } if (getText(range.join('')) === range.join('')) {
//     return true;
//   }

//   return false;
// }

// function isUnboundedRangeRowOrCol(range:any):string {
//   if (Number(range[0]) && Number(range[1])) {
//     return 'row';
//   }
//   return 'col';
// }

// function getBounds(range:any):any[] { // eslint-disable-line
//   const bounds:any[] = [null, null, null, null]; // minLetter, minNumber, maxLetter, maxNumber

//   if (isUnboundedRange(range)) {
//     const type = isUnboundedRangeRowOrCol(range);
//     if (type === 'row') {
//       bounds[1] = getNumbers(range[0]);
//       bounds[3] = getNumbers(range[1]);
//     } else {
//       bounds[0] = lettersToNumber(getText(range[0]));
//       bounds[2] = lettersToNumber(getText(range[1]));
//     }
//   } else {
//     bounds[0] = lettersToNumber(getText(range[0]));
//     bounds[1] = getNumbers(range[0]);
//     bounds[2] = lettersToNumber(getText(range[1]));
//     bounds[3] = getNumbers(range[1]);
//   }

//   return bounds;
// }

// function isWithinRangeOld(str:string, targetStr:string):boolean { // eslint-disable-line
//   const targetRange = getRange(targetStr);
//   const min = targetRange[0];
//   const max = targetRange[1];

//   const selectedRange = getRange(str);

//   const minLetter = lettersToNumber(getText(min));
//   const minNumber = getNumbers(min);
//   const maxLetter = lettersToNumber(getText(max));
//   const maxNumber = getNumbers(max);

//   if (isUnboundedRange(selectedRange)) {
//     const type = isUnboundedRangeRowOrCol(selectedRange);
//     if (type === 'row') {
//       if ((getNumbers(selectedRange[0]) >= minNumber) && (getNumbers(selectedRange[1]) <= maxNumber)) {
//         return true;
//       }
//       return false;
//     }
//     if ((lettersToNumber(getText(selectedRange[0])) >= minLetter) && (lettersToNumber(getText(selectedRange[1])) <= maxLetter)) {
//       return true;
//     }
//     return false;
//   }
//   const boundedMin = selectedRange[0];
//   const boundedMax = selectedRange[1];

//   const boundedMinLetter = lettersToNumber(getText(boundedMin));
//   const boundedMinNumber = getNumbers(boundedMin);
//   const boundedMaxLetter = lettersToNumber(getText(boundedMax));
//   const boundedMaxNumber = getNumbers(boundedMax);

//   if (
//     (boundedMinNumber >= minNumber)
//       && (boundedMaxNumber <= maxNumber)
//       && (boundedMinLetter >= minLetter)
//       && (boundedMaxLetter <= maxLetter)) {
//     return true;
//   }

//   return false;
// }

function lettersToNumber(letters:any) {
  const chrs = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const mode = chrs.length - 1;
  let number = 0;
  for (let p = 0; p < letters.length; p += 1) {
    number = number * mode + chrs.indexOf(letters[p]);
  }
  return number;
}

function numberToCol(num:any) {
  let str = '';
  let q;
  let r;
  while (num > 0) {
    q = (num - 1) / 26;
    r = (num - 1) % 26;
    num = Math.floor(q);
    str = String.fromCharCode(65 + r) + str;
  }
  return str;
}

function fitTo(adress, data) {
  const sheet = adress.split('!')[0];
  const adr = adress.split('!')[1];
  const row = Number(adr.replace(/^\D+/g, ''));
  const col = adr.replace(/[^a-zA-Z]/g, '');
  const colNr = lettersToNumber(col);

  return `${sheet}!${adr}:${numberToCol(colNr + data[0].length - 1)}${row + data.length - 1}`;
}

async function handleCoords(coords:any):Promise<boolean> {
  try {
    await Excel.run(async (context) => {
      const range = context.workbook.getSelectedRange();
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      range.values = [[coords.lat, coords.lng]];
      range.load('address');

      await context.sync().then(async () => {
        const downrange = sheet.getRange(oneDown(range.address));
        downrange.select();

        await context.sync();

        return true;
      });
    });
  } catch (err) {
    return false;
  }
  return false;
}

async function handleDataFromMap(data:any):Promise<boolean> {
  try {
    Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const range = context.workbook.getSelectedRange();
      range.load('address');

      await context.sync();

      const newRange = sheet.getRange(fitTo(range.address, data).split('!')[1]);
      newRange.load('values');

      await context.sync();

      const rows = newRange.values.length;
      const cols = newRange.values[0].length;

      let empty = true;
      for (let row = 0; row < rows; row += 1) {
        if (!empty) { break; }
        for (let col = 0; col < cols; col += 1) {
          const val = newRange.values[row][col];
          if (val !== '') { empty = false; break; }
        }
      }

      if (empty) {
        newRange.values = data;
      } else {
        throw new Error('Cells not empty');
      }

      await context.sync();

      return true;
    });
    return true;
  } catch (err) {
    console.error(`Error: ${err}`);
    console.error(`Error stack: ${err.stack}`);
    if (err instanceof OfficeExtension.Error) {
      console.error(`Debug info: ${JSON.stringify(err.debugInfo)}`);
    }
  }
  return false;
}

async function getSelectedCells():Promise<any[][]> {
  try {
    const values = await Excel.run(async (context) => {
      const range = context.workbook.getSelectedRange();
      range.load('values');

      await context.sync();
      return range.values;
    });
    console.log(values);
    return values;
  } catch (err) {
    throw new Error('Invalid selection. No selection?');
  }
}

async function eventDispatcher(event:string, data:any):Promise<void> {
  console.log([event, data]);
  if (event === 'ready') {
    console.log('Map is ready for input');
  } else if (event === 'requestData') {
    const cells = await getSelectedCells();
    sendToDialog('dataFromExcel', cells);
  } else if (event === 'createdMarker') {
    handleCoords(data);
  } else if (event === 'dataFromMap') {
    handleDataFromMap(data);
  } else if (event === 'clearedData') {
    console.log('Map data was cleared.');
  } else {
    console.log('Did not understand event');
  }
}

function onMessageFromDialog(arg:any):void {
  try {
    const messageFromDialog = JSON.parse(arg.message);
    const { event, data } = messageFromDialog;
    eventDispatcher(event, data);
  } catch (err) {
    console.log(err);
  }
}

function onEventFromDialog(arg:any):void {
  switch (arg.error) {
    case 12002:
      console.log('The dialog box has been directed to a page that it cannot find or load, or the URL syntax is invalid.');
      break;
    case 12003:
      console.log('The dialog box has been directed to a URL with the HTTP protocol. HTTPS is required.');
      break;
    case 12006:
      console.log('Dialog closed.');
      break;
    default:
      console.log('Unknown error in dialog box.');
      break;
  }
}

function openDialog(url:string, openEvent:Office.AddinCommands.Event, ask:boolean = true, listen:boolean = false):void {
  Office.context.ui.displayDialogAsync(url, { height: 40, width: 30, promptBeforeOpen: ask }, (asyncResult) => {
    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
      console.log('Failed to open window and attach listeners..');
      console.log(asyncResult);
    }
    if (listen) {
      dialog = asyncResult.value;
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, onMessageFromDialog);
      dialog.addEventHandler(Office.EventType.DialogEventReceived, onEventFromDialog);
    }
    openEvent.completed();
  });
}

const baseUrl = `https://${window.location.hostname}/interface`;

function openDialogNIRAS(openEvent:Office.AddinCommands.Event):void {
  openDialog(`${baseUrl}/niras.html`, openEvent, false);
}

function openDialogOPM(openEvent:Office.AddinCommands.Event):void {
  openDialog(`${baseUrl}/opm.html`, openEvent, false);
}

function openDialogSATF(openEvent:Office.AddinCommands.Event):void {
  openDialog(`${baseUrl}/satf.html`, openEvent, false);
}

function openDialogMAP(openEvent:Office.AddinCommands.Event):void {
  openDialog(`${baseUrl}?page=map`, openEvent, true, true);
}

function openDialogSUPPORT(openEvent:Office.AddinCommands.Event):void {
  openDialog(`${baseUrl}?page=support`, openEvent, false);
}

function openDialogDOCUMENTATION(openEvent:Office.AddinCommands.Event):void {
  openDialog(`${baseUrl}?page=documentation`, openEvent, false);
}

g.openDialogNIRAS = openDialogNIRAS;
g.openDialogOPM = openDialogOPM;
g.openDialogSATF = openDialogSATF;
g.openDialogMAP = openDialogMAP;
g.openDialogSUPPORT = openDialogSUPPORT;
g.openDialogDOCUMENTATION = openDialogDOCUMENTATION;