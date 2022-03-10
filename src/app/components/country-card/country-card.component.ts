import { Component, OnInit, Input } from '@angular/core';
import WeatherDataInterface from "../../interface/WeatherData";


@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() weatherData: WeatherDataInterface | null | undefined;
  @Input() loadingState: boolean | undefined;

}
