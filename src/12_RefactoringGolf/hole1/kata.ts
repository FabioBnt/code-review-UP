/* eslint-disable */

const FIRST_ROW = 0;
const SECOND_ROW = 1;
const THIRD_ROW = 2;
const FIRST_COLUMN = 0;
const SECOND_COLUMN = 1;
const THIRD_COLUMN = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
  private symbolOfLastPlayer = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this.symbolOfLastPlayer == emptyPlay) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this.symbolOfLastPlayer) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.getTileAt(x, y).isNotEmpty) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this.symbolOfLastPlayer = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.addTileAt(player, x, y);
  }

  public getWinner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private symbol: string = ' ';

  constructor(x: number, y: number, symbol: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
  }

  get Symbol() {
    return this.symbol;
  }

  get isNotEmpty() {
    return this.Symbol !== emptyPlay;
  }

  hasSameSymbolAs(other: Tile) {
    return this.Symbol === other.Symbol;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updateSymbol(newSymbol: string) {
    this.symbol = newSymbol;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = FIRST_ROW; x <= THIRD_ROW; x++) {
      for (let y = FIRST_COLUMN; y <= THIRD_COLUMN; y++) {
        this._plays.push(new Tile(x, y, emptyPlay));
      }
    }
  }

  public getTileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, emptyPlay)))!;
  }

  public addTileAt(symbol: string, x: number, y: number): void {
    this._plays
      .find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, symbol)))!
      .updateSymbol(symbol);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(FIRST_ROW) && this.isRowFullWithSameSymbol(FIRST_ROW)) {
      return this.getTileAt(FIRST_ROW, FIRST_COLUMN)!.Symbol;
    }

    if (this.isRowFull(SECOND_ROW) && this.isRowFullWithSameSymbol(SECOND_ROW)) {
      return this.getTileAt(SECOND_ROW, FIRST_COLUMN)!.Symbol;
    }

    if (this.isRowFull(THIRD_ROW) && this.isRowFullWithSameSymbol(THIRD_ROW)) {
      return this.getTileAt(THIRD_ROW, FIRST_COLUMN)!.Symbol;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      this.getTileAt(row, FIRST_COLUMN)!.isNotEmpty &&
      this.getTileAt(row, SECOND_COLUMN)!.isNotEmpty &&
      this.getTileAt(row, THIRD_COLUMN)!.isNotEmpty
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.getTileAt(row, FIRST_COLUMN)!.hasSameSymbolAs(this.getTileAt(row, SECOND_COLUMN)!) &&
      this.getTileAt(row, THIRD_COLUMN)!.hasSameSymbolAs(this.getTileAt(row, SECOND_COLUMN)!)
    );
  }
}
