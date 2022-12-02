import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalulatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // parametrized test for calulate function
  [
    { input: '1 + 2', expected: 3 },
    { input: '1 + (2 * 3)', expected: 7 },
    { input: '1 + 2 * 4 / 4', expected: 3 },
    { input: '1 + 2 * 3 + 4 * 5', expected: 31 },
    { input: '(1 + 2) * 3 + (4 * 5) + 6', expected: 51 },
    
  ]
    .forEach(({ input, expected }) => {
      it(`should calculate ${input}`, () => {
        expect(service.calculate(input)).toBe(expected);
      });
    }
    );



});
