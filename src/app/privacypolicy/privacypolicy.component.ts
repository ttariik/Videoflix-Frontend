import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface PolicySection {
  title: string;
  subsections?: { heading: string; content: string[] }[];
  listItems?: string[];
}

@Component({
  selector: 'app-privacypolicy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent {
  company = {
    name: 'Videoflix',
    address: {
      name: 'Tarik Sabanovic',
      street: 'Vatterstr. 30',
      zip: '60386',
      city: 'Frankfurt am Main'
    },
    email: 'tarik.sabanovic2@icloud.com'
  };

  sections: PolicySection[] = [
    {
      title: '1. Verantwortlicher',
      subsections: [
        { heading: '', content: [
          this.company.address.name,
          this.company.address.street,
          this.company.address.zip + ' ' + this.company.address.city,
          'E-Mail: ' + this.company.email
        ] }
      ]
    },
    {
      title: '2. Erhebung und Verwendung personenbezogener Daten',
      subsections: [
        { heading: 'a) Besuch der Website', content: ['Beim Aufrufen unserer Website werden folgende Daten protokolliert:'] },
        { heading: 'b) Kontaktformular', content: ['Angaben im Kontaktformular (Name, E‑Mail, Nachricht) werden nur zur Bearbeitung Ihrer Anfrage genutzt.'] }
      ],
      listItems: ['IP-Adresse','Zugriffsdatum und -uhrzeit','Browsertyp und -version','Betriebssystem','Referrer-URL']
    },
    {
      title: '3. Weitergabe von Daten',
      subsections: [{ heading: '', content: ['Eine Weitergabe Ihrer Daten erfolgt nur mit Einwilligung oder gesetzlicher Grundlage.'] }]
    },
    {
      title: '4. Cookies',
      subsections: [{ heading: '', content: ['Wir verwenden Cookies zur Optimierung der Benutzerfreundlichkeit und Analyse.'] }]
    },
    {
      title: '5. Ihre Rechte',
      listItems: ['Auskunft (Art. 15 DSGVO)','Berichtigung (Art. 16 DSGVO)','Löschung (Art. 17 DSGVO)','Einschränkung (Art. 18 DSGVO)','Datenübertragbarkeit (Art. 20 DSGVO)','Widerspruch (Art. 21 DSGVO)']
    },
    {
      title: '6. Änderungen dieser Erklärung',
      subsections: [{ heading: '', content: ['Diese Erklärung ist gültig ab 01. Mai 2025. Änderungen werden hier veröffentlicht.'] }]
    }
  ];
}

