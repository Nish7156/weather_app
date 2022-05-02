import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { weatherData } from '../models/weather.models';
import { WeatherServiceService } from '../service/weather-service.service';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';


HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private service:WeatherServiceService) { }

  weatherData?:weatherData;
  cityName:string='Mumbai';
  tempData:any=[];
  temp_value:any=45;
  

  ngOnInit(): void {
    this.getWeather(this.cityName);
    this.cityName='';
}

onSubmit(){
  this.getWeather(this.cityName);
  this.cityName='';
}

private getWeather(cityName:string){
  this.service.getWeatherData(this.cityName).subscribe((res)=>{
    console.log(res,'Nishant');
    this.weatherData = res;
    this.tempData.push(this.weatherData.main.temp,this.weatherData.name);
    console.log(this.tempData,'Records_cityNames&temp');
    this.temp_value=res.main.temp;
    console.log(this.temp_value,'temp_value');
});

}


public ngAfterViewInit(): void {
  this.createChartGauge();
}

//private getRandomNumber(min: number, max: number): number {
  ///return Math.floor(Math.random() * (max - min + 1) + min)
//}

private createChartGauge(): void {
  const chart = Highcharts.chart('chart-gauge', {
    chart: {
      type: 'solidgauge',
    },
    title: {
      text: 'Gauge Chart',
    },
    credits: {
      enabled: false,
    },
    pane: {
      startAngle: -90,
      endAngle: 90,
      center: ['50%', '85%'],
      size: '160%',
      background: {
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      stops: [
        [0.1, '#55BF3B'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#DF5353'], // red
      ],
      minorTickInterval: null,
      tickAmount: 2,
      labels: {
        y: 16,
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: -25,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    series: [{
      name: null,
      data: [this.temp_value],
      dataLabels: {
        format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
      },
    }],
  } as any);

 
}



}

