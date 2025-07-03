import { Component, signal } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  imports: [RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
contacts = signal<Contact[]>([]);

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getAllContacts().subscribe(contacts => this.contacts.set( contacts));
  }

  get favoriteContacts(): Contact[] {
    return this.contacts()
      .filter(c => c.favoritesRanking && c.favoritesRanking > 0)
      .sort(this.sortByFavoriteRanking);
  }

  sortByFavoriteRanking(a: Contact, b: Contact): number {
    if (!a.favoritesRanking)
      return -1;
    if (!b.favoritesRanking)
      return 1;
    if (a.favoritesRanking < b.favoritesRanking)
      return -1;
    else if (a.favoritesRanking > b.favoritesRanking)
      return 1;

    return 0;
  }
}
