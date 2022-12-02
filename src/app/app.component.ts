import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calulator';
  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {

    this.titleService.setTitle('This is a calculator');
    this.metaService.addTags([
      { name: 'keywords', content: 'calculator,angular' },
      { name: 'description', content: 'Calculator app is an small miniproject for angular' },
      { name: 'writer', content: 'Umang Shrestha' },
      { charset: 'UTF-8' }  

    ]);


  }
}
