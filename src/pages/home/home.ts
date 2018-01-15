import { Component ,ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
//import { createLoop} from 'ionic-angular/components/slides/swiper/swiper';
import { CLS,eachChild,addClass} from 'ionic-angular/components/slides/swiper/swiper-utils';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slider') slider

  cal=new Array();

  date: any;
  daysInThisMonth: any;
  daysInThisMonthpre: any;
  daysInThisMonthpost: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  currentWeek:any;
  day:any;
  days:any;


  constructor(public navCtrl: NavController) {

      this.date = new Date();
      this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      var currentWeek=1;
      var currentMounth=new Date();
      this.currentMonth = this.monthNames[this.date.getMonth()];
      this.cal.push(this.getDaysOfMonth(currentMounth,currentWeek));
      var preViewDate=new Date(this.date.getFullYear(), this.date.getMonth()+1, 0)
      this.cal.push(this.getDaysOfMonth(currentMounth,currentWeek+1));
      var postViewDate=new Date(this.date.getFullYear(), this.date.getMonth()-1, 0)
      this.cal.push(this.getDaysOfMonth(currentMounth,currentWeek-1));

  }

  ionViewWillEnter() {


  }

  /*=========================
    Loop
    ===========================*/
  // Create looped slides
  createLoop(s) {
      // Remove duplicated slides
      eachChild(s._wrapper, '.' + CLS.slide + '.' + CLS.slideDuplicate, function (ele) {
          ele.parentElement.removeChild(ele);
      });
      var slides = s._wrapper.querySelectorAll('.' + CLS.slide);
      if (s.slidesPerView === 'auto' && !s.loopedSlides) {
          s.loopedSlides = slides.length;
      }
      s.loopedSlides = parseInt((s.loopedSlides || s.slidesPerView), 10);
      s.loopedSlides = s.loopedSlides + s.loopAdditionalSlides;
      if (s.loopedSlides > slides.length) {
          s.loopedSlides = slides.length;
      }
      var prependSlides = [];
      var appendSlides = [];
      for (var i = 0; i < slides.length; i++) {
          var slide = slides[i];
          if (i < s.loopedSlides)
              appendSlides.push(slide);
          if (i < slides.length && i >= slides.length - s.loopedSlides)
              prependSlides.push(slide);
          slide.setAttribute('data-swiper-slide-index', i);
      }
      for (i = 0; i < appendSlides.length; i++) {
          var appendClone = appendSlides[i].cloneNode(true);
          addClass(appendClone, CLS.slideDuplicate);
          s._wrapper.appendChild(appendClone);
      }
      for (i = prependSlides.length - 1; i >= 0; i--) {
          var prependClone = prependSlides[i].cloneNode(true);
          addClass(prependClone, CLS.slideDuplicate);
          s._wrapper.insertBefore(prependClone, s._wrapper.firstElementChild);
      }
  }


  getDaysOfMonth(date,currentWeek) {

    var daysInThisMonth = new Array();
    var daysInLastMonth = new Array();
    var daysInNextMonth = new Array();

    if(currentWeek<0){
      date=date.getMonth()==1?new Date(date.getFullYear()-1,12,1):new Date(date.getFullYear(),date.getMonth()-1,1);
      currentWeek=4;
    }
    if(currentWeek>4){
      date=date.getMonth()==12?new Date(date.getFullYear()+1,1,1):new Date(date.getFullYear(),date.getMonth()+1,1);
      currentWeek=0;
    }
    //this.currentYear = date.getFullYear();
    if(date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    //console.log("firstDayThisMonth:"+firstDayThisMonth);
    var firstDayOfTheWeek = currentWeek==0? 0 : (7*currentWeek) - firstDayThisMonth;
    if(currentWeek==0) {

    var prevNumOfDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
      for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
        daysInLastMonth.push(i);
      }
    }

    var thisNumOfDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    //console.log("thisNumOfDays:"+thisNumOfDays);
    for (var i = firstDayOfTheWeek; (i < thisNumOfDays && i<((currentWeek+1)*7)-firstDayThisMonth); i++) {
      daysInThisMonth.push(i+1);
    }

    if(currentWeek==4)
    {
/*      var lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
      var nextNumOfDays = new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate();
      for (var i = 0; i < (6 - lastDayThisMonth); i++) {
        daysInNextMonth.push(i + 1);
      }
      var totalDays = daysInLastMonth.length + daysInThisMonth.length + daysInNextMonth.length;
      if (totalDays < 36) {
        for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
          daysInNextMonth.push(i);
        }
      }
*/
    }
    return {dayThisView:daysInThisMonth,dayPreMonthThisView:daysInNextMonth,dayLastMonthThisView:daysInLastMonth,date:date,currentWeek:currentWeek}
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    //this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    //this.getDaysOfMonth();
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
      //this.getDaysOfMonth();
    }
    if(event.direction === 4) {
      console.log("sinistro");
      this.currentWeek--;
      //this.getDaysOfMonth();
    }
  }



  /*getNewDateWeek(date,weekN,shift){
    var lastDayOfTheMonth=new Date(date.data.getFullYear(),data.getMonth(),0);
    lastDayOfTheMonth<(weekN+shift*7)?
  }
*/
  mod(n, m) {
        return ((n % m) + m) % m;
  }

  slideSwipe($event){
    //destroySwiper(this.slider);
    console.log(this.slider);
    //(<any>this.slider.getSlider()).createLoop();
    console.log("current slide index:"+$event.realIndex);
    this.currentMonth =      this.currentMonth = this.monthNames[this.cal[$event.realIndex].date.getMonth()];
    this.currentYear = this.cal[$event.realIndex].date.getFullYear();
    console.log("current anno, e current mese:"+this.currentYear+" "+this.currentMonth)
    console.log("indice di destra:"+this.mod($event.realIndex+1,3));
    console.log("giorni di destra:"+this.getDaysOfMonth(this.cal[$event.realIndex].date,this.cal[$event.realIndex].currentWeek+1).dayThisView);
    console.log("indice di sinistra:"+this.mod($event.realIndex-1,3));
    console.log("giorni di sinistra:"+this.getDaysOfMonth(this.cal[$event.realIndex].date,this.cal[$event.realIndex].currentWeek-1).dayThisView);
    this.cal[this.mod($event.realIndex+1,3)]=this.getDaysOfMonth(this.cal[$event.realIndex].date,this.cal[$event.realIndex].currentWeek+1);
    this.cal[this.mod($event.realIndex-1,3)]=this.getDaysOfMonth(this.cal[$event.realIndex].date,this.cal[$event.realIndex].currentWeek-1);
    console.log(this.cal);
    //this.slider.update()
    //createLoop(this.slider); // Undocumented method of the Swiper API

    setTimeout(() => this.createLoop(this.slider), 250);
    //update(this.slider)
    //this.slider.update()
  }

  onSlideDrag() {
    console.log("on drag");

    //createLoop(this.slider); // Undocumented method of the Swiper API
  }


}
