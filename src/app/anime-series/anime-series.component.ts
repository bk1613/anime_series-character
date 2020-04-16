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
  Seriesdescription: String;
  Seriesimage: String;

  Charactername: String;
  Charactergender: String;
  Characterdescrip: String;
  Characterimage: String;
  Characterrank: String;
  Characterability: String;
  Characterskill: String;

  AnimeImage: Blob;
  Animeseries: Series[];
  AnimeCharacters: Character[];
  details: string;
  title: string;

  constructor(private cs: CharService) { }

  ngOnInit(): void {

     //this.getCharacters();
  }

  ser = [14719, 45];

  getSeries(){
    this.cs.getSeries(this.Seriesid).subscribe(
      (response: Series[]) => {
        console.log(response);
        this.Animeseries = response;
        this.details = JSON.stringify(this.Animeseries);
        JSON.parse(this.details, (key, value) => {
          if (typeof value === 'string') {
            if(key === 'title_english'){
              this.Seriesname = value;
            }
            if(key === 'synopsis'){
              this.Seriesdescription = value;
            }
            if(key === 'image_url'){
              this.Seriesimage = value;
            }

            new Series(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription, []);
            return value.toUpperCase();
          }
          return value;
        })
        // console.log(JSON.parse(this.details));
        //this.sendseries(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription);
        this.getCharacters();
      }
    )
  }

  getCharacters(){
    this.cs.getAllCharacters().subscribe(
      (response:Character[])=> {
        this.AnimeCharacters = response;
      }
    )
  }


  // sendseries(id: number, name: String, image: String, syn: String){
  //   console.log(id);
  //   console.log(name);
  //   console.log(image);
  //   console.log(syn);
  //   let notser: Boolean = true;
  //   let s = new Series(id, name, image, syn, []);
  //   this.cs.getAllSeries().subscribe(
  //     (response: Series[]) => {
  //       this.Animeseries = response;
  //       this.Animeseries.forEach(function (value) {
  //         if(value.sId !== id){
  //           notser = true;
  //         }
  //         notser = false;
  //       });
  //       if(notser === true){
  //         this.cs.addSeries(s).subscribe(
  //           (response: Series[]) => {
  //             this.Animeseries = response;
  //           }
  //         )
  //       }
  //     }
  //   )
  // }

  sendCharacter() : void{
    console.log(this.Seriesid);
    console.log(this.Charactername);
    console.log(this.Charactergender);
    console.log(this.Characterimage);
    console.log(this.Characterdescrip);
    console.log(this.Characterrank);
    console.log(this.Characterability);
    let s = new Series(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription, []);
    // let c = new Character(1, this.Charactername, this.Seriesimage, this.Charactergender, [], this.Characterability, this.Characterdescrip, this.Characterrank, s)
    // this.cs.getSeries(this.Seriesid).pipe(
    //)

    let c  =new Character(0, this.Charactername, this.Characterimage, this.Charactergender, [], this.Characterability, this.Characterdescrip,
      this.Characterrank, s);
    console.log("response");
    this.cs.addCharacter(c).subscribe(
      (response: Character[]) => {
        console.log(response);
        this.AnimeCharacters = response;
      }
    )
    

  }

}
