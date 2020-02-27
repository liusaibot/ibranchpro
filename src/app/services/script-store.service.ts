import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { reject } from 'q';
//import {  } from "module";

declare var document: any;

@Injectable()
export class ScriptStoreService {

  private scripts: any = {};

  constructor() {
    ScriptList.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.scr
      };
    });
  }

  load(scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script: any) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string){
    return new Promise((resolve, reject) => {
      if(this.scripts[name].loaded){
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      }
      else
      {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if(script.readyState){ //IE
          script.onreadystatechange = () => {
            if(script.readyState === "loaded" || script.readyState === "complete"){
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          }
        }
        else {
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          }
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

}

interface Scripts {
  name: string;
  src: string;
}

export const ScriptList: Scripts[] = [
  { name: 'flutterwave', src: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js' },
  //{name: '', src: ''}
]
