const crypto = require("crypto");

class MoveRules {
  constructor(moves) {
    this.moves = moves;
  }

  determineWinner(userMove, computerMove) {
    if (userMove === computerMove) {
      return "Draw";
    }
    const movesCount = this.moves.length;
    const halfMoves = Math.floor(movesCount / 2);
    const userMoveIdx = this.moves.indexOf(userMove);
    const computerMoveIdx = this.moves.indexOf(computerMove);

    if (
      (computerMoveIdx - userMoveIdx + movesCount) % movesCount <=
      halfMoves
    ) {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  }
}

class HMACGenerator {
  constructor(key) {
    this.key = key;
  }

  generateHMAC(move) {
    const hmacHash = crypto.createHmac("sha256", this.key);
    hmacHash.update(move);
    return hmacHash.digest("hex").toUpperCase();
  }
}

class KeyGenerator {
  static generateKey(bits = 256) {
    return crypto.randomBytes(bits / 8);
  }
}

class TableGenerator {
  constructor(moves) {
    this.moves = moves;
    this.table = [];
    this.generateTable();
  }

  generateTable() {
    const headerRow = ["", ...this.moves];
    this.table.push(headerRow);

    for (const move of this.moves) {
      const row = [move];
      for (const otherMove of this.moves) {
        const result = new MoveRules(this.moves).determineWinner(
          move,
          otherMove
        );
        row.push(result);
      }
      this.table.push(row);
    }
  }

  getTableString() {
    const maxLength = Math.max(...this.moves.map((move) => move.length)) + 2;
    let tableString = "";
    const divider =
      "+".padEnd(maxLength + 2, "-").repeat(this.moves.length + 1) + "+\n";

    tableString += divider;
    for (let i = 0; i < this.table.length; i++) {
      const row = this.table[i];
      const cells = row.map((cell) => cell.padEnd(maxLength, " "));
      tableString += `| ${cells.join("|")}|\n`;

      if (i === 0) {
        tableString += divider;
      }
    }
    tableString += divider;

    return tableString;
  }

  printTable() {
    console.log(this.getTableString());
  }
}

class RockPaperScissorsGame {
  constructor(moves) {
    this.moves = moves;
    this.key = KeyGenerator.generateKey();
    this.hmacGenerator = new HMACGenerator(this.key);
    this.tableGenerator = new TableGenerator(moves);
  }

  displayHelp() {
    this.tableGenerator.printTable();
  }

  playGame(userMove) {
    if (userMove === "0") {
      console.log("Exiting the game...");
      return;
    }

    if (userMove === "?") {
      this.displayHelp();
      return;
    }

    const moveIndex = parseInt(userMove, 10);
    if (isNaN(moveIndex) || moveIndex < 1 || moveIndex > this.moves.length) {
      console.log(
        "Invalid input. Please enter a valid move number or type ? for help."
      );
      return;
    }

    const userMoveName = this.moves[moveIndex - 1];
    const computerMove =
      this.moves[Math.floor(Math.random() * this.moves.length)]; // Random computer move

    console.log(`Your move: ${userMoveName}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(this.determineWinner(userMoveName, computerMove));
    console.log(`HMAC key: ${this.key.toString("hex").toUpperCase()}`);
  }

  determineWinner(userMove, computerMove) {
    const result = new MoveRules(this.moves).determineWinner(
      userMove,
      computerMove
    );
    if (result === "You win!") {
      return "You win!";
    } else if (result === "Computer wins!") {
      return "Computer wins!";
    } else {
      return "It's a draw!";
    }
  }
}

function main() {
  const moves = process.argv.slice(2);
  if (
    moves.length < 3 ||
    moves.length % 2 === 0 ||
    new Set(moves).size !== moves.length
  ) {
    console.log(
      "Error: You must pass an odd number of non-repeating strings (>=3) as command-line arguments."
    );
    console.log("Example: node script.js rock Spock paper lizard scissors");
    return;
  }

  const game = new RockPaperScissorsGame(moves);
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("HMAC:", game.hmacGenerator.generateHMAC("?"));
  console.log("Available moves:");
  moves.forEach((move, index) => {
    console.log(`${index + 1} - ${move}`);
  });
  console.log("0 - exit");
  console.log("? - help");

  readline.question("Enter your move: ", (userMove) => {
    game.playGame(userMove);
    readline.close();
  });
}

main();
