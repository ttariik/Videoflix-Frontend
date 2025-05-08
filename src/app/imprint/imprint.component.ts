import { Component } from '@angular/core';

interface Company {
  name: string;
  legalForm: string;
  address: {
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  representative: string;
  phone: string;
  email: string;
  website: string;
  register: {
    court: string;
    number: string;
  };
  vatId: string;
  authority: string;
}

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent {
  company: Company = {
    name: 'Videoflix',
    legalForm: '',
    address: {
      street: 'Vatterstr. 30',
      zip: '60386',
      city: 'Frankfurt am Main',
      country: 'Deutschland'
    },
    representative: 'Tarik Sabanovic',
    phone: '+49 176 31278326',
    email: 'tarik.sabanovic2@icloud.com',
    website: '',
    register: {
      court: '',
      number: ''
    },
    vatId: '',
    authority: ''
  };
}