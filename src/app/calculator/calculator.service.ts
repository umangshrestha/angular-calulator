import { Injectable } from '@angular/core';




const OPERATORS: { [key: string]: (a: number, b: number) => number } = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}


type UnaryExpr = [string, Expr];
type BinaryExpr = [Expr, string, Expr?];
type Expr = number | BinaryExpr | UnaryExpr;



@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  private tokens: string[] = [];

  private tokenize(input: string): string[] {
    return input.replace(/\+/g, ' + ')
      .replace(/\-/g, ' - ')
      .replace(/\//g, ' / ')
      .replace(/\*/g, ' * ')
      .replace(/\(/g, ' ( ')
      .replace(/\)/g, ' ) ')
      .split(' ')
      .filter(token => token !== '');
  }

  private isEof(): boolean {
    return this.tokens.length === 0;
  }

  private match(...ops: string[]): boolean {
    return ops.includes(this.tokens[0]);
  }

  private advance(): string {
    if (this.isEof()) {
      throw new Error('Unexpected end of input');
    }

    return this.tokens.shift()!;
  }


  private parser(): Expr {
    return !this.isEof() ?
      this.term() :
      0;
  }

  private term(): Expr {
    let left = this.factor();
    if (this.match('+', '-')) {
      let op = this.advance();
      let expr = this.factor();
      return [left, op, expr];
    }
    return left;
  }


  private factor(): Expr {
    let left = this.unary();
    if (this.match('*', '/')) {
      let op = this.advance();
      let expr = this.factor();
      return [left, op, expr];
    }
    return left;
  }

  private unary(): Expr {
    if (this.match('+')) {
      this.advance();
      return this.unary();
    }
    if (this.match('-')) {
      this.advance();
      return ["-", this.unary()];
    }
    return this.primary();
  }

  private primary(): Expr {
    if (this.isEof())
      throw new Error('Unexpected end of input');

    else if (this.match('(')) {
      this.advance();
      let expr = this.parser();
      if (!this.match(')'))
        throw new Error('Expected )');
      this.advance();
      return expr;
    }

    else {
      let val = this.advance()
      let num = Number(val);
      if (isNaN(num))
        throw new Error(`Expected number, got \"${val}\"`);

      return num;
    }
  }

  private eval(expr: Expr): number {
    if (typeof expr === 'number')
      return expr;

    if (expr.length === 2) {
      let [op, rightExpr] = expr as UnaryExpr;
      let right = this.eval(rightExpr);
      return OPERATORS[op as string](0, right);

    } else if (expr.length === 3) {

      let [leftExpr, op, rightExpr] = expr;
      let left = this.eval(leftExpr);
      if (rightExpr === undefined)
        throw new Error(`syntax error`);

      let right = this.eval(rightExpr);
      return OPERATORS[op](left, right);
    }
    throw new Error(`syntax error`);
  }

  calculate(input: string): number {
    this.tokens = this.tokenize(input)
    let expr: Expr = this.parser();
    return this.eval(expr);
  }
}
