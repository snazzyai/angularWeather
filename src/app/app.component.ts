import { Component } from '@angular/core';
import {faSearch, faCloud, faSpinner, faExclamationTriangle, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { GetWeatherService } from "./services/weather-service/get-weather.service";
import WeatherDataInterface from "./interface/WeatherData";
import { fahrenheitToCelciusConverter } from "./utilities/helperFunctions";
import { catchError } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent {

  title: string = 'nuventura-test';
  faSearch: IconDefinition = faSearch;
  faCloud: IconDefinition = faCloud;
  faError: IconDefinition = faExclamationTriangle;
  faSpinner: IconDefinition = faSpinner;
  isLoading: boolean = false;
  searchInput: string = '';
  weatherData:WeatherDataInterface | null  = null;
  showError: boolean = false;
  errorMessage: string = ''

  constructor( private weatherService: GetWeatherService ){ }

  onKeyUp($event: any){
    this.searchInput = $event.target.value;
  }


  getWeather(): void {
    this.showError = false
    this.isLoading = true;

    this.weatherService.getWeatherData(this.searchInput).pipe(
      catchError(error => {
        this.isLoading = false
        this.errorMessage = `${error.error.message}`
        this.showError = true
        throw new Error(error);
      })
    ).subscribe((data) => {
      this.isLoading = false;
      let weatherIcon: string = data.weather[0].icon;
      let weatherDescription: string = data.weather[0].main;
      let weatherHumidity: string = data.main.humidity.toString();
      let locationName: string = data.name;

      this.weatherData = {
        location: locationName,
        description: weatherDescription,
        temperature: fahrenheitToCelciusConverter(data.main.temp),
        humidity: weatherHumidity,
        weatherImage: `https://www.openweathermap.org/img/w/${weatherIcon}.png`
      }
      this.isLoading = false;
    })

  }
}
