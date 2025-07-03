import { Component, inject, Signal } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  imports: [RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  contacts!: Signal<Contact[]>;

  readonly contactsService = inject(ContactsService);

  ngOnInit() {
    this.contacts = this.contactsService.getAllContacts();
  }

  get favoriteContacts(): Contact[] {
    return this.contacts()
      .filter((c) => c.favoritesRanking && c.favoritesRanking > 0)
      .sort(this.sortByFavoriteRanking);
  }

  sortByFavoriteRanking(a: Contact, b: Contact): number {
    if (!a.favoritesRanking) return -1;
    if (!b.favoritesRanking) return 1;
    if (a.favoritesRanking < b.favoritesRanking) return -1;
    else if (a.favoritesRanking > b.favoritesRanking) return 1;

    return 0;
  }
}
