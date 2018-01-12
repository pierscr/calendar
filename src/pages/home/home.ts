import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  currentWeek:any;

  constructor(public navCtrl: NavController) {

  }

  ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.currentWeek=0;
    this.getDaysOfMonth();
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    console.log("firstDayThisMonth:"+firstDayThisMonth);
    var firstDayOfTheWeek = this.currentWeek==0? 0 : (7*this.currentWeek) - firstDayThisMonth;
    if(this.currentWeek==0) {

      var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
      for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
        this.daysInLastMonth.push(i);
      }
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    console.log("thisNumOfDays:"+thisNumOfDays);
    for (var i = firstDayOfTheWeek; (i < thisNumOfDays && i<((this.currentWeek+1)*7)-firstDayThisMonth); i++) {
      this.daysInThisMonth.push(i+1);
    }

    if(this.currentWeek==4)
    {
      var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
      var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
      for (var i = 0; i < (6 - lastDayThisMonth); i++) {
        this.daysInNextMonth.push(i + 1);
      }
      var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
      if (totalDays < 36) {
        for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
          this.daysInNextMonth.push(i);
        }
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }

  swipe(event) {
    console.log("swipe")
    if(event.direction === 2) {
      console.log("destro");
      this.goToNextMonth();
    }
    if(event.direction === 4) {
      console.log("sinistro");
      this.goToLastMonth();
    }
  }


  swipeWeek(event) {
    console.log("swipe")
    if(event.direction === 2) {
      console.log("destro");
      this.currentWeek++;
      this.getDaysOfMonth();
    }
    if(event.direction === 4) {
      console.log("sinistro");
      this.currentWeek--;
      this.getDaysOfMonth();
    }
  }

}
