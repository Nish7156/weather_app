import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { weatherData } from '../models/weather.models';
import { WeatherServiceService } from '../service/weather-service.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private service:WeatherServiceService) { }

  weatherData?:weatherData;
  cityName:string='Mumbai';

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
});

}
}

