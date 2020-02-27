import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ScriptStoreService } from "../../services/script-store.service";
import * as _ from "lodash";
declare var foo;

@Component({
  selector: 'app-flutterwave',
  templateUrl: './flutterwave.component.html',
  styleUrls: ['./flutterwave.component.css'],
  providers: [ScriptStoreService]
})

export class FlutterwaveComponent implements OnInit, AfterContentInit {

  public date = "Revpay" + Date.now();
  public publicKey = "FLWPUBK-d2f68feb62899974886c165a196b2312-X";
  public email = "omotayosaliu@yahoo.com";
  public amount = 5000;

  public collection;

  constructor(private script: ScriptStoreService) {
      this.collection = JSON.parse(sessionStorage.getItem("collection"));
   }

  ngOnInit() {
    this.flattenCollection();
  }

  paymentSuccess(res){
    console.log("payment Successful");
  }

  paymentFailure(){
    console.error("Payment not successful");
  }

  ngAfterContentInit(){
    // var scripts = ["flutterwave"];
    // this.script.load(scripts).then(data => {
    //   console.log('script loaded', data);
    // }).catch(error => console.log(error));
  }

  flattenCollection(){
    this.result = _.flatMap(this.collections, item =>
    _.map(item.collections, collection => _.defaults({id : item.collections.id, category : item.name}, collection))
    );
  }

  public result;

  public collections = [{
        "id": 1,
        "name": "Government",
        "description": "Government",
        "imageUrl": "account_balance",
        "base64Image": null,
        "collections": [
            {
                "id": 21,
                "name": "Chinese Embassy Visa Collection",
                "description": "Chinese Embassy Visa Collection",
                "owner": "Chinese Embassy Visa Collection",
                "imageUrl": null,
                "image": "base64 string...",
                "collectionFlows": [
                    {
                        "id": 20,
                        "description": "Enter Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 21,
                        "description": "Confirm Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 22,
                        "description": "Payment Status",
                        "isFlowDerived": false
                    }
                ]
            },
            {
                "id": 682,
                "name": "RevPay Collections",
                "description": "RevPay Collections",
                "owner": "REVPAY",
                "imageUrl": null,
                "image": "base64 string...",
                "collectionFlows": [
                    {
                        "id": 6,
                        "description": "Confirm Available Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 7,
                        "description": "Pid Verification",
                        "isFlowDerived": false
                    },
                    {
                        "id": 8,
                        "description": "Name Confirmation",
                        "isFlowDerived": false
                    },
                    {
                        "id": 9,
                        "description": "Agency Code Selection",
                        "isFlowDerived": false
                    },
                    {
                        "id": 10,
                        "description": "Revenue Code Selection",
                        "isFlowDerived": false
                    },
                    {
                        "id": 11,
                        "description": "Web GUID Generation",
                        "isFlowDerived": false
                    },
                    {
                        "id": 12,
                        "description": "Validate GUID",
                        "isFlowDerived": false
                    },
                    {
                        "id": 13,
                        "description": "Confirm Web GUID",
                        "isFlowDerived": false
                    },
                    {
                        "id": 14,
                        "description": "Payment Status",
                        "isFlowDerived": false
                    }
                ]
            }
        ]
    },
    {
        "id": 6,
        "name": "Insurance",
        "description": "Insurance",
        "imageUrl": "healing",
        "base64Image": null,
        "collections": [
            {
                "id": 361,
                "name": "Cornerstone Insurance PLC",
                "description": "Cornerstone Insurance PLC",
                "owner": "Cornerstone Insurance PLC",
                "imageUrl": null,
                "image": "base64 string...",
                "collectionFlows": [
                    {
                        "id": 23,
                        "description": "Select Product",
                        "isFlowDerived": false
                    },
                    {
                        "id": 24,
                        "description": "Enter Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 25,
                        "description": "Confirm Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 26,
                        "description": "Payment Status",
                        "isFlowDerived": false
                    }
                ]
            },
            {
                "id": 827,
                "name": "LEADWAY ASSURANCE COLLECTIONS",
                "description": "LEADWAY ASSURANCE COLLECTIONS",
                "owner": "LEADWAY ASSURANCE",
                "imageUrl": null,
                "image": "base64 string...",
                "collectionFlows": [
                    {
                        "id": 27,
                        "description": "Enter Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 28,
                        "description": "Confirm Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 29,
                        "description": "Payment Status",
                        "isFlowDerived": false
                    }
                ]
            }
        ]
    },
    {
        "id": 7,
        "name": "Construction",
        "description": "Construction",
        "imageUrl": "line_style",
        "base64Image": null,
        "collections": [
            {
                "id": 462,
                "name": "DANGOTE PAYMENT COLLECTIONS",
                "description": "DANGOTE CEMENT COLLECTIONS",
                "owner": "DANGOTE CEMENT",
                "imageUrl": null,
                "image": "base64 string...",
                "collectionFlows": [
                    {
                        "id": 33,
                        "description": "Customer Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 34,
                        "description": "Confirm Customer Profile",
                        "isFlowDerived": false
                    },
                    {
                        "id": 35,
                        "description": "Provide Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 36,
                        "description": "Confirm Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 37,
                        "description": "Payment Status",
                        "isFlowDerived": false
                    }
                ]
            }
        ]
    },
    {
        "id": 5,
        "name": "Airlines",
        "description": "Airlines",
        "imageUrl": "flight_takeoff",
        "base64Image": null,
        "collections": [
            {
                "id": 825,
                "name": "ETHIOPIAN AIRLINES COLLECTIONS",
                "description": "ETHIOPIAN AIRLINE COLLECTIONS",
                "owner": "ETHIOPIAN AIRLINES",
                "imageUrl": null,
                "image": "base64 string...",
                "collectionFlows": [
                    {
                        "id": 15,
                        "description": "Enter Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 16,
                        "description": "Confirm Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 17,
                        "description": "Payment Status",
                        "isFlowDerived": false
                    },
                    {
                        "id": 18,
                        "description": "Confirm Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 19,
                        "description": "Payment Status",
                        "isFlowDerived": false
                    }
                ]
            },
            {
                "id": 826,
                "name": "SOUTH AFRICAN AIRWAYS COLLECTIONS",
                "description": "SOUTH AFRICAN AIRWAYS COLLECTIONS",
                "owner": "SOUTH AFRICAN AIRWAYS",
                "imageUrl": null,
                "image": "base64 string...",
                "collectionFlows": [
                    {
                        "id": 30,
                        "description": "Enter Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 31,
                        "description": "Confirm Payment Details",
                        "isFlowDerived": false
                    },
                    {
                        "id": 32,
                        "description": "Payment Status",
                        "isFlowDerived": false
                    }
                ]
            }
        ]
    }
];

}
