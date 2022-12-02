import { Component, OnInit } from '@angular/core';
import { CalculatorService } from './calculator.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit  {

  input!: string;
  output!: number;
  error!: string;

  constructor(public calc: CalculatorService) { }

  clear(): void {
    this.calculate(localStorage.getItem('input') || "");
  }

  
  addString(num: string): void {
    this.calculate(this.input + num);
  }

  backspace(): void {
    this.calculate(this.input.slice(0, -1));
  }

  ngOnInit(): void {  
    this.clear();
  }


  process(): void {
    this.calculate(this.input);
  }

  calculate(input: string): void {
    try {
      this.input = input;
      this.output =  this.calc.calculate(input);
      this.error = "";
      localStorage.setItem('input', input); 
    } catch (e) {
      this.error = (e as Error).message;
      this.output =  0;
    }
  }
}
