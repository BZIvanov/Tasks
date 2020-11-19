const validCommands = [
  '^I \\d{1,3} \\d{1,3}$',
  '^C$',
  '^L \\d{1,3} \\d{1,3} [A-Z]$',
  '^V \\d{1,3} \\d{1,3} \\d{1,3} [A-Z]$',
  '^H \\d{1,3} \\d{1,3} \\d{1,3} [A-Z]$',
  '^F \\d{1,3} \\d{1,3} [A-Z]$',
  '^S$',
  '^X$',
];

function validateUserInput(userInput) {
  for (const valid of validCommands) {
    const regex = new RegExp(valid);
    if (regex.test(userInput)) {
      return true;
    }
  }
  return false;
}
