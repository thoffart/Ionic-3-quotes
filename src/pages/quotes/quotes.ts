import { QuotesProvider } from "./../../providers/quotes/quotes";
import { Quote } from "./../../data/quote.interface";
import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-quotes",
  templateUrl: "quotes.html"
})
export class QuotesPage implements OnInit {
  Quotes: { category: string; quotes: Quote[]; icon: string };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertctrl: AlertController,
    private quoteprovides: QuotesProvider
  ) {}

  ngOnInit(): void {
    this.Quotes = this.navParams.data;
    console.log(this.Quotes);
  }

  ionViewDidLoad() {
    //this.Quotes = this.navParams.data;
    // add (?) operator in the template to angular loads when the data is available <ion-title>{{Quotes?.category | uppercase}}</ion-title>
  }

  addDelay(y: number) {
    let x = y * 0.25;
    return x.toString() + "s";
  }

  onAddFavorite(selected: Quote) {
    const alert = this.alertctrl.create({
      title: "Add Quote",
      subTitle: "Are you sure?",
      message: "Are you sure you want to add the quote?",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.quoteprovides.addQuoteFavorites(selected);
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel");
          }
        }
      ]
    });
    alert.present();
  }

  onRemoveFavorite(quote: Quote) {
    this.quoteprovides.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote) {
    return this.quoteprovides.isQuoteFavorite(quote);
  }
}
