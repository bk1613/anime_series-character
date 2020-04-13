import { Component, OnInit } from '@angular/core';
import { CharService } from '../Shonen/char.service'
import { Series } from '../models/series';
import { Skills } from '../models/skills';
import { Character } from '../models/character'

@Component({
  selector: 'app-anime-series',
  templateUrl: './anime-series.component.html',
  styleUrls: ['./anime-series.component.css']
})
export class AnimeSeriesComponent implements OnInit {

  Seriesid: number;
  Seriesname: String;
  AnimeImage: Blob;
  Animeseries: Series[];

  constructor(private cs: CharService) { }

  ngOnInit(): void {
    //this.getSeries();
     
  }

  getSeries(){
    this.cs.getSeries(this.Seriesname).subscribe(
      (response: Series[]) => {
        console.log(response);
        // this.Animeseries = response;
        // this.Animeseries.push(new Series(1, "JoJo Part 1", "Default", [])); //Temporary DELETE WHEN DONE
        // this.Animeseries.push(new Series(2, "JoJo Part 2", "Default", [])); //Temporary DELETE WHEN DONE
      }
    )
  }


}
