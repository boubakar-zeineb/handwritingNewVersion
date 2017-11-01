import { DataHandWriting } from '../../entities/data-handwriting';
import { WritingService } from './service/writing.service';
import { Http, RequestOptions, Response, Headers, URLSearchParams } from '@angular/http';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { unescape } from 'querystring';
import { DomSanitizer } from '@angular/platform-browser';
import { Message, SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent implements OnInit {
  urlHandWriting: string;
  @ViewChild('test') img: any;
  imageUrl: string;
  pdfUrl: string;
  text: string;
  showPdf = false;
  showImg = false;
  msgs: Message[] = [];
  texts = [];
  @Input() dhw: DataHandWriting;
  type = 'png';
  showSpinner = false;

  constructor(public sanitizer: DomSanitizer, private http: Http, private writingService: WritingService) {
  }

  ngOnInit() {
    // filling the text preferences
    this.texts = [];
    this.texts = [
      { value: 'Select', viewValue: null },
      { value: 'Texting', viewValue: 'Have plans for this weekend? \n\nNot sure yet. What were you thinking?' },
      { value: 'Ainslie', viewValue: 'Dear John, Millie, and team, \n\nAs we look back upon the past year.' },
    ];
  }

  // Listning for changes
  ngOnChanges(changes: SimpleChanges) {
    this.dhw = changes.dhw.currentValue;
    this.type = this.dhw.type;
  }

  // getting the values from each component and send the data to the api to get the response.
  callApi() {
    this.showSpinner = true; // activate spinner waiting for response
    if (this.dhw.handwriting_id === undefined) { // checking for selections (handwrite)
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error loading', detail: 'Please select a handwriting type' });
      this.showSpinner = false;
      return;
    }
    if (this.text === undefined || this.text === '') { // checking for text filling
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error loading', detail: 'Please write a text' });
      this.showSpinner = false;
      return;
    }
    this.dhw.text = this.text;
    // calling the api to get the document
    this.writingService.getDocument(this.dhw)
      .subscribe((response) => {
        const urlCreator = window.URL;
        const Url = urlCreator.createObjectURL(response);
        // switch type of the document to be setted
        if (this.dhw.type === 'png') {
          this.imageUrl = Url;
          this.showImg = true;
          this.showPdf = false;
        } else {
          this.pdfUrl = '';
          this.pdfUrl = Url;
          this.showImg = false;
          this.showPdf = true;
        }
        this.showSpinner = false;
      }
      );
  }

}
